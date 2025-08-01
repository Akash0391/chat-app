import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { ButtonProps } from '@/types'
import { colors, radius, spacingX } from '@/constants/theme'
import Typo from './Typo'
import { verticalScale } from '@/utils/styling'
import Loading from './Loding'

const Button = ({
    style,
    onPress,
    loading = false,
    children,
}: ButtonProps) => {
    if(loading) {
        return (
            <View style={[styles.button, style, {backgroundColor: "transparent"}]}>
               <Loading />  
            </View>
        )
    }
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={loading}>
      <Typo size={16} fontWeight="700" color={colors.white}>{children}</Typo>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: verticalScale(56),
    borderRadius: radius.full,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
});