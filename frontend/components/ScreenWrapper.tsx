import { ScreenWrapperProps } from '@/types'
import { View, Platform, StatusBar, Dimensions, ImageBackground } from 'react-native'   
import React from 'react'
import { colors } from '@/constants/theme';
  
const { height } = Dimensions.get("window");
const ScreenWrapper = ({
    children,
    style,  
    showPattern = true,
    isModal = false,
    bgOpacity = 1,
}: ScreenWrapperProps) => {

    let paddingTop = Platform.OS === "android" ? height * 0.04 : 0.06;
    let paddingBottom = 0;

    if(isModal) {
        paddingTop = Platform.OS === "android" ? height * 0.02 : 0.04;  
        paddingBottom = height * 0.04;
    }

  return (
    <ImageBackground 
        style={[
        {
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,  
    }, style]}
    imageStyle={
        showPattern ? {
            opacity: bgOpacity,
        } : {}
    }
    source={require("@/assets/images/bgPattern.png")}
    >
      <View style={{
        flex: 1,
        paddingTop,
        paddingBottom,
      }}>
        <StatusBar barStyle="light-content" backgroundColor={"transparent"} />
        {children}
      </View>
    </ImageBackground>
  ) 
}

export default ScreenWrapper