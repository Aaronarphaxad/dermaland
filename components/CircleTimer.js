import { Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export const CircleTimer = ({ isPlaying, onComplete }) => (
  <CountdownCircleTimer
    isPlaying={isPlaying}
    duration={60}
    colors={["#FD5655", "#FF5E0E", "#A30000", "#A30000"]}
    colorsTime={[60, 30, 10, 1]}
    onComplete={onComplete}
    size={170}
    strokeWidth={15}
  >
    {({ remainingTime }) => (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 26 }}>{remainingTime}</Text>
        <Text style={{ fontSize: 20 }}>seconds left</Text>
      </View>
    )}
  </CountdownCircleTimer>
);
