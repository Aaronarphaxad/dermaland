import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { Avatar, Switch, Button, Input } from "@rneui/themed";
import { auth, db, deleteAccount, deleteDoc, doc } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UpdateProfileModal } from "../components/modals/UpdateProfileModal";
import DeleteUserModal from "../components/modals/DeleteUser";

export const ProfilePage = () => {
  const user = auth.currentUser;
  const { email, displayName, photoURL } = user;
  const [username, setUsername] = useState(displayName);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const profileRef = doc(db, "profiles", `${user?.uid}`);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleDialog = () => {
    setVisible2(!visible2);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleDeleteUser = () => {
    deleteAccount(user)
      .then(() => {
        // User deleted.
        deleteDoc(profileRef)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // An error ocurred
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.scrollView}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          maxHeight: 1000,
        }}
        style={styles.container}
      >
        <UpdateProfileModal
          visible={visible}
          setVisible={setVisible}
          toggleOverlay={toggleOverlay}
          setUser={setUsername}
        />
        <DeleteUserModal
          visible={visible2}
          toggleDialog={toggleDialog}
          deleteUser={handleDeleteUser}
        />
        {photoURL ? (
          <Avatar
            size={114}
            rounded
            source={{
              uri: photoURL,
            }}
          />
        ) : (
          <Avatar
            size={114}
            rounded
            icon={{
              name: "account",
              type: "material-community",
              color: "grey",
            }}
            containerStyle={{
              borderColor: "grey",
              borderStyle: "solid",
              borderWidth: 1,
            }}
          />
        )}
        <Text style={styles.name}>{username ? username : email}</Text>
        <View style={styles.editProfile}>
          <Text style={styles.name}>Profile info</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="face-man" color={"#000"} size={20} />
          <Text style={styles.text}>{username}</Text>
          <Text></Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" color={"#000"} size={20} />
          <Text style={styles.text}>{email}</Text>
          <Text></Text>
        </View>
        <View style={styles.editProfile}>
          <Text style={styles.name}>Account</Text>
        </View>
        <TouchableOpacity
          onPress={toggleOverlay}
          style={[styles.row, styles.btn]}
        >
          <MaterialCommunityIcons name="pencil" color={"#000"} size={20} />
          <Text style={styles.text}>Edit profile</Text>
          <MaterialCommunityIcons name="arrow-right" color={"#000"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.row, styles.btn2]}
        >
          <MaterialCommunityIcons name="logout" color={"#000"} size={20} />
          <Text style={styles.text}>Sign out</Text>
          <MaterialCommunityIcons name="arrow-right" color={"#000"} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleDialog}
          style={[styles.row, styles.btn3, { marginTop: 20 }]}
        >
          <MaterialCommunityIcons name="delete" color={"#D8534E"} size={20} />
          <Text style={[styles.text, { color: "#D8534E" }]}>
            Delete account
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            color={"#D8534E"}
            size={20}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  container: {
    paddingTop: 20,
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Poppings-Bold",
  },

  editProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#FEF6E5",
    borderRadius: 10,
  },
  btn2: {
    backgroundColor: "#E3F5F4",
    borderRadius: 10,
  },
  btn3: {
    backgroundColor: "#FBE9E6",
    borderRadius: 10,
  },
  text: {
    fontFamily: "Poppings-Light",
  },
  row: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
