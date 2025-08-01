import { StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'  
import { colors } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import Button from '@/components/Button'

const Home = () => {
  const { signOut } = useAuth();
  return (
    <ScreenWrapper>
      <Typo size={20} color={colors.white}>Home</Typo>
      <Button onPress={signOut}>
        <Typo size={20} color={colors.white}>Logout</Typo>
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})