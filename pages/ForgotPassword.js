import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { auth, sendResetPassword } from "../firebase";

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    if (!email) {
      Alert.alert("Enter email");
      return;
    }
    setLoading(true);
    sendResetPassword(auth, email)
      .then(() => {
        setLoading(false);
        Alert.alert("Password reset email sent! (also check spam)");
      })
      .catch((error) => {
        setLoading(false);
        const errCode = error.code;
        const errMessage = error.message;
        Alert.alert(errMessage);
      });
  };
  return (
    <View style={styles.containerMain}>
      <View style={styles.topView}>
        <Image
          source={require("../assets/derma_auth.png")}
          style={{ resizeMode: "contain", height: 80, marginTop: 40 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Change your password</Text>

        <Input
          style={{ fontSize: 16, height: 45 }}
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />

        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <Button
            title="Send reset link"
            onPress={() => resetPassword()}
            disabled={loading}
            loading={loading}
            loadingProps={{
              size: "small",
              color: "#183950",
            }}
            titleStyle={{ fontWeight: "500", color: "#fff" }}
            buttonStyle={{
              backgroundColor: "#183950",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 8,
              paddingVertical: 15,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 15,
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
            <Text style={styles.underline}>Back to Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#183950",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  topView: {
    height: 100,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
  },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    height: "70%",
    justifyContent: "flex-start",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 20,
  },
  header: {
    fontSize: 15,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 15,
  },
  input: {
    width: "95%",
    height: 50,
    backgroundColor: "#efefef",
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: 45,
    backgroundColor: "#183950",
    borderColor: "grey",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPassword: {
    textAlign: "right",
    margin: 10,
    textDecorationLine: "underline",
  },
  underline: {
    textDecorationLine: "underline",
  },
});
