import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Alert,
} from "react-native";
import { Avatar, Button } from "@rneui/themed";
import { auth, db, doc, getDoc } from "../firebase";
import { useState, useEffect, useMemo } from "react";
import ReminderCard from "../components/ReminderCard";
import SkinInfoCard from "../components/SkinInfoCard";
import { LogBox } from "react-native";
import RecommendModal from "../components/modals/RecommendModal";
import { summary } from "date-streaks";
import moment from "moment";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

const handleSendNotification = () => {
  return;
};

const handleSetTheAlarm = () => {
  return;
};

export const HomePage = ({ navigation }) => {
  const user = auth.currentUser;
  const { displayName, photoURL } = user;
  const [username, setUser] = useState(displayName);
  const [avatar, setAvatar] = useState(photoURL);
  const [visible, setVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState(null);

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
      navigation.navigate("Routine", {
        reload: reload,
        setReload: setReload,
      });
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
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

    try {
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setProducts(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <RecommendModal
        visible={visible}
        toggleOverlay={toggleOverlay}
        skinData={productsMemo}
        goHome={goHome}
        setReload={setReload}
        reload={reload}
      />
      <View style={styles.avatarView}>
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
      <Text style={styles.header}>Hi, {username ? username : "Buddy"}</Text>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}
      >
        <ReminderCard />
        <SkinInfoCard
          navigation={navigation}
          reload={reload}
          setReload={setReload}
        />
      </ScrollView>
      <View>
        <Button
          type="solid"
          title="Start routine"
          onPress={handleRoutine}
          buttonStyle={{
            backgroundColor: "#FD5655",
            margin: 10,
            height: 50,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          titleStyle={{
            fontFamily: "Poppings-Bold",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    backgroundColor: "#E7EFF6",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  header: {
    fontSize: 19,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 10,
    fontFamily: "Poppings-Bold",
  },
});
