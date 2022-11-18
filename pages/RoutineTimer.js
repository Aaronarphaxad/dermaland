import { Icon } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
  LogBox,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { CircleTimer } from "../components/CircleTimer";
import { auth, db, doc, getDoc, updateDoc } from "../firebase";
// import { summary } from "date-streaks";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);

export const RoutineTimer = ({ route, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playing, setPlaying] = useState(0);
  const [next, setNext] = useState(playing + 1);
  const [streak, setStreak] = useState([]);
  const [isRoutineDone, setRoutine] = useState();
  const { imageUrl, products, setProducts } = route.params;

  const profileRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state.",
  ]);

  useEffect(() => {
    getStreak();
  }, []);

  const onComplete = () => {
    getStreak();
    setPlaying((prev) => prev + 1);
    setNext((prev) => prev + 1);
    let today = new Date().toLocaleDateString("en-US");

    if (next < products.length) {
      return { shouldRepeat: true, delay: 1 };
    }
    if (isRoutineDone) {
      Alert.alert("Routine completed");
      setProducts([]);
      return { shouldRepeat: false };
    }
    updateDoc(profileRef, {
      streak: [...streak, today],
    })
      .then((data) => {
        Alert.alert("Routine completed. Streak + 1");
        setProducts([]);
      })
      .catch((error) => {
        console.log(error.message);
      });

    return { shouldRepeat: false };
  };
  // Get user details
  const getStreak = async () => {
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);
    try {
      // setLoading(true);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()?.streak;
      if (data.length > 0) {
        setStreak(data);
        // Check if routin has been done today
        setRoutine(data?.includes(new Date().toLocaleDateString("en-US")));
      } else {
        setStreak(data);
        setRoutine(false);
      }
      if (docSnap.exists()) {
        // console.log("Document streak:", docSnap.data()?.streak);
        // setLoading(false);
        setReload(!reload);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        // setLoading(false);
      }
    } catch (error) {
      // setLoading(false);
    }
  };

  return (
    <View style={styles.scrollView}>
      <ImageBackground
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
      <Icon
        onPress={() => navigation.goBack()}
        type="ionicon"
        name="arrow-back"
        color={"#fff"}
        size={180}
        style={styles.icon}
      />
      <View style={styles.roundedCard}>
        <TouchableOpacity style={styles.playView}>
          {isPlaying ? (
            <Icon
              onPress={() => setIsPlaying(!isPlaying)}
              name="pause-outline"
              type="ionicon"
              color="#fff"
              size={25}
            />
          ) : (
            <Icon
              onPress={() => setIsPlaying(!isPlaying)}
              name="play-outline"
              type="ionicon"
              color="#fff"
              size={25}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.header}>{products[playing]}</Text>
        <CircleTimer isPlaying={isPlaying} onComplete={onComplete} />
        <View style={styles.next}>
          <Text style={styles.nextHeader}>Next: </Text>
          <Text style={styles.nextText}>{products[next]}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 20,
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: "#e5e5e5",
    height: "100%",
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 10,
    elevation: Platform.OS === "android" ? 10 : 0,
  },
  image: {
    height: "70%",
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    flex: 1,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  roundedCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "60%",
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    elevation: Platform.OS === "android" ? 10 : 0,
    paddingBottom: 20,
  },
  playView: {
    backgroundColor: "#FD5655",
    borderRadius: 50,
    height: 55,
    width: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -19,
    right: 50,
  },
  header: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 35,
    fontFamily: "Poppings-Bold",
  },
  next: {
    alignItems: "center",
  },
  nextHeader: {
    // alignItems: "end",
    fontSize: 20,
    fontFamily: "Poppings-Bold",
  },
  nextText: {
    fontSize: 18,
    fontFamily: "Poppings-Light",
  },
});
