
import React, { useEffect, useState } from 'react'
import { SplashScreen, Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const Layout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
   

    useEffect(() => {
      const checkAuth = async () => {
        const token = await AsyncStorage.getItem('authToken');
        console.log(token);
        setIsAuthenticated(!!token);
      };
  
      checkAuth();
    }, []);
  
    useEffect(() => {
      if (isAuthenticated !== null) {
        SplashScreen.hideAsync();
        if (isAuthenticated) {
          router.replace('/(tabs)/home'); 
        }
      }
    }, [isAuthenticated]);
  
    if (isAuthenticated === null) {
      return null; // Prevent UI flickering while checking auth state
    }
    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation:"slide_from_right" }} >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="signin" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />

            </Stack><StatusBar style="auto" />
        </>
    )
}

export default Layout