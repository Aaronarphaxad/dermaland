import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeCard({
  children,
  height,
  background,
  half,
  pressEvent,
}) {
  return (
    <>
      {pressEvent ? (
        <TouchableOpacity
          onPress={pressEvent}
          style={[
            styles.container,
            styles.shadowProp2,
            {
              height: height ? height : 120,
              width: half ? "47%" : "100%",
              backgroundColor: background ? background : "transparent",
            },
          ]}
        >
          {children}
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.container,
            styles.shadowProp,
            {
              height: height,
              width: half ? "47%" : "100%",
              backgroundColor: background ? background : "transparent",
            },
          ]}
        >
          {children}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  shadowProp2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,

    elevation: 2,
  },
});
