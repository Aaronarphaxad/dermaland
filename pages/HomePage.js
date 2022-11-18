import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
  Platform,
  RefreshControl,
} from "react-native";
import { Avatar, Button } from "@rneui/themed";
import { auth, db, doc, getDoc } from "../firebase";
import { useState, useEffect, useMemo, memo } from "react";
import ReminderCard from "../components/ReminderCard";
import SkinInfoCard from "../components/SkinInfoCard";
import RecommendModal from "../components/modals/RecommendModal";
import * as Notifications from "expo-notifications";
import Notification from "../utils/Notification";
import { StatusBar } from "expo-status-bar";

export const HomePage = memo(({ navigation }) => {
  const user = auth.currentUser;
  const { displayName, photoURL } = user;
  const [username, setUser] = useState(displayName);
  const [avatar, setAvatar] = useState(photoURL);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  // Set notification options
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const productsMemo = useMemo(() => {
    return {
      skinType: products?.skin_type || "Normal",
      sensitive: products?.sensitive || false,
      acne: products?.acne || false,
      pigmentation: products?.hyperpigmentation || false,
      morning: products?.products_morning || [],
      night: products?.products_night || [],
    };
  }, [products]);

  const toggleOverlay = () => {
    getUserProducts();
    setVisible(!visible);
  };

  const goHome = () => {
    navigation.navigate("Home");
  };

  const handleRoutine = () => {
    let morning = productsMemo.morning;
    let night = productsMemo.night;
    if (morning.length === 0 && night.length === 0) {
      toggleOverlay();
    } else {
      // toggleOverlay();
      navigation.navigate("Routine");
    }
  };

  useEffect(() => {
    user.reload().then((data) => {
      setUser(user.displayName);
      setAvatar(user.photoURL);
    });
  }, [username, avatar, displayName, photoURL]);

  useEffect(() => {
    getUserProducts();
  }, [reload]);

  // Get product details
  const getUserProducts = async () => {
    setLoading(true);
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

    try {
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setProducts(docSnap.data());
            setLoading(false);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.wrapper}>
      <StatusBar style="dark" />
      <Notification />
      <RecommendModal
        visible={visible}
        toggleOverlay={toggleOverlay}
        skinData={productsMemo}
        goHome={goHome}
        setReload={setReload}
        reload={reload}
      />
      <View style={styles.avatarView}>
        <Text style={styles.header}>
          Hello, {username ? username : "Buddy"}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {avatar ? (
            <Avatar
              size={54}
              rounded
              source={{
                uri: avatar,
              }}
            />
          ) : (
            <Avatar
              size={54}
              rounded
              icon={{
                name: "account",
                type: "material-community",
                color: "grey",
              }}
              containerStyle={{
                borderColor: "grey",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getUserProducts} />
        }
      >
        <ReminderCard />
        <SkinInfoCard navigation={navigation} loading={loading} />
      </ScrollView>
      <View>
        <Button
          type="solid"
          title="Start routine"
          onPress={handleRoutine}
          buttonStyle={{
            backgroundColor: "rgba(253, 86, 85, 0.8)",
            margin: Platform.OS === "android" ? 5 : 10,
            height: Platform.OS === "android" ? 40 : 50,
            borderRadius: Platform.OS === "android" ? 7 : 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 1,
          }}
          titleStyle={{
            fontFamily: "Poppings-Bold",
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 40,
    backgroundColor: "#EADDD3",
    flex: 1,
  },

  contentContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    marginTop: 15,
    flexGrow: 1,
    maxHeight: 900,
  },
  avatarView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 5,
    fontFamily: "Poppings-Bold",
  },
});
