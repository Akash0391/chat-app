import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { InputProps } from '@/types'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'

const Input = (props: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)
  return (
    <View style={[
        props.containerStyle && props.containerStyle,
        styles.container,
        isFocused && styles.primaryBorder
    ]}>
      {props.icon && props.icon}
      <TextInput
        style={[styles.inputStyle, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef && props.inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}  
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: verticalScale(56),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.neutral200,
        borderRadius: radius.full,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15,
        backgroundColor: colors.neutral100,
        gap: spacingX._10,
    },
    primaryBorder: {
        borderColor: colors.primary,
    },
    inputStyle: {
        flex: 1,
        color: colors.text,
        fontSize: verticalScale(14),
    },
})