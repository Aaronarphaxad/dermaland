import { View, StyleSheet, Text, Image, Alert } from "react-native";
import HomeCard from "./Card";
import { Icon } from "@rneui/themed";
import { useState, useMemo, useEffect } from "react";
import { auth, db, doc, getDoc } from "../firebase";
import UpdateSkinInfoModal from "./modals/UpdateSkinInfoModal";
import { summary } from "date-streaks";

const SkinInfoCard = ({ navigation, reload, setReload }) => {
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [streak, setStreak] = useState([]);

  const skinInfo = useMemo(() => {
    return {
      skinType: profile?.skin_type || "N/A",
      sensitive: profile?.sensitive || false,
      acne: profile?.acne || false,
      pigmentation: profile?.hyperpigmentation || false,
      productsMorning: profile?.products_morning || [],
      productsNight: profile?.products_night || [],
    };
  }, [profile]);

  const toggleOverlay = () => {
    setVisible(!visible);
    getUserProfile();
    getStreak();
  };

  useEffect(() => {
    getUserProfile();
    getStreak();
  }, []);

  // Get user details
  const getUserProfile = async () => {
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);
    const docSnap = await getDoc(docRef);
    try {
      if (docSnap.exists()) {
        console.log("Document SKIN data:", docSnap.data());
        setProfile(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        // setLoading(false);
      }
    } catch (error) {
      // Alert.alert("An error occured");
      console.log(error);
    }
  };

  // Get user streak details
  const getStreak = async () => {
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);
    try {
      // setLoading(true);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()?.streak;
      if (data.length > 0) {
        // let arr = data.map((item) => item.toDate());
        // let arrStrip = arr.map((item) => item.split("T")[0]);
        // console.log(arrStrip);
        setStreak(summary(data)?.currentStreak);
        setReload(!reload);
      } else {
        setStreak(summary(data)?.currentStreak);
      }
      if (docSnap.exists()) {
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      // setLoading(false);
    }
  };
  return (
    <>
      <HomeCard height={150} background={"#E3F5F4"}>
        <UpdateSkinInfoModal
          visible={visible}
          toggleOverlay={toggleOverlay}
          skinType={skinInfo.skinType}
          sensitive={skinInfo.sensitive}
          acne={skinInfo.acne}
          pigmentation={skinInfo.pigmentation}
        />
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.header}>Skin info</Text>
            <Icon onPress={toggleOverlay} type="fontawesome" name="settings" />
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.displayText, styles.bold]}>Type</Text>
              <Text style={styles.displayText}>{skinInfo.skinType}</Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.displayText, styles.bold]}>Sensitive</Text>
              <Text style={styles.displayText}>
                {skinInfo.sensitive ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.displayText, styles.bold]}>Acne</Text>
              <Text style={styles.displayText}>
                {skinInfo.acne ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.displayText, styles.bold]}>
                Pigmentation
              </Text>
              <Text style={styles.displayText}>
                {skinInfo.pigmentation ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.column}></View>
          </View>
        </View>
      </HomeCard>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <HomeCard height={150} background={"#E9E7F8"} half>
          <View style={styles.container2}>
            <Text style={styles.halfHeader}>Streak</Text>
            <Text style={styles.streakText}>{streak}</Text>
          </View>
        </HomeCard>
        <HomeCard
          height={150}
          background={"#E9E7F8"}
          half
          pressEvent={() =>
            navigation.navigate("Products", {
              productsMorning: skinInfo.productsMorning || [],
              productsNight: skinInfo.productsNight || [],
              getUserProfile: getUserProfile,
            })
          }
        >
          <View style={styles.container2}>
            <Text style={styles.halfHeader}>Products</Text>
            <Image
              source={require("../assets/images/products.png")}
              style={{ marginTop: 10 }}
            />
          </View>
        </HomeCard>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    width: "100%",
    padding: 8,
  },
  container2: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    paddingLeft: 7,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#51BFBD",
  },
  displayText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppings-Light",
  },
  column: {
    height: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 3,
  },
  bold: {
    fontFamily: "Poppings-Bold",
  },
  halfHeader: {
    fontFamily: "Poppings-Bold",
    fontSize: 18,
  },
  streakText: {
    fontSize: 50,
    fontFamily: "Poppings-Black",
    marginTop: 10,
  },
});

export default SkinInfoCard;
