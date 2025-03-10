import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={['#FF914D', '#FF4D4D']} className="flex-1 items-center justify-center px-2">
      <View className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <Text className="text-3xl font-bold text-center text-orange-500 mb-6">Create Account</Text>

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
        <View className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-4">
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

        {/* Confirm Password Input */}
        <View className="flex-row items-center bg-gray-100 p-4 rounded-xl mb-6">
          <Ionicons name="lock-closed" size={24} color="gray" />
          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="gray"
            className="flex-1 text-black ml-3"
            secureTextEntry={hideConfirmPassword}
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          />
          <Pressable onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
            <Ionicons name={hideConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </Pressable>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-orange-500 py-4 rounded-xl shadow-lg active:scale-95"
        >
          <Text className="text-center text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        
        {/* Sign In with Google */}
       
        {/* Login Redirect */}
        <TouchableOpacity onPress={() => router.push('/(auth)/login')} className="mt-6">
          <Text className="text-center text-gray-600">Already have an account? <Text className="text-orange-500 font-bold">Login</Text></Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
