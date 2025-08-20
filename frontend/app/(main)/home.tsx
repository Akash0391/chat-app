import Button from "@/components/Button";
import ConversationItem from "@/components/ConversationItem";
import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
// import { testSocketEvent } from '@/socket/socketEvents'

const Home = () => {
  const { user: currentUser } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const conversationList = [
    {
      name: "Alice",
      type: "direct",
      lastMessage: {
        senderName: "Alice",
        content: "Hello, how are you?",
        createdAt: "2025-08-19T12:00:00.000Z",
      },
    },
    {
      name: "Bob",
      type: "direct",
      lastMessage: {
        senderName: "Bob",
        content: "Hello, how are you?",
        createdAt: "2025-08-18T12:00:00.000Z",
      },
    },
    {
      name: "Charlie",
      type: "group",
      lastMessage: {
        senderName: "Charlie",
        content: "Hello, how are you?",
        createdAt: "2025-08-17T12:00:00.000Z",
      },
    },
    {
      name: "David",
      type: "group",
      lastMessage: {
        senderName: "David",
        content: "Hello, how are you?",
        createdAt: "2025-08-16T12:00:00.000Z",
      },
    },
    {
      name: "Eve",
      type: "direct",
      lastMessage: {
        senderName: "Eve",
        content: "Hello, how are you?",
        createdAt: "2025-08-15T12:00:00.000Z",
      },
    },
    {
      name: "Frank",
      type: "group",
      lastMessage: {
        senderName: "Frank",
        content: "Hello, how are you?",
        createdAt: "2025-08-14T12:00:00.000Z",
      },
    },
    {
      name: "George",
      type: "direct",
      lastMessage: {
        senderName: "George",
        content: "Hello, how are you?",
        createdAt: "2025-08-13T12:00:00.000Z",
      },
    },
  ];

  let directMessages = conversationList
    .filter((item) => item.type === "direct")
    .sort((a, b) => {
      const adate = a?.lastMessage?.createdAt;
      const bdate = b?.lastMessage?.createdAt;
      return new Date(bdate).getTime() - new Date(adate).getTime();
    });
  let groups = conversationList
    .filter((item) => item.type === "group")
    .sort((a, b) => {
      const adate = a?.lastMessage?.createdAt;
      const bdate = b?.lastMessage?.createdAt;
      return new Date(bdate).getTime() - new Date(adate).getTime();
    });

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Typo
              size={19}
              color={colors.neutral200}
              textProps={{ numberOfLines: 1 }}
            >
              Welcome Back,{" "}
              <Typo size={20} color={colors.white} fontWeight={"800"}>
                {currentUser?.name}
              </Typo>
              👍
            </Typo>
          </View>

          <TouchableOpacity
            style={styles.settingIcon}
            onPress={() => {
              router.push("/(main)/profileModal");
            }}
          >
            <Icons.GearSix
              size={verticalScale(22)}
              color={colors.white}
              weight="fill"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: spacingY._20,
            }}
          >
            <View style={styles.navbar}>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => setSelectedTab(0)}
                  style={[
                    styles.tabStyle,
                    selectedTab === 0 && styles.activeTabStyle,
                  ]}
                >
                  <Typo size={16} color={colors.neutral700} fontWeight={"600"}>
                    Direct Messages
                  </Typo>
                </TouchableOpacity>
              </View>
              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => setSelectedTab(1)}
                  style={[
                    styles.tabStyle,
                    selectedTab === 1 && styles.activeTabStyle,
                  ]}
                >
                  <Typo size={16} color={colors.neutral700} fontWeight={"600"}>
                    Groups
                  </Typo>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.conversationList}>
              {selectedTab === 0 &&
                directMessages.map((item, index) => (
                  <ConversationItem
                    key={index}
                    item={item}
                    router={router}
                    showDivider={index + 1 !== directMessages.length}
                  />
                ))}
              {selectedTab === 1 &&
                groups.map((item, index) => (
                  <ConversationItem
                    key={index}
                    item={item}
                    router={router}
                    showDivider={index + 1 !== groups.length}
                  />
                ))}
            </View>
            {!loading && selectedTab === 0 && directMessages.length === 0 && (
              <Typo style={{ textAlign: "center" }}>
                You don&apos;t have any messages yet.
              </Typo>
            )}
            {!loading && selectedTab === 1 && groups.length === 0 && (
              <Typo style={{ textAlign: "center" }}>
                You haven&apos;t joined any groups yet.
              </Typo>
            )}

            {loading && <Loading />}
          </ScrollView>
        </View>
      </View>

      <Button
        style={styles.floatingButton}
        onPress={() => {
          router.push({
            pathname: "/(main)/newConversationModal",
            params: {
              isGroup: selectedTab,
            },
          });
        }}
      >
        <Icons.Plus
          size={verticalScale(24)}
          color={colors.black}
          weight="bold"
        />
      </Button>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
    borderCurve: "continuous",
    overflow: "hidden",
  },
  navbar: {
    flexDirection: "row",
    paddingHorizontal: spacingX._10,
    alignItems: "center",
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabStyle: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    paddingVertical: spacingY._20,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: spacingY._30,
    right: spacingX._30,
  },
});
