import { Button, Dialog, Icon } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

export default function DeleteUserModal({ visible, toggleDialog, deleteUser }) {
  return (
    <View>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <View>
          <Text style={styles.header}>
            Are you sure you want to delete your account?
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              onPress={toggleDialog}
              title="No"
              buttonStyle={[styles.button, { backgroundColor: "#183950" }]}
              titleStyle={{
                fontFamily: "Poppings-Bold",
                fontSize: 16,
              }}
            />
            <Button
              onPress={deleteUser}
              title="Yes"
              type="outline"
              buttonStyle={[styles.button, { borderColor: "#D8534E" }]}
              titleStyle={{
                fontFamily: "Poppings-Bold",
                color: "#D8534E",
                fontSize: 16,
              }}
            />
          </View>
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 90,
    margin: 5,
  },

  buttonContainer: {
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Poppings-Bold",
  },
  text: {
    fontFamily: "Poppings-Light",
  },
});
