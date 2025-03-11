import React, { useState, useEffect } from "react";
import { 
  SafeAreaView, View, Text, TouchableOpacity, Alert, Image, 
  KeyboardAvoidingView, Platform, ScrollView, Keyboard, TextInput, ActivityIndicator 
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Video, Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://your-backend.com/upload"; // Replace with your actual API endpoint

const Posts = () => {
  const [postText, setPostText] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [musicUri, setMusicUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [image, setimage] = useState<string | null>(null);
    const [video, setvideo] = useState<string | null>(null);
    const [music, setmusic] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  // Pick an image
  const pickImage = async () => {
    setVideoUri(null); // Clear video if selecting an image

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      Alert.alert("Success", "Image added successfully!");
    }
  };

  // Pick a video
  const pickVideo = async () => {
    setImageUri(null); // Clear image if selecting a video

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setvideo(result.assets);
      setVideoUri(result.assets[0].uri);
      Alert.alert("Success", "Video added successfully!");
    }
  };

  // Pick an audio file
  const pickMusic = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });

    if (!result.canceled && result.assets[0].uri) {
      setMusicUri(result.assets[0].uri);
      Alert.alert("Success", "Music added successfully!");

      const { sound } = await Audio.Sound.createAsync(
        { uri: result.assets[0].uri },
        { shouldPlay: false }
      );
      setSound(sound);
    }
  };

  // Play selected music
  const playMusic = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  // Stop music
  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  // Function to upload post data to the backend
  const handlePost = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", postText);

      if (imageUri) {
        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        } as any);
      } else if (videoUri) {
        formData.append("video", {
          uri: videoUri,
          name: "video.mp4",
          type: "video/mp4",
        } as any);
      } else if (musicUri) {
        formData.append("music", {
          uri: musicUri,
          name: "audio.mp3",
          type: "audio/mpeg",
        } as any);
      }


      const token = await AsyncStorage.getItem("authToken");

      const response = await fetch("https://everus-memory.onrender.com/api/posts/posts", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      Alert.alert("Success", "Post uploaded successfully!");
      
      // Reset states after successful upload
      setPostText("");
      setImageUri(null);
      setVideoUri(null);
      setMusicUri(null);
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Error", "Failed to upload post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', backgroundColor: 'white' }}>
        <View className="py-7 bg-white px-3 flex-1">
          
          <TextInput
            style={{
              height: 100,
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              marginTop: 20,
              textAlignVertical: "top",
              fontSize: 16,
            }}
            placeholder="Enter your post content..."
            multiline
            value={postText}
            onChangeText={setPostText}
          />

          {!keyboardVisible && (
            <View className="flex-row justify-around mt-5 mb-7">
              <TouchableOpacity className="items-center p-3 bg-blue-500 rounded-lg flex-row" onPress={pickImage}>
                <MaterialIcons name="photo-library" size={20} color="white" />
                <Text className="text-white ml-2">Add Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center p-3 bg-green-500 rounded-lg flex-row" onPress={pickVideo}>
                <MaterialIcons name="videocam" size={20} color="white" />
                <Text className="text-white ml-2">Add Video</Text>
              </TouchableOpacity>

              {
                !videoUri && (<TouchableOpacity className="items-center p-3 bg-purple-500 rounded-lg flex-row" onPress={pickMusic}>
                  <MaterialIcons name="library-music" size={20} color="white" />
                  <Text className="text-white ml-2">Add Music</Text>
                </TouchableOpacity>)
              }
            </View>
          )}

          {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, alignSelf: "center", borderRadius: 10 }} />}
          {videoUri && <Video source={{ uri: videoUri }} style={{ width: "100%", height: 200 }} useNativeControls resizeMode="contain" />}
          
          {musicUri && (
            <View className="flex-row justify-center mt-5 gap-10">
              <TouchableOpacity onPress={playMusic} className="bg-blue-500 p-3 rounded-lg"><Text className="text-white">Play</Text></TouchableOpacity>
              <TouchableOpacity onPress={stopMusic} className="bg-red-500 p-3 rounded-lg"><Text className="text-white">Stop</Text></TouchableOpacity>
            </View>
          )}

        </View>

        {!keyboardVisible && (
          <View className="mb-32 flex-row justify-center bg-white">
            <TouchableOpacity className="items-center bg-orange-500 rounded-lg px-20 py-5 flex-row" onPress={handlePost} disabled={loading}>
              {loading ? <ActivityIndicator color="white" /> : <MaterialIcons name="send" size={20} color="white" />}
              <Text className="text-white ml-2">{loading ? "Posting..." : "Post"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Posts;
