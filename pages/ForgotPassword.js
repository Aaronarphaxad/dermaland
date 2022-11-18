import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { auth, sendResetPassword } from "../firebase";

export const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
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
          style={{ resizeMode: "contain", height: 100, marginTop: 20 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Change your password</Text>

        <Input
          style={{ fontSize: 16 }}
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />

        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => resetPassword()}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending..." : "Send reset link"}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "#59b2ab",
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
    backgroundColor: "#59b2ab",
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
