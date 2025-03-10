
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Layout = () => {
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