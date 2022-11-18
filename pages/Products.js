import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Button, Icon, Input, ListItem, Tab, TabView } from "@rneui/themed";
import Spinner from "react-native-loading-spinner-overlay";
import { auth, db, doc, updateDoc } from "../firebase";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state.",
]);

export default function ProductsPage({ route, navigation }) {
  const { productsMorning, productsNight, getUserProfile } = route.params;
  const [productListMorning, setProductListM] = useState([]);
  const [productListNight, setProductListN] = useState([]);
  const [inputValueM, setInputValueM] = useState("");
  const [inputValueN, setInputValueN] = useState("");
  const [canUpdateM, setCanUpdateM] = useState(true);
  const [canUpdateN, setCanUpdateN] = useState(true);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(1);
  const inputRef = useRef();
  const inputRef2 = useRef();
  const profileRef = doc(db, "profiles", `${auth?.currentUser?.uid}`);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  useEffect(() => {
    setProductListM(productsMorning);
    setProductListN(productsNight);
    setLoading(false);
  }, []);

  // Update products list
  const handleUpdate = async (time) => {
    try {
      if (time === "morning") {
        if (productListMorning.toString() === productsMorning.toString()) {
          Alert.alert("No changes made");
          return;
        }
        setLoading(true);
        await updateDoc(profileRef, {
          products_morning: productListMorning,
        });
        setCanUpdateM(true);
      }
      if (time === "night") {
        if (productListNight.toString() === productsNight.toString()) {
          Alert.alert("No changes made");
          return;
        }
        setLoading(true);
        await updateDoc(profileRef, {
          products_night: productListNight,
        });
        setCanUpdateN(true);
      }
      getUserProfile();
      Alert.alert("Products updated!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddProductsM = () => {
    if (!inputValueM) return;
    setProductListM((prev) => [...prev, inputValueM]);
    // getUserProfile();
    inputRef.current.clear();
    setCanUpdateM(false);
  };
  const handleAddProductsN = () => {
    if (!inputValueN) return;
    setProductListN((prev) => [...prev, inputValueN]);
    // getUserProfile();
    inputRef2.current.clear();
    setCanUpdateN(false);
  };

  const removeItem = (i, l, time) => {
    if (time === "morning") {
      setProductListM(
        productListMorning.filter((item) => item !== productListMorning[i])
      );
      setCanUpdateM(false);
      Alert.alert(`Removed item ${l}`);
    }
    if (time === "night") {
      setProductListN(
        productListNight.filter((item) => item !== productListNight[i])
      );
      setCanUpdateN(false);
      Alert.alert(`Removed item ${l}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Spinner visible={loading} cancelable={false} />

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.col,
            { borderBottomColor: index === 1 ? "#59b2ab" : "#e5e5e5" },
          ]}
          onPress={() => setIndex(1)}
        >
          <Icon name="sunny" type="ionicon" />
          <Text style={styles.tabText}>Morning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.col,
            { borderBottomColor: index === 2 ? "#59b2ab" : "#e5e5e5" },
          ]}
          onPress={() => setIndex(2)}
        >
          <Icon name="moon" type="ionicon" />
          <Text style={styles.tabText}>Night</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginBottom: 10, fontFamily: "Poppings-Light" }}>
        Swipe to delete
      </Text>
      {index === 1 && (
        <>
          {productListMorning?.length === 0 ? (
            <>
              <Icon name="sad-outline" type="ionicon" size={70} style={80} />
              <Text
                style={{
                  fontFamily: "Poppings-Light",
                  fontSize: 17,
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                Nothing to show
              </Text>
            </>
          ) : (
            <>
              <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
                {productListMorning?.map((l, i) => (
                  <ListItem.Swipeable
                    rightContent={(reset) => (
                      <Button
                        title="Delete"
                        onPress={() => {
                          reset();
                          removeItem(i, l, "morning");
                        }}
                        icon={{ name: "delete", color: "white" }}
                        buttonStyle={{
                          minHeight: "100%",
                          backgroundColor: "red",
                        }}
                      />
                    )}
                    key={i}
                  >
                    <Icon
                      onPress={() => removeItem(i, l, "morning")}
                      name="delete"
                      type="fontawesome"
                    />

                    <ListItem.Content>
                      <ListItem.Title>{l}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem.Swipeable>
                ))}
              </ScrollView>
            </>
          )}

          <Input
            placeholder="Enter products"
            onChangeText={(value) => setInputValueM(value)}
            ref={inputRef}
            rightIcon={
              <Icon
                onPress={handleAddProductsM}
                name="add-circle"
                type="ionicon"
                size={24}
                color="black"
              />
            }
          />
          <Text style={{ marginBottom: 10, fontFamily: "Poppings-Light" }}>
            Click the + button to add products to list
          </Text>
          <Button
            title="Update Morning"
            onPress={() => handleUpdate("morning")}
            buttonStyle={{
              backgroundColor: "#59b2ab",
              borderRadius: 10,
            }}
            titleStyle={{
              fontFamily: "Poppings-Bold",
            }}
            disabled={canUpdateM}
          />
        </>
      )}
      {index === 2 && (
        <>
          {productListNight?.length === 0 ? (
            <>
              <Icon name="sad-outline" type="ionicon" size={70} style={80} />
              <Text
                style={{
                  fontFamily: "Poppings-Light",
                  fontSize: 17,
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                Nothing to show
              </Text>
            </>
          ) : (
            <>
              <ScrollView style={{ maxHeight: 300, marginBottom: 10 }}>
                {productListNight?.map((l, i) => (
                  <ListItem.Swipeable
                    rightContent={(reset) => (
                      <Button
                        title="Delete"
                        onPress={() => {
                          reset();
                          removeItem(i, l, "night");
                        }}
                        icon={{ name: "delete", color: "white" }}
                        buttonStyle={{
                          minHeight: "100%",
                          backgroundColor: "red",
                        }}
                      />
                    )}
                    key={i}
                  >
                    <Icon
                      onPress={() => removeItem(i, l, "night")}
                      name="delete"
                      type="fontawesome"
                    />

                    <ListItem.Content>
                      <ListItem.Title>{l}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem.Swipeable>
                ))}
              </ScrollView>
            </>
          )}
          <Input
            placeholder="Enter products"
            onChangeText={(value) => setInputValueN(value)}
            ref={inputRef2}
            rightIcon={
              <Icon
                onPress={handleAddProductsN}
                name="add-circle"
                type="ionicon"
                size={24}
                color="black"
              />
            }
          />
          <Text style={{ marginBottom: 10, fontFamily: "Poppings-Light" }}>
            Click the + button to add products to list
          </Text>
          <Button
            title="Update Night"
            onPress={() => handleUpdate("night")}
            buttonStyle={{
              backgroundColor: "#59b2ab",
              borderRadius: 10,
            }}
            titleStyle={{
              fontFamily: "Poppings-Bold",
            }}
            disabled={canUpdateN}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingTop: 30,
    backgroundColor: "#EADDD3",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  col: {
    width: "50%",
    borderBottomWidth: 5,
    padding: 10,
  },
  tabText: {
    textAlign: "center",
    fontFamily: "Poppings-Bold",
  },
});
