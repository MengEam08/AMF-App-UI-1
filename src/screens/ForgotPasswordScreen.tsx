import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen({ navigation }: any) {
  const [PhoneNumber, setPhoneNumber] = useState("");

  const handleReset = () => {
    console.log("Reset password for:", PhoneNumber);

    // Add API call here
    // navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#222"
        />
      </TouchableOpacity>

      {/* Icon */}
      <View style={styles.iconContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={60}
          color="#3B82F6"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Forgot Password
      </Text>

      <Text style={styles.subtitle}>
        Enter your phone number and we'll send you a code to reset your password.
      </Text>

      {/* Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="phone-portrait-outline"
          size={20}
          color="#777"
        />

        <TextInput
          placeholder="Enter your phone number"
          placeholderTextColor="#999"
          value={PhoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>
          Send OTP
        </Text>
      </TouchableOpacity>

      {/* Back Login */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>
          Back to Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },

  backButton: {
    width: 40,
    marginBottom: 30,
  },

  iconContainer: {
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 10,
    marginBottom: 35,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 25,
    height: 55,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#222",
  },

  button: {
    backgroundColor: "#01408f",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginText: {
    textAlign: "center",
    color: "#3B82F6",
    fontWeight: "600",
  },
});