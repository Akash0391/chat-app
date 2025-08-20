import { AuthProvider } from '@/contexts/authContext'
import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  )
}
const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(main)/profileModal" options={{ presentation: 'modal' }}/>
       <Stack.Screen name="(main)/newConversationModal" options={{ presentation: 'modal' }}/>
    </Stack>
  )
}

export default RootLayout;