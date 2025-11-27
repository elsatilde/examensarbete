import { Stack } from 'expo-router'
import { StatusBar } from "expo-status-bar"
import React from 'react'
import { UserProvider } from '../contexts/UserContext'

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  )
}

