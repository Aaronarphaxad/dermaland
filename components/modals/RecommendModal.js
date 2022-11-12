import { Button, Overlay, Icon, CheckBox, Alert } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import productsGenerator from "../../utils/productGenerator";
import { auth, db, doc, updateDoc } from "../../firebase";

const types = ["Dry", "Normal", "Oily"];

export default function RecommendModal({
  visible,
  toggleOverlay,
  skinData,
  goHome,
  reload,
  setReload,
}) {
  const [check1, setCheck1] = useState("Dry");
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [loading, setLoading] = useState(false);

  const profileRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);
  // console.log(check1, check2, check3, check4);
  // console.log(skinData);

  useEffect(() => {
    setCheck1(skinData?.skinType);
    setCheck2(skinData?.sensitive);
    setCheck3(skinData?.acne);
    setCheck4(skinData?.pigmentation);
  }, []);

  const handleRecommend = () => {
    setLoading(true);
    let obj = {
      type: check1,
      sensitive: check2,
      acne: check3,
      pigmentation: check4,
    };
    let generatedProducts = productsGenerator(obj);
    let morning = generatedProducts?.morning;
    let night = generatedProducts?.night;
    try {
      updateDoc(profileRef, {
        skin_type: check1,
        sensitive: check2,
        acne: check3,
        hyperpigmentation: check4,
        products_morning: morning,
        products_night: night,
      })
        .then(() => {
          setLoading(false);
          toggleOverlay();
          setReload(!reload);
          goHome();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // console.log("GENERATED PRODUCTS: ", productsGenerator(obj));
  };

  return (
    <View>
      <Spinner visible={loading} cancelable={true} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay} fullScreen>
        <View style={styles.row}>
          <TouchableOpacity onPress={toggleOverlay} style={styles.buttonBack}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
          <Text style={styles.textPrimary}>Hello!</Text>
          <Text></Text>
        </View>
        <Icon
          name="happy-outline"
          type="ionicon"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.textSecondary}>
          Looks like you have no routine products. Get recommendations based on
          skin information:
        </Text>
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
        />
        <CheckBox
          center
          checkedColor="#59b2ab"
          title="Acne"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={check3}
          onPress={() => setCheck3(!check3)}
        />
        <CheckBox
          center
          checkedColor="#59b2ab"
          title="Dyspigmentation"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={check4}
          onPress={() => setCheck4(!check4)}
        />
        <Button
          title="Recommend"
          onPress={() => handleRecommend()}
          buttonStyle={styles.button}
          loading={loading}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 40,
  },
  button: {
    margin: 10,
  },
  textPrimary: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 21,
    fontFamily: "Poppings-Bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppings-Light",
  },
  button: {
    backgroundColor: "#FD5655",
    borderRadius: 10,
    marginVertical: 5,
  },
});
