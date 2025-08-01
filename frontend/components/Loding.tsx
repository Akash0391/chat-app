import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'  

const Loding = ({
    size = "large",
    color = colors.primary,
}: ActivityIndicatorProps) => {
  return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loding

const styles = StyleSheet.create({})