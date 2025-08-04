import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth(); 

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      console.log("Missing fields:", { email, password, name });
      Alert.alert("Register", "Please fill in all fields");
      return;
    }
  
    try {
      console.log("Attempting registration with:", { name, email, password });
  
      setIsLoading(true);
      
      await signUp(email.toLowerCase().trim(), password, name.trim(), ""); // normalize input
  
      console.log("Registration successful");
    } catch (error: any) {
      console.log("Registration error:", error);
  
      if (error.response) {
        console.log("Server responded with:", error.response.status, error.response.data);
        Alert.alert("Register Error", error.response.data.message || "Something went wrong.");
      } else if (error.message) {
        console.log("Error message:", error.message);
        Alert.alert("Register Error", error.message);
      } else {
        Alert.alert("Register Error", "Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "android" ? "height" : "padding"}>
      <ScreenWrapper showPattern={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton iconSize={28} />  
          <Typo size={17} color={colors.white}>
            Need Some Help?
          </Typo>
        </View>
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={false}> 
            <View style={{gap: spacingY._10, marginBottom: spacingY._15}}>
              <Typo size={28} fontWeight="600">
                Getting started
              </Typo>
              <Typo color={colors.neutral600}>
                Create an account to continue
              </Typo>
            </View>

            <Input 
            placeholder="Enter your name"
            onChangeText={(value: string) => {
              setName(value);  
            }}
            icon={<Icons.User size={verticalScale(26)} color={colors.neutral600} />}
            /> 
            <Input 
            placeholder="Enter your email"
            onChangeText={(value: string) => {
              setEmail(value);
            }}
            icon={<Icons.Envelope size={verticalScale(26)} color={colors.neutral600} />}
            />
            <Input 
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(value: string) => {
              setPassword(value);
            }}
            icon={<Icons.LockKey size={verticalScale(26)} color={colors.neutral600} />}
            />

            <View style={{marginTop: spacingY._25, gap: spacingY._15}}>
              <Button 
              onPress={handleSubmit}
              loading={isLoading}
              >
                <Typo size={20} color={colors.white} fontWeight="900">
                  Create account
                </Typo>
              </Button>
              <View style={styles.footer}>
                <Typo size={16} color={colors.neutral600} fontWeight="500">
                  Already have an account?
                </Typo>
                <Pressable onPress={() => router.push('/(auth)/login')}>
                  <Typo size={16} color={colors.primaryDark} fontWeight="bold">
                    Login
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

export default Register

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