import { Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export const CircleTimer = ({ isPlaying, onComplete }) => (
  <CountdownCircleTimer
    isPlaying={isPlaying}
    duration={5}
    colors={["#FD5655", "#FF5E0E", "#A30000", "#A30000"]}
    colorsTime={[60, 30, 10, 1]}
    onComplete={onComplete}
    size={180}
    strokeWidth={15}
  >
    {({ remainingTime }) => (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 28 }}>{remainingTime}</Text>
        <Text style={{ fontSize: 22 }}>seconds left</Text>
      </View>
    )}
  </CountdownCircleTimer>
);
