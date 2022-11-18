import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { A } from "@expo/html-elements";

export const BlogScreen = ({ route }) => {
  const { product, text, text2, link, image } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{product}</Text>
      {/* {link && <Text style={styles.link}>Learn more: {link}</Text>} */}
      {link && (
        <A style={styles.link} href={link}>
          Learn more
        </A>
      )}

      <ScrollView style={{ maxHeight: 600 }}>
        <Text style={styles.text}>{text}</Text>
        {text2 && <Text style={styles.text}>{text2}</Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  title: {
    textTransform: "uppercase",
    fontSize: 25,
    fontFamily: "Poppings-Bold",
    textAlign: "center",
    marginTop: 10,
  },
  text: {
    textAlign: "justify",
    fontSize: 17,
    marginBottom: 10,
    padding: 5,
    fontFamily: "Poppings-Light",
  },
  image: {
    // flex: 1,
    width: 120,
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  link: {
    textDecorationLine: "underline",
    color: "#725DC0",
    marginBottom: 10,
  },
});
