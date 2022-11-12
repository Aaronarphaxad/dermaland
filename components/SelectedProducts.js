import { Icon } from "@rneui/themed";
import { View, StyleSheet, Text } from "react-native";

export const SelectedProduct = ({ item, period, setPeriod }) => {
  const handleRemove = () => {
    setPeriod(period?.filter((prod, i) => prod !== item));
  };
  return (
    <View style={styles.select}>
      <Text style={styles.selectText}>{item}</Text>
      <Icon
        onPress={handleRemove}
        name="close"
        type="ionicon"
        size={20}
        color="#fff"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  select: {
    width: "auto",
    height: 40,
    borderRadius: 8,
    padding: 5,
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#FD5655",
  },
  selectText: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Poppings-Bold",
  },
});
