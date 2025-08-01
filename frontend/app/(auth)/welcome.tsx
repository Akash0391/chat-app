import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Animated, { FadeIn } from 'react-native-reanimated'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {
    const router = useRouter()  

    const handleGetStarted = () => {
        router.push("/(auth)/register")
    }
  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <View style={{alignItems: "center"}}>
                <Typo size={43} fontWeight="700" color={colors.white}>Bubbly</Typo>
            </View>
            <Animated.Image
                entering={FadeIn.duration(700).springify()}
                source={require("@/assets/images/welcome.png")}
                style={styles.welcomeImage}
                resizeMode="contain"
            />
            <View>
                <Typo size={33} fontWeight="800" color={colors.white} style={{textAlign: "center"}}>
                    The best way to connect with your friends and Family
                </Typo>
                <Typo size={16} fontWeight="400" color={colors.white} style={{textAlign: "center"}}>
                    Send and receive messages without keeping your phone. Use Bubbly on up to 4 devices and 1 phone
                </Typo>
            </View>
            <Button onPress={handleGetStarted} style={{width: "100%"}} loading={false}>
                <Typo size={23} fontWeight="bold" color={colors.white}>  
                    Get Started
                </Typo>
            </Button>
        </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: spacingX._20,
    marginVertical: spacingY._10,
  },
  background: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  welcomeImage: {
    height: verticalScale(200),
    aspectRatio: 1,
    alignSelf: "center",
  },
});