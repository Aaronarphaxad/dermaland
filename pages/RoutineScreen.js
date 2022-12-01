import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  LogBox,
} from "react-native";
import { useEffect, useState, useMemo, useRef } from "react";
import { auth, db, doc, getDoc } from "../firebase";
import { Button, Icon, ListItem } from "@rneui/themed";
import { SelectedProduct } from "../components/SelectedProducts";
import Spinner from "react-native-loading-spinner-overlay";
import { getRandomImg } from "../utils/helpers";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function RoutineScreen({ navigation }) {
  const [index, setIndex] = useState(1);
  const [profile, setProfile] = useState(null);
  const [morning, setMorning] = useState([]);
  const [night, setNight] = useState([]);
  const [loading, setLoading] = useState(false);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const profileInfo = useMemo(() => {
    return {
      productsMorning: profile?.products_morning || [],
      productsNight: profile?.products_night || [],
      getImage: getRandomImg,
    };
  }, [profile]);

  // Add product to routine
  const handleAdd = (item, time) => {
    if (time === "morning") {
      setMorning([...morning, item]);
    }
    if (time === "night") {
      setNight([...night, item]);
    }
  };

  //   use effect to get user profile
  useEffect(() => {
    getUserProfile();
  }, []);

  // Get user details
  const getUserProfile = async () => {
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);
    const docSnap = await getDoc(docRef);
    try {
      setLoading(true);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setLoading(false);
        console.log("An error occured");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      console.log("An error occured");
    }
  };

  const handleStart = () => {
    if (
      profileInfo.productsMorning.length === 0 ||
      profileInfo.productsNight.length === 0
    ) {
      Alert.alert("Add day & night products to start routine");
      return;
    }
    if (index === 1) {
      if (morning.length === 0) {
        Alert.alert("Select products for routine");
        return;
      }
      navigation.navigate("Timer", {
        products: morning,
        imageUrl: profileInfo?.getImage(),
        setProducts: setMorning,
      });
    }
    if (index === 2) {
      if (night.length === 0) {
        Alert.alert("Select products for routine");
        return;
      }
      navigation.navigate("Timer", {
        products: night,
        imageUrl: profileInfo?.getImage(),
        setProducts: setNight,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} cancelable={false} />

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.col,
            { borderBottomColor: index === 1 ? "#FD5655" : "#e5e5e5" },
          ]}
          onPress={() => setIndex(1)}
        >
          <Icon name="sunny" type="ionicon" />
          <Text style={styles.tabText}>Morning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.col,
            { borderBottomColor: index === 2 ? "#FD5655" : "#e5e5e5" },
          ]}
          onPress={() => setIndex(2)}
        >
          <Icon name="moon" type="ionicon" />
          <Text style={styles.tabText}>Night</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 16 }}>
        Click + to select products for routine:
      </Text>
      {index === 1 && (
        <>
          <ScrollView style={{ maxHeight: 220, marginBottom: 15 }}>
            {profileInfo?.productsMorning.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
                <Icon
                  name="add"
                  type="ionicon"
                  onPress={() => handleAdd(item, "morning")}
                  size={25}
                />
              </ListItem>
            ))}
          </ScrollView>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.selectedView}
          >
            {morning.map((item, i) => {
              return (
                <SelectedProduct
                  key={i}
                  item={item}
                  setPeriod={setMorning}
                  period={morning}
                />
              );
            })}
          </ScrollView>
        </>
      )}
      {index === 2 && (
        <>
          <ScrollView style={{ maxHeight: 220, marginBottom: 15 }}>
            {profileInfo?.productsNight.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item}</ListItem.Title>
                </ListItem.Content>
                <Icon
                  name="add"
                  type="ionicon"
                  onPress={() => handleAdd(item, "night")}
                  size={25}
                />
              </ListItem>
            ))}
          </ScrollView>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.selectedView}
          >
            {night.map((item, i) => {
              return (
                <SelectedProduct
                  key={i}
                  item={item}
                  setPeriod={setNight}
                  period={night}
                />
              );
            })}
          </ScrollView>
        </>
      )}
      <View style={{ paddingBottom: 10 }}>
        <Button
          type="solid"
          title="Start"
          onPress={handleStart}
          buttonStyle={{
            backgroundColor: "#FD5655",
            margin: 10,
            borderRadius: 10,
            height: 50,
          }}
          titleStyle={{
            fontFamily: "Poppings-Bold",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    padding: 10,
    backgroundColor: "#D9D9D9",
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  col: {
    width: "50%",
    borderBottomWidth: 5,
    padding: 10,
  },
  tabText: {
    textAlign: "center",
    fontFamily: "Poppings-Bold",
  },

  selectedView: {
    // flex: 1,
    width: "auto",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 150,
  },
});
