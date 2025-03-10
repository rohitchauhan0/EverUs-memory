import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-black relative">
      <Image source={require('../../assets/home/girl.jpeg')} className="w-full h-full opacity-50" />
      <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Text className="text-5xl text-center text-white font-light italic">
          <Text className="text-orange-500 font-bold">Connect</Text> beyond boundaries
        </Text>

        {/* TouchableOpacity for custom navigation */}
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/signin')}
          className="bg-white py-3 px-10 mt-10 rounded-full"
        >
          <Text className="text-black font-bold text-lg text-center">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
