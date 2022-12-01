import { View, StyleSheet, Text, Switch, Alert } from "react-native";
import HomeCard from "./Card";
import { useState, useEffect, useRef, useMemo } from "react";
import { auth, db, doc, updateDoc, getDoc } from "../firebase";
import TimePicker from "./TimePicker";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  cancelAllNotifications,
  schedulePushNotification,
} from "../utils/Notification";
import { getHoursMinutes } from "../utils/helpers";
import { summary } from "date-streaks";
import moment from "moment";

export default function ReminderCard() {
  /**
   * USE STATE
   */
  const [isDatePickerVisible, setDatePickerVisibility] = useState({
    morning: false,
    evening: false,
  });
  const [loading, setLoading] = useState(false);
  // const [morningId, setMorningId] = useState(null);
  // const [nightId, setNightId] = useState(null);
  // get the reminder data from firebase
  const [profileData, setProfileData] = useState(null);

  // console.log("morning id", morningId);
  // console.log("night id", nightId);

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
        // console.log("Reminder data:", docSnap.data());
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

  // use effect to schedule user notification
  useEffect(() => {
    console.log("PROFILE DATAAA", profileData);
    if (profileData?.reminder) {
      if (profileData.reminder_morning) {
        scheduleReminderMorning();
      }
      if (profileData.reminder_night) {
        scheduleReminderNight();
      }
    }
  }, [profileData]);

  useEffect(() => {
    if (!profileData?.reminder) {
      cancelAllNotifications();
    }
  }, [profileData]);

  const scheduleReminderMorning = async () => {
    const streakArray = profileData?.streak;
    const streakFormat = streakArray?.map((d) =>
      moment(d, "MM-DD-YYYY").toDate()
    );
    const streak = summary(streakFormat)?.currentStreak;
    const user = auth?.currentUser?.displayName;
    try {
      let { hour, minutes } = getHoursMinutes(profileData?.reminder_morning);
      const id = await schedulePushNotification(hour, minutes, streak, user);
      // setMorningId(id);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const scheduleReminderNight = async () => {
    const streakArray = profileData?.streak;
    const streakFormat = streakArray?.map((d) =>
      moment(d, "MM-DD-YYYY").toDate()
    );
    const streak = summary(streakFormat)?.currentStreak;
    const user = auth?.currentUser?.displayName;
    try {
      let { hour, minutes } = getHoursMinutes(profileData?.reminder_night);
      const id = await schedulePushNotification(hour, minutes, streak, user);
      // setNightId(id);
    } catch (error) {
      Alert.alert(error);
    }
  };

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
      <HomeCard height={160} background={"#183950"}>
        <View style={styles.row}>
          <Text style={styles.header}>Reminder</Text>

          <Switch
            trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
            thumbColor={profileInfo.checked ? "#183950" : "#f4f3f4"}
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
            <MaterialCommunityIcons name="alarm-off" color={"#fff"} size={50} />
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
    color: "#fff",
    fontFamily: "Poppings-Bold",
  },
  displayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppings-Light",
  },
  text: {
    color: "#fff",
  },
  timer: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    fontFamily: "Poppings-Bold",
  },
});
