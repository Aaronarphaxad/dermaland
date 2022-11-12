import { View, Text, Alert, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Button, Overlay, Icon, Input, CheckBox } from "@rneui/themed";
import { auth, db, doc, updateDoc } from "../../firebase";
import Spinner from "react-native-loading-spinner-overlay";

const types = ["Dry", "Normal", "Oily"];

export default function UpdateSkinInfoModal({
  visible,
  toggleOverlay,
  skinType,
  sensitive,
  acne,
  pigmentation,
}) {
  const [check1, setCheck1] = useState(skinType || "Dry");
  const [check2, setCheck2] = useState(sensitive);
  const [check3, setCheck3] = useState(acne);
  const [check4, setCheck4] = useState(pigmentation);
  const [loading, setLoading] = useState(false);

  const profileRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

  useEffect(() => {
    setCheck1(skinType);
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateDoc(profileRef, {
        skin_type: check1 || "Dry",
        sensitive: check2,
        acne: check3,
        hyperpigmentation: check4,
      });
      Alert.alert("Skin info updated!");
      setLoading(false);
      toggleOverlay();
    } catch (error) {
      Alert.alert("An error occured, try again");
      setLoading(false);
    }
  };

  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={toggleOverlay}
    >
      <Spinner visible={loading} cancelable={false} />
      <SelectDropdown
        data={types}
        onSelect={(selectedItem, index) => {
          setCheck1(selectedItem);
        }}
        defaultButtonText="Select skin type"
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        defaultValue={check1}
        buttonStyle={{ backgroundColor: "#F5F5F5", width: "100%" }}
        renderDropdownIcon={() => <Icon name="chevron-down" type="ionicon" />}
      />
      <CheckBox
        center
        checkedColor="#59b2ab"
        title="Sensitive"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check2}
        onPress={() => setCheck2(!check2)}
        textStyle={styles.text}
      />
      <CheckBox
        center
        checkedColor="#59b2ab"
        title="Acne"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check3}
        onPress={() => setCheck3(!check3)}
        textStyle={styles.text}
      />
      <CheckBox
        center
        checkedColor="#59b2ab"
        title="Dyspigmentation"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={check4}
        onPress={() => setCheck4(!check4)}
        textStyle={styles.text}
      />
      <Button
        buttonStyle={[
          { backgroundColor: "#59b2ab", borderRadius: 10 },
          styles.header,
        ]}
        onPress={() => handleUpdate()}
        title="Update"
      />
    </Overlay>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Poppings-Bold",
  },
  text: {
    fontFamily: "Poppings-Light",
  },
});
