import { Slot, Stack, useRouter } from 'expo-router'
import { StatusBar } from "expo-status-bar"
import React, { useEffect } from 'react'
import { UserProvider } from '../contexts/UserContext'
import { useUser } from '../hooks/useUser'

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar style="auto" />
        <AuthGate>
          {/* <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          </Stack> */}
          <Slot />
      </AuthGate>
    </UserProvider>
  )
}

function AuthGate({children}: {children: React.ReactNode}){
  const { user, loading } = useUser()
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/(auth)/login")
      }
    }
  }, [loading, user]);

  if(loading) return null;

  if(!user) return children;

  return children;

}