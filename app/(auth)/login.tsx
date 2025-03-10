import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://everus-memory.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success && data.token) {
        // Store token in AsyncStorage
        await AsyncStorage.setItem('authToken', data.token);
  
        // Navigate to Home Screen
        router.push('/(tabs)/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={['#FF914D', '#FF4D4D']} className="flex-1 items-center justify-center px-2">
      <View className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Text className="text-3xl font-bold text-center text-orange-500 mb-6">Welcome Back!</Text>

        {/* Email Input */}
        <View className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-4">
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="gray"
            className="flex-1 text-black ml-3"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
        </View>

        {/* Password Input */}
        <View className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-6">
          <Ionicons name="lock-closed" size={24} color="gray" />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="gray"
            className="flex-1 text-black ml-3"
            secureTextEntry={hidePassword}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <Pressable onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? "eye-off" : "eye"} size={24} color="gray" />
          </Pressable>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-orange-500 py-4 rounded-xl shadow-lg active:scale-95"
        >
          <Text className="text-center text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity className="mt-4">
          <Text className="text-orange-500 text-center font-semibold">Forgot Password?</Text>
        </TouchableOpacity>

       

        {/* Sign In with Google */}
     
        {/* Sign Up Redirect */}
        <TouchableOpacity onPress={() => router.push('/(auth)/signin')} className="mt-6">
          <Text className="text-center text-gray-600">Don't have an account? <Text className="text-orange-500 font-bold">Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Login;
