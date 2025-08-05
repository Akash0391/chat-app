import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from "react";
import { colors, spacingX, spacingY } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper"; 
import * as Icons from "phosphor-react-native";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { verticalScale } from "@/utils/styling";
import Avatar from "@/components/Avatar";
import Typo from "@/components/Typo";
import Input from "@/components/Input";
import { useAuth } from "@/contexts/authContext";  
import { UserDataProps } from "@/types";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { updateProfile } from "@/socket/socketEvents";
import { uploadFileTOCloudinary } from "@/services/imageService";

const ProfileModal = () => {
  const { user, signOut, updateToken } = useAuth() 
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [userData, setUserData] = useState<UserDataProps>({ 
    name: "",
    email: "",
    avatar: "",
  })

  useEffect(() => {
    updateProfile(processUpdateProfile);

    return () => {
      updateProfile(processUpdateProfile, true)
    }

  }, [])

  const processUpdateProfile = (res:any) => {
    console.log("Got response", res)
    setLoading(false)

    if(res.success) {
      updateToken(res.data.token)
      router.back()
    } else {
      Alert.alert('User', res.msg)
    }
  }

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar ,
    })
  }, [user])

  const onPickImage = async ()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setUserData({...userData, avatar: result.assets[0].uri})
    }
  }


  const handleLogOut = async () => {
    router.back();
    await signOut();  
  }

  const showLogOutAlert = () => {
     Alert.alert('Confirm', 'Are you sure want to Log out', [
      {text: "Cancel", onPress: () => console.log("Cancle logout"), style: 'cancel'},
      {text: "Confirm", onPress: () => handleLogOut(), style: 'destructive'}
     ] )
  }

  const onSubmit = async () => {
    let {name, avatar} = userData;
    if(!name.trim()) {
      Alert.alert("User", "Please enter your name")
      return;
    }

    let data = {
      name,
      avatar
    }

    if(avatar && avatar?.uri) {
      setLoading(true)
      const res = await uploadFileTOCloudinary(avatar, "profiles")
      console.log("Result:", res)
      if(res.success) {
        data.avatar = res.data
      } else {
        Alert.alert("User", res.msg)
        setLoading(false)
        return
      }
    }

    updateProfile(data)
  }


  return (
    <ScreenWrapper isModal={true} showPattern={false}>  
      <View style={styles.container}>
        <Header
          title={"Update Profile"}
          leftIcon={
            Platform.OS === "android" && <BackButton color={colors.white} />
          }
          style={{ marginVertical: spacingY._15 }}
        />

        {/* Form */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Avatar uri={userData.avatar} size={170} />
            <TouchableOpacity style={styles.editIcon} onPress={onPickImage}>
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={{gap: spacingY._20}}>  
            <View style={styles.inputContainer}>
              <Typo style={{paddingLeft: spacingX._10}}>Email</Typo>
              <Input
              value={userData.email}
              containerStyle={{
                borderColor: colors.neutral350,
                paddingLeft: spacingX._20,
              }}
              onChangeText={(value) => setUserData({...userData, email: value})}
              editable={false}
              /> 
            </View>

            {/* Name */}
            <View style={styles.inputContainer}>
              <Typo style={{paddingLeft: spacingX._10}}>Name</Typo>
              <Input
              value={userData.name}
              containerStyle={{
                borderColor: colors.neutral350,
                paddingLeft: spacingX._20,
                backgroundColor: colors.neutral300,
              }}
              onChangeText={(value) => setUserData({...userData, name: value})}
              /> 
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {
          !loading && (
            <Button
        style={{backgroundColor: colors.rose,
          height: verticalScale(56),
          width: verticalScale(56),
        }}
         onPress={showLogOutAlert}>
          <Icons.SignOut
              size={verticalScale(30)}
              color={colors.white}
              weight={'bold'} />
          </Button> 
          )
        }
          
          <Button style={{flex: 1}} onPress={onSubmit} loading={loading}>
            <Typo color={colors.black} fontWeight={'800'}>Update</Typo>
          </Button>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: verticalScale(12), 
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral200,
    marginBottom: spacingY._10,
    borderTopWidth: 1
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingX._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingX._7,
  },
  inputContainer: {
    gap: spacingY._7,
  },
}); 