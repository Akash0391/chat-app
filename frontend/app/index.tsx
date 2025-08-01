import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function SplashScreen() {
  // const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.replace("/(auth)/welcome");
  //   }, 2000);
  // }, []);

  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />
      <Animated.Image
        source={require("@/assets/images/splashImage.png")}  
        entering={FadeInDown.duration(700).springify()}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    aspectRatio: 1,
    height: "23%",
  },
});