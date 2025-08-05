import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AvatarProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import { getAvatarPath } from '@/services/imageService'

const Avatar = ({ uri, size = 40, style, isGroup = false}: AvatarProps  ) => {


  return (
    <View style={[styles.avatar, {height: verticalScale(size), width: verticalScale(size)}, style]}>
      <Image 
      source={getAvatarPath(uri, isGroup)} 
      style={{flex: 1}} 
      contentFit='cover'
      transition={100}
      />
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        alignSelf: 'center',
        backgroundColor: colors.neutral200,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
        height: verticalScale(47),
        width: verticalScale(47),
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.neutral100,
        overflow: 'hidden',
    }
})