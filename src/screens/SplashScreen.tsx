import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const splashImages = [
  require("../../assets/splash screen 1(New).png"),
  require("../../assets/splash screen 2(New).png"),
  require("../../assets/splash screen3(New).png"),
  require("../../assets/splash screen 4(New).png"),
  require("../../assets/splash screen 5(New).png"),
];

export default function SplashScreen({ navigation }: any) {
  const { width, height } = useWindowDimensions();
  const [currentImage, setCurrentImage] = useState(0);

  // Auto slide
  //   useEffect(() => {
  //     const imageInterval = setInterval(() => {
  //       setCurrentImage((prev) => {
  //         if (prev < splashImages.length - 1) {
  //           return prev + 1;
  //         } else {
  //           clearInterval(imageInterval);
  //           return prev;
  //         }
  //       });
  //     }, 2000);

  //     return () => {
  //       clearInterval(imageInterval);
  //     };
  //   }, []);

  // Skip splash
  const handleSkip = () => {
    navigation.replace("Main");
  };

  // Next image
  const handleNext = () => {
    if (currentImage < splashImages.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      navigation.replace("Main");
    } 
  };

  // Previous image
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Image */}
      <Image
        source={splashImages[currentImage]}
        style={[styles.image, { width, height }]}
        resizeMode="contain"
      />

      {/* Skip Button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        {/* Previous */}
        <TouchableOpacity
          style={[
            styles.circleButton,
            currentImage === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={currentImage === 0}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {splashImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentImage === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* Next */}
        <TouchableOpacity style={styles.circleButton} onPress={handleNext}>
          <Ionicons
            name={
              currentImage === splashImages.length - 1
                ? "checkmark"
                : "chevron-forward"
            }
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
},

image: {
  maxWidth: 600,
},

// image: {
//   width: width * 0.8,   
//   height: height * 0.6, 
//   alignSelf: "center",
//   marginTop: 80,
// },

  // Skip Button
  skipBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  skipText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Bottom Navigation
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  circleButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#003c95",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Dots
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#001f4d",
    width: 20,
  },
});
