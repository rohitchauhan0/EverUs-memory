import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

const Home = () => {
  const [allPosts, setallPosts] = useState([])
  const router = useRouter()
  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response = await fetch('https://everus-memory.onrender.com/api/posts/get-posts');
        const data = await response.json();
        console.log(data.posts);
      } catch (error) {
        console.error(error);
      }
    }
    getAllPost()
  },[])
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      router.push('/(auth)/login');
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View className='flex-1 items-center justify-center bg-white'>
     <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Home