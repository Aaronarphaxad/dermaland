import { Button } from "@rneui/themed";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import HomeCard from "../components/Card";
import { learnData } from "../constants/LearnData";

const CardComp = ({ name, image, goToBlog }) => {
  return (
    <HomeCard
      height={150}
      background="rgba(299, 299, 299, 0.5)"
      pressEvent={goToBlog}
    >
      <View style={styles.cardView}>
        <Text style={styles.cardText}>{name}</Text>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      </View>
    </HomeCard>
  );
};

export const LearnPage = ({ navigation }) => {
  return (
    <View style={styles.scrollView}>
      <ImageBackground
        resizeMode={"stretch"}
        style={styles.imgBackground}
        source={{
          uri: "https://res.cloudinary.com/gifts-paddy/image/upload/v1668948784/dermaland/IMG_2399_mlhsaz.jpg",
        }}
      >
        <Text style={styles.name}>Skin care pocket guide</Text>

        <FlatList
          data={learnData}
          renderItem={({ item }) => {
            return (
              <CardComp
                name={item.product}
                text={item.text}
                text2={item.text2}
                image={item.image}
                link={item.link}
                goToBlog={() => {
                  navigation.navigate("Blog", {
                    product: item.product,
                    text: item.text,
                    text2: item?.text2,
                    link: item?.link,
                    image: item.image,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item, index) => item.id}
          style={{ padding: 10 }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    fontFamily: "Poppings-Black",
    fontSize: 27,
    marginTop: 50,
    textAlign: "center",
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  cardText: {
    fontFamily: "Poppings-Bold",
    fontSize: 25,
    marginTop: 20,
    flex: 2,
    textTransform: "capitalize",
  },
  image: {
    flex: 1,
    width: 30,
    height: null,
    resizeMode: "contain",
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
