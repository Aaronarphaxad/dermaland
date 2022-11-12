import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import logo from "../assets/logo-sample.png";
import { useState } from "react";
import { auth, signIn } from "../firebase";

export const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const signInWithEmail = () => {
    setLoading(true);
    if (!email && !password) {
      Alert.alert("Please enter credentials");
      setLoading(false);
      return;
    }

    signIn(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // console.log(user);
        setLoading(false);
      })
      .catch((error) => {
        const errCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errCode);
        setLoading(false);
      });
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.topView}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Dermaland</Text>
        <Image source={logo} />
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome back, jump right in 🤸‍♀️</Text>

        <Input
          style={{ fontSize: 16 }}
          onChangeText={(newText) => setEmail(newText)}
          defaultValue={email}
          placeholder="Email"
          autoCapitalize={"none"}
        />
        <Input
          style={{ fontSize: 16 }}
          onChangeText={(newText) => setPassword(newText)}
          defaultValue={password}
          secureTextEntry={true}
          autoCapitalize={"none"}
          placeholder="Password"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Forgot Password")}
        >
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          {/* <TouchableOpacity
            onPress={() => signInWithEmail()}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign in"}
            </Text>
          </TouchableOpacity> */}
          <Button
            title="Sign in"
            onPress={() => signInWithEmail()}
            disabled={loading}
            loading={loading}
            loadingProps={{
              size: "small",
              color: "#59b2ab",
            }}
            titleStyle={{ fontWeight: "500", color: "#fff" }}
            buttonStyle={{
              backgroundColor: "#59b2ab",
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
          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text style={styles.underline}>Don't have an account? Sign up</Text>
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
