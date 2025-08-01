import {  Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/authContext'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth();

  const handleSubmit = async () => {
    if(!email || !password) {
      Alert.alert("Login", "Please fill in all fields")
      return
    }
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert("Login Error", error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "android" ? "height" : "padding"}>
      <ScreenWrapper showPattern={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton iconSize={28} />  
          <Typo size={17} color={colors.white}>
            Forgot Password?
          </Typo>
        </View>
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}> 
            <View style={{gap: spacingY._10, marginBottom: spacingY._15}}>
              <Typo size={28} fontWeight="600">
                Welcome Back
              </Typo>
              <Typo color={colors.neutral600}>
                Login to your account to continue
              </Typo>
            </View>
            <Input 
            placeholder="Enter your email"
            onChangeText={(value: string) => {
              setEmail(value)
            }}
            icon={<Icons.Envelope size={verticalScale(26)} color={colors.neutral600} />}
            />
            <Input 
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setPassword(value)
            }}
            icon={<Icons.LockKey size={verticalScale(26)} color={colors.neutral600} />}
            />

            <View style={{marginTop: spacingY._25, gap: spacingY._15}}>
              <Button 
              onPress={handleSubmit}
              loading={isLoading}
              >
                <Typo size={20} color={colors.white} fontWeight="900">
                  Login
                </Typo>
              </Button>
              <View style={styles.footer}>
                <Typo size={16} color={colors.neutral600} fontWeight="500">
                  Don&apos;t have an account?
                </Typo>
                <Pressable onPress={() => router.push('/(auth)/register')}>
                  <Typo size={16} color={colors.primaryDark} fontWeight="bold">
                    Register
                  </Typo>
                </Pressable>
              </View>
              </View> 
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
    paddingBottom: spacingY._25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20, 
  },
  form: {
    gap: spacingY._15,
    marginTop: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});