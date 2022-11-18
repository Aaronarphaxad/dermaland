import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import {
  auth,
  createUser,
  db,
  sendEmailverification,
  updateUserProfile,
} from "../firebase";
import { isEmail } from "../utils/helpers";
import { doc, setDoc, collection } from "../firebase";
import { profileData } from "../constants/profileData";

export const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Function to create new profile
  const createprofile = async (uid) => {
    // create new profile document
    const profileRef = await setDoc(doc(db, "profiles", `${uid}`), profileData)
      .then((data) => {})
      .catch((error) => {
        const errMessage = error.message;
        console.log("CREATE DOCUMENT ERROR", errMessage);
      });
    // console.log(profileRef);
  };

  const signUpWithEmail = () => {
    if (isEmail(email)) {
      if (password === confirmPassword) {
        setLoading(true);
        // create new user
        createUser(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential;
            // Call create profile function
            console.log("SENDING user uid", auth?.currentUser?.uid);
            createprofile(auth?.currentUser?.uid);
            // update username
            updateUserProfile(auth.currentUser, {
              displayName: username,
            })
              .then(() => {})
              .catch((error) => {
                // An error occurred
                const errorMessage = error.message;
                console.log("UPDATE USERNAME ERROR", errorMessage);
                setLoading(false);
              });

            // Send verification email
            sendEmailverification(auth.currentUser)
              .then(() => {
                clearInputs();
                Alert.alert("Welcome. Verification email sent! ");
              })
              .catch((error) => {
                const errMessage = error.message;
                Alert.alert("Email verification: ", errMessage);
                setLoading(false);
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert(errorMessage);
            setLoading(false);
          });
      } else {
        Alert.alert("Password mismatch/invalid password");
        setLoading(false);
        return;
      }
    } else {
      Alert.alert("Invalid email");
      setLoading(false);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}
        style={styles.containerMain}
      >
        <View style={styles.topView}>
          <Image
            source={require("../assets/derma_auth.png")}
            style={{ resizeMode: "contain", height: 100, marginTop: 20 }}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.header}>Hi, let’s get you set up 🤩</Text>

          <Input
            style={{ fontSize: 16 }}
            onChangeText={(newText) => setUsername(newText)}
            defaultValue={username}
            autoCapitalize={"none"}
            placeholder="Username"
          />
          <Input
            style={{ fontSize: 16 }}
            onChangeText={(newText) => setEmail(newText)}
            defaultValue={email}
            autoCapitalize={"none"}
            placeholder="Email"
          />
          <Input
            style={{ fontSize: 16 }}
            onChangeText={(newText) => setPassword(newText)}
            defaultValue={password}
            secureTextEntry={true}
            autoCapitalize={"none"}
            placeholder="Password"
          />
          <Input
            style={{ fontSize: 16 }}
            onChangeText={(newText) => setConfirmPassword(newText)}
            defaultValue={confirmPassword}
            secureTextEntry={true}
            autoCapitalize={"none"}
            placeholder="Confirm Password"
          />

          <View
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Button
              title="Sign up"
              onPress={() => signUpWithEmail()}
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
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
            <Text style={styles.underline}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // height: 900,
  },
  containerMain: {
    display: "flex",
    backgroundColor: "#59b2ab",
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
    marginBottom: 50,
  },
  regView: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
    flexGrow: 1,
    // justifyContent: "flex-end",
  },
  container: {
    display: "flex",
    backgroundColor: "#fff",
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: "flex-end",
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
    height: 20,
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
    // alignItems: "center",
    // justifyContent: "center",
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
    textAlign: "center",
  },
  googleView: {
    display: "flex",
    width: "100%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
  },
});
