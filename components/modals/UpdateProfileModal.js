import React, { useState, useEffect } from "react";
import { Button, Overlay, Icon, Input, Avatar, Badge } from "@rneui/themed";
import { View, Text, StyleSheet, Alert } from "react-native";
import { auth, updateUserProfile } from "../../firebase";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native";

export const UpdateProfileModal = ({
  visible,
  toggleOverlay,
  setUser,
  setAvatar,
}) => {
  const user = auth.currentUser;
  const { email, displayName, photoURL } = user;
  const [username, setUsername] = useState(displayName);
  const [image, setImage] = useState(photoURL);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  let photo;
  if (!photoURL) {
    photo =
      "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg";
  } else {
    photo = photoURL;
  }

  const pickImage = async () => {
    if (!status.granted) {
      requestPermission();
    }
    if (status.granted) {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 1,
      });
      if (!result.canceled) {
        // setImage(result.uri);
        // console.log(result.assets[0].base64);
        let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
        setPreview(base64Img);
      }
    }
  };

  useEffect(() => {
    setUser(displayName);
  }, [displayName]);

  const handleUpdate = () => {
    setLoading(true);
    let apiUrl = "https://api.cloudinary.com/v1_1/gifts-paddy/upload";
    const CLOUDINARY_UPLOAD_PRESET = "enpsgsuw";
    let data = {
      file: preview,
      upload_preset: CLOUDINARY_UPLOAD_PRESET,
    };
    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => {
        let data = await r.json();

        let objWithImage = {
          displayName: username,
          photoURL: data.secure_url,
        };
        let objWithoutImage = {
          displayName: username,
        };

        let uploadObj = data ? objWithImage : objWithoutImage;
        updateUserProfile(auth.currentUser, uploadObj)
          .then(() => {
            // Profile updated!
            Alert.alert("Profile updated!");
            user.reload().then(() => {
              setUsername(auth?.currentUser?.displayName);
            });
            console.log("URL TO SAVE", data.secure_url);
            setImage(data.secure_url);
            if (data.secure_url) {
              setAvatar(data.secure_url);
            }
            setPreview("");
            setLoading(false);
            toggleOverlay();
          })
          .catch((error) => {
            // An error occurred
            const errorMessage = error.message;
            Alert.alert(errorMessage);
            console.log(errorMessage);
            setLoading(false);
          });
        return data;
      })
      .catch((err) => {
        Alert.alert(err);
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <View>
      <Overlay
        overlayStyle={{ width: "90%", borderRadius: 10 }}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.textSecondary}>Edit Profile</Text>
        <View>
          <TouchableOpacity onPress={() => pickImage()}>
            {preview ? (
              <Avatar
                size={84}
                rounded
                source={{
                  uri: preview,
                }}
              />
            ) : (
              <Avatar
                size={84}
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
            <Badge
              status="primary"
              value={"+"}
              containerStyle={{ position: "absolute", bottom: 5, left: 60 }}
            />
          </TouchableOpacity>
        </View>
        <Input
          defaultValue={email}
          // onChangeText={(newText) => setUsername(newText)}
          style={{ fontFamily: "Poppings-Light" }}
          disabled
        />
        <Input
          defaultValue={username}
          onChangeText={(newText) => setUsername(newText)}
          style={{ fontFamily: "Poppings-Light" }}
        />
        <Button
          buttonStyle={{ backgroundColor: "#183950", borderRadius: 10 }}
          onPress={() => handleUpdate()}
          title="Update"
          titleStyle={{ fontFamily: "Poppings-Bold" }}
          disabled={loading}
          loading={loading}
          loadingProps={{
            size: "small",
            color: "rgba(111, 202, 186, 1)",
          }}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 19,
    fontFamily: "Poppings-Bold",
  },
});
