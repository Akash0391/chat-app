import Avatar from "@/components/Avatar";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const NewConversationModal = () => {
  const { isGroup } = useLocalSearchParams();
  const [groupAvatar, setGroupAvatar] = useState<{ uri: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isGroupMode = isGroup === "1";
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const { user: currentUser } = useAuth();

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setGroupAvatar(result.assets[0]);
    }
  };

  const toggleParticipant = (user: any) => {
    setSelectedUsers((prev) => {
      if (prev.includes(user.id)) {
        return prev.filter((id: number) => id !== user.id);
      }
      return [...prev, user.id];
    });
  };

  const onSelectUser = (user: any) => {
    if (!currentUser) {
      Alert.alert("Error", "Please login to continue");
      return;
    }

    if (isGroupMode) {
      toggleParticipant(user);
    } else {
    }
  };

  const contacts = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "Michael Smith",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Sophia Brown",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "James Williams",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "Emma Davis",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 6,
      name: "Daniel Miller",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: 7,
      name: "Olivia Garcia",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: 8,
      name: "William Martinez",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: 9,
      name: "Ava Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: 10,
      name: "Ethan Hernandez",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const createGroup = async () => {
    if (!groupName.trim() || selectedUsers.length < 2 || !currentUser) return;
    // TODO: Add group creation logic here
    // setIsLoading(true);
    // console.log(groupName, selectedUsers);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  };

  return (
    <ScreenWrapper isModal={true} showPattern={false}>
      <View style={styles.container}>
        <Header
          title={isGroupMode ? "New Group" : "Select User"}
          leftIcon={<BackButton color={colors.black} />}
        />

        {isGroupMode && (
          <View style={styles.groupInfoContainer}>
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={onPickImage}>
                <Avatar
                  uri={groupAvatar?.uri || null}
                  isGroup={true}
                  size={100}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.groupNameContainer}>
              <Input
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contactsList}
        >
          {contacts.map((user, index) => {
            const isSelected = selectedUsers.includes(user.id);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.contactRow,
                  isSelected && styles.selectedContact,
                ]}
                onPress={() => onSelectUser(user)}
              >
                <Avatar uri={user.avatar} size={45} />
                <Typo size={16} fontWeight={"600"}>
                  {user.name}
                </Typo>
                {isGroupMode && (
                  <View style={styles.selectionIndicator}>
                    <View
                      style={[styles.checkBox, isSelected && styles.checked]}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {isGroupMode && selectedUsers.length >= 2 && (
          <View style={styles.createGroupButton}>
            <Button
              onPress={createGroup}
              disabled={!groupName.trim()}
              loading={isLoading}
            >
              <Typo size={17} fontWeight={"bold"}>
                Create Group
              </Typo>
            </Button>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default NewConversationModal;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacingX._15,
    flex: 1,
  },
  groupInfoContainer: {
    alignItems: "center",
    marginTop: spacingY._10,
  },
  avatarContainer: {
    marginBottom: spacingY._10,
  },
  groupNameContainer: {
    width: "100%",
  },
  contactsList: {
    gap: spacingY._12,
    marginTop: spacingY._10,
    paddingBottom: verticalScale(150),
    paddingTop: spacingY._10,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
    paddingVertical: spacingY._5,
  },
  selectionIndicator: {
    marginLeft: "auto",
    marginRight: spacingX._10,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  checked: {
    backgroundColor: colors.primary,
  },
  selectedContact: {
    backgroundColor: colors.neutral100,
    borderRadius: radius._10,
  },
  createGroupButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacingX._15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
  },
});
