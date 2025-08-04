import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'  
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import * as Icons from 'phosphor-react-native' 
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
// import { testSocketEvent } from '@/socket/socketEvents'  

const Home = () => {
  const { user: currentUser, signOut } = useAuth(); 
  const router = useRouter();
  
  //It is only for testing the socket connection
  // useEffect(() => {
  //   testSocketEvent(testSocketEventCallback);
  //   testSocketEvent(null);

  //   return () => {
  //     testSocketEvent(testSocketEventCallback, true);
  //   }
  // }, []);

  // const testSocketEventCallback = (data: any) => {
  //   console.log("Received data from server:", data);
  // }


  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.5} >
      <View style={styles.container}> 
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <Typo size={19} color={colors.neutral200} textProps={{numberOfLines: 1}}>
              Welcome Back,{" "}
              <Typo size={20} color={colors.white} fontWeight={'800'}>
                {currentUser?.name}
              </Typo>
              👍
            </Typo>
          </View>

          <TouchableOpacity style={styles.settingIcon} onPress={() => {
            router.push("/(main)/profileModal")
          }}>
              <Icons.GearSix size={verticalScale(22)} color={colors.white} weight="fill" />   
          </TouchableOpacity>
        </View>

        <View style={styles.content}>

        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._10,
  },
  rowItem: {
    flex: 1,
  },
  settingIcon: {
    backgroundColor: colors.neutral700,
    borderRadius: radius.full,
    padding: spacingY._10,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: 'continuous',
    overflow: 'hidden',
  }
})