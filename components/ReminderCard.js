import { View, StyleSheet, Text, Switch, Alert } from "react-native";
import HomeCard from "./Card";
// import { Switch } from "@rneui/themed";
import { useState, useEffect, useRef, useMemo } from "react";
import { auth, db, doc, updateDoc, getDoc } from "../firebase";
import TimePicker from "./TimePicker";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { convertMsToTime } from "../utils/helpers";

export default function ReminderCard() {
  /**
   * USE STATE
   */
  const [isDatePickerVisible, setDatePickerVisibility] = useState({
    morning: false,
    evening: false,
  });
  const [loading, setLoading] = useState(false);
  // get the reminder data from firebase
  const [profileData, setProfileData] = useState(null);

  /**
   * USE MEMO
   */
  const profileInfo = useMemo(() => {
    return {
      reminderMorning: profileData?.reminder_morning || false,
      reminderNight: profileData?.reminder_night || false,
      checked: profileData?.reminder || false,
    };
  }, [profileData]);

  const profileRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

  //   Update reminder status
  const updateReminder = async () => {
    setLoading(true);
    await updateDoc(profileRef, {
      reminder: !profileInfo.checked,
    });
    // this is not needed
    getUserProfile();
    setLoading(false);
  };

  //   Update morning reminder
  const updateTime = async (time, period) => {
    setLoading(true);
    const TIMETOUPDATE = {
      night: "reminder_night",
      morning: "reminder_morning",
    };
    await updateDoc(profileRef, {
      [TIMETOUPDATE[period]]: time,
    });
    getUserProfile();
    setLoading(false);
  };

  // Get user details
  const getUserProfile = async () => {
    const docRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);
    try {
      setLoading(true);
      const docSnap = await getDoc(docRef);
      setProfileData(docSnap.data());
      if (docSnap.exists()) {
        console.log("Reminder data:", docSnap.data());
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  //   use effect to get user profile
  useEffect(() => {
    getUserProfile();
  }, []);

  const handleVisibleDatePicker = (current) => {
    setDatePickerVisibility((prev) => {
      return {
        ...prev,
        [current]: !prev[current],
      };
    });
  };

  const runWithLoading = (func) => {
    setLoading(true);
    try {
      func();
      setLoading(false);
    } catch (error) {
      console.log("ERROR");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} cancelable={false} />
      <HomeCard height={170} background={"#FEF6E5"}>
        <View style={styles.row}>
          <Text style={styles.header}>Reminder</Text>

          <Switch
            trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
            thumbColor={profileInfo.checked ? "#59b2ab" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateReminder}
            value={profileInfo.checked}
          />
        </View>
        {profileInfo.checked ? (
          <>
            <View style={styles.row}>
              <Text style={styles.displayText}>
                Morning:{" "}
                {profileInfo?.reminderMorning
                  ? profileInfo?.reminderMorning
                  : "Not set"}
              </Text>
              <TimePicker
                isDatePickerVisible={isDatePickerVisible.morning}
                handleVisibleDatePicker={() =>
                  handleVisibleDatePicker("morning")
                }
                updateTime={updateTime}
                period="morning"
                value={profileInfo.reminderMorning}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.displayText}>
                Night:{" "}
                {profileInfo?.reminderNight
                  ? profileInfo?.reminderNight
                  : "Not set"}
              </Text>
              <TimePicker
                isDatePickerVisible={isDatePickerVisible.evening}
                handleVisibleDatePicker={() =>
                  handleVisibleDatePicker("evening")
                }
                updateTime={updateTime}
                period="night"
                value={profileInfo.reminderNight}
              />
            </View>
          </>
        ) : (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <MaterialCommunityIcons name="alarm-off" color={"#000"} size={50} />
            <Text style={styles.timer}>Reminder off</Text>
          </View>
        )}
      </HomeCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  displayText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppings-Light",
  },
  text: {
    color: "#000",
  },
  timer: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
  },
});
