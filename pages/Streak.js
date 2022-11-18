import { summary } from "date-streaks";
import { View, Text, StyleSheet } from "react-native";
import HomeCard from "../components/Card";

export const StreakScreen = ({ route }) => {
  const { streak } = route.params;
  const { currentStreak, todayInStreak, longestStreak, withinCurrentStreak } =
    summary(streak);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Streak record</Text>

      <View style={styles.row}>
        <HomeCard half background="#C8988F" height={120}>
          <View style={styles.column}>
            <Text style={styles.text}>Current Streak</Text>
            <Text style={styles.text2}>{currentStreak}</Text>
          </View>
        </HomeCard>
        <HomeCard half background="#ADBDB5" height={120}>
          <View style={styles.column}>
            <Text style={styles.text}>Today in streak?</Text>
            <Text style={styles.text3}>{todayInStreak ? "Yes" : "No"}</Text>
          </View>
        </HomeCard>
      </View>
      <View style={styles.row}>
        <HomeCard half background="#ADBDB5" height={120}>
          <View style={styles.column}>
            <Text style={styles.text}>Longest streak</Text>
            <Text style={styles.text2}>
              {longestStreak > 0 ? longestStreak + " 🔥" : longestStreak}
            </Text>
          </View>
        </HomeCard>
        <HomeCard half background="#C8988F" height={120}>
          <View style={styles.column}>
            <Text style={styles.text}>Within current streak</Text>
            <Text style={styles.text3}>
              {withinCurrentStreak ? "Yes" : "No"}
            </Text>
          </View>
        </HomeCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#EADDD3",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontFamily: "Poppings-Bold",
    fontSize: 20,
    marginVertical: 5,
  },
  text: {
    fontFamily: "Poppings-Bold",
    color: "#fff",
    textAlign: "center",
  },
  text2: {
    fontFamily: "Poppings-Bold",
    color: "#fff",
    fontSize: 35,
  },
  text3: {
    fontFamily: "Poppings-Bold",
    color: "#fff",
    fontSize: 30,
  },
});
