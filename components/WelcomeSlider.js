import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";
import { useRef } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { introData } from "../constants/IntroData";

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    padding: 10,
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
    borderRadius: 10,
  },
  text: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppings-Light",
  },
  title: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontFamily: "Poppings-Bold",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "#1cb278",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Poppings-Bold",
  },
});

const renderItem = ({ item }) => (
  <View
    style={[
      styles.slide,
      {
        backgroundColor: item.bg,
      },
    ]}
  >
    <Text style={styles.title}>{item.title}</Text>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.text}>{item.text}</Text>
  </View>
);

const RenderPagination = ({ activeIndex, slider, data, onIntroCompleted }) => {
  const handleIntroCompleted = (screen) => {
    onIntroCompleted(screen);
  };
  return (
    <View style={styles.paginationContainer}>
      <SafeAreaView>
        <View style={styles.paginationDots}>
          {data.length > 1 &&
            data.map((_, i) => (
              <Pressable
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                ]}
                onPress={() => slider?.goToSlide(i, true)}
              />
            ))}
        </View>
        {activeIndex === data.length - 1 && (
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => handleIntroCompleted("Sign In")}
              style={[styles.button, { backgroundColor: "#59b2ab" }]}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            <Pressable
              onPress={() => handleIntroCompleted("Sign Up")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export const WelcomeSlider = ({ navigation }) => {
  const sliderEl = useRef(null);
  const keyExtractor = (item) => item.title;
  const onIntroCompleted = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderPagination={(activeIndex) => (
          <RenderPagination
            data={introData}
            activeIndex={activeIndex}
            slider={sliderEl.current}
            onIntroCompleted={onIntroCompleted}
          />
        )}
        data={introData}
        ref={sliderEl}
      />
    </View>
  );
};
