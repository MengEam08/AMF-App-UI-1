import React from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

export default function AnimatedPress({ children, onPress }: any) {
  const scale = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.wrapper,
          { transform: [{ scale }] }
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: "stretch", // 🔥 CRITICAL
  },
  wrapper: {
    width: "100%", // 🔥 CRITICAL
  },
});