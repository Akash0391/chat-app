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

    let paddingTop = Platform.OS === "ios" ? height * 0.06 : 40;
    let paddingBottom = 0;

    if(isModal) {
        paddingTop = Platform.OS === "ios" ? height * 0.02 : 50;  
        paddingBottom = height * 0.02;
    }

  return (
    <ImageBackground 
        style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,  
    }}
    imageStyle={{ opacity: showPattern ? bgOpacity : 0}}
    source={require("@/assets/images/bgPattern.png")}
    >
      <View style={{
        flex: 1,
        paddingTop,
        paddingBottom,
      }}>
        <StatusBar
          translucent={false}
          barStyle={isModal ? 'dark-content' : 'light-content'}
          backgroundColor={isModal ? colors.white : colors.neutral900}
        />
        {children}
      </View>
    </ImageBackground>
  ) 
}

export default ScreenWrapper