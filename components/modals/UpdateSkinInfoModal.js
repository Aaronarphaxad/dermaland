import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Button, Overlay, Icon, Input, CheckBox } from "@rneui/themed";
import { auth, db, doc, updateDoc } from "../../firebase";
import Spinner from "react-native-loading-spinner-overlay";
import productsGenerator from "../../utils/productGenerator";

const types = ["Dry", "Normal", "Oily"];

export default function UpdateSkinInfoModal({ visible, toggleOverlay }) {
  const [check1, setCheck1] = useState("Normal");
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [loading, setLoading] = useState(false);

  const profileRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateDoc(profileRef, {
        skin_type: check1 === "N/A" ? "Normal" : check1,
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

  const handleRecommend = () => {
    setLoading(true);
    let obj = {
      type: check1 ? check1 : "Normal",
      sensitive: check2 === true || false ? check2 : false,
      acne: check3 === true || false ? check3 : false,
      pigmentation: check4 === true || false ? check4 : false,
    };
    // console.log(obj);
    console.log(productsGenerator(obj));
    let generatedProducts = productsGenerator(obj);
    let morning = generatedProducts?.morning;
    let night = generatedProducts?.night;
    try {
      updateDoc(profileRef, {
        skin_type: check1 === "N/A" ? "Normal" : check1,
        sensitive: check2 === true || false ? check2 : false,
        acne: check3 === true || false ? check3 : false,
        hyperpigmentation: check4 === true || false ? check4 : false,
        products_morning: morning,
        products_night: night,
      })
        .then(() => {
          setLoading(false);
          toggleOverlay();
          Alert.alert("Recommended products added to products list");
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(error.message);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Overlay
      overlayStyle={{ width: "90%", borderRadius: 10 }}
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
      <TouchableOpacity onPress={handleRecommend} style={styles.recommend}>
        <Text style={styles.recommendText}>Get product recommendation</Text>
      </TouchableOpacity>
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
  recommend: {
    marginTop: 20,
    marginBottom: 10,
  },
  recommendText: {
    fontFamily: "Poppings-Bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
