import {
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl
} from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Video } from 'expo-av';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Post {
  _id: string;
  createdBy: { name: string };
  createdAt: string;
  image?: string;
  video?: string;
  music?: string;
  text?: string;
}

const Home = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const videoRefs = useRef<{ [key: string]: Video }>({});
  const audioRefs = useRef<{ [key: string]: Audio.Sound | null }>({});
  const [activePost, setActivePost] = useState<string | null>(null);
  const [musicPlaying, setMusicPlaying] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://everus-memory.onrender.com/api/posts/get-posts');
      const data = await response.json();
      setAllPosts(data.posts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      router.push('/(auth)/login');
    } catch (error) {
      console.error(error);
    }
  };

  const playMusic = async (uri: string, postId: string) => {
    try {
      if (audioRefs.current[postId]) {
        await audioRefs.current[postId]?.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true, isLooping: true }
      );
      audioRefs.current[postId] = sound;
      await sound.playAsync();
      setMusicPlaying((prev) => ({ ...prev, [postId]: true }));
    } catch (error) {
      console.error("Music Error:", error);
    }
  };

  const pauseMusic = async (postId: string) => {
    if (audioRefs.current[postId]) {
      await audioRefs.current[postId]?.pauseAsync();
      setMusicPlaying((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleMusic = (postId: string, uri: string) => {
    if (musicPlaying[postId]) {
      pauseMusic(postId);
    } else {
      playMusic(uri, postId);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <LinearGradient colors={['#f9f9f9', '#fff']} className="w-full rounded-lg overflow-hidden shadow-lg p-4 mb-4">
      {musicPlaying[item._id] && (
        <View className="absolute top-3 right-3 bg-blue-500 p-2 rounded-full shadow-md">
          <Text className="text-white font-bold">🎵</Text>
        </View>
      )}

      <View className="flex-row items-center pb-3 border-b border-gray-300">
        <Image
          source={require('../../assets/home/heart.png')}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3 flex-1">
          <Text className="text-lg font-semibold text-gray-800">{item.createdBy?.name || 'Unknown'}</Text>
          <Text className="text-gray-500 text-sm">{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
        {item.music && (
          <TouchableOpacity onPress={() => toggleMusic(item._id, item.music!)}>
            <MaterialIcons name={musicPlaying[item._id] ? "pause" : "play-arrow"} size={28} color="black" />
          </TouchableOpacity>
        )}
      </View>

      {item.text && <Text className="text-gray-800 text-base mt-2 font-semibold">{item.text}</Text>}
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-80 bg-gray-200 mt-2 rounded-lg"
          resizeMode="cover"
        />
      )}
      {item.video && (
        <View className="w-full h-80 mt-2 rounded-lg overflow-hidden">
          <Video
            ref={(ref) => (videoRefs.current[item._id] = ref!)}
            source={{ uri: item.video.trim() }}
            style={{ width: '100%', height: 300 }}
            resizeMode="contain"
            useNativeControls
          />
        </View>
      )}
    </LinearGradient>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="absolute top-14 right-5 z-10">
        <TouchableOpacity onPress={handleLogout} className="bg-orange-500 px-6 py-2 rounded-lg shadow-md">
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="blue" className="mt-10" />}

      <FlatList
        data={allPosts}
        keyExtractor={(item) => item._id}
        renderItem={renderPost}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingTop: 70, paddingBottom: 300, paddingHorizontal: 10 }}
      />
    </SafeAreaView>
  );
};

export default Home;