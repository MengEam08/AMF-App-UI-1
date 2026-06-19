import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AnimatedPress from "../components/AnimatedPress";
import { LinearGradient } from "expo-linear-gradient";

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import LanguageButton from "../components/LanguageButton";
import BackButton from "../components/BackButton";

export default function SignupScreen({ navigation, setIsLoggedIn }: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const [lang, setLang] = useState("EN");

  const toggleLang = () => {
    setLang(lang === "EN" ? "KH" : "EN");
  };

  // 🔥 FIXED SIGNUP LOGIC
  const handleSignup = () => {
    if (!name || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    Alert.alert("Success", "Account created!");

    // ✅ set login state
    setIsLoggedIn(true);

    // ✅ IMPORTANT: go to main app (same as login flow)
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      {/* <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} /> */}

      <View style={styles.topBar}>
        <BackButton />
        <LanguageButton
          lang={lang}
          onPress={toggleLang}
          style={styles.langButton}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.logo}
            />

            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          {/* Name */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#434343" />

            <TextInput
              placeholder="Full Name"
              placeholderTextColor="rgba(67, 67, 67, 0.7)"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#434343" />

            <TextInput
              placeholder=" Phone Number or Email"
              placeholderTextColor="rgba(67, 67, 67, 0.7)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#434343" />

            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(67, 67, 67, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#434343"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#434343" />

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="rgba(67, 67, 67, 0.7)"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={hidePassword}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Ionicons
                name={hidePassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#434343"
              />
            </TouchableOpacity>
          </View>

          {/* Signup Button */}
          <AnimatedPress onPress={handleSignup}>
            <View style={styles.button}>
              <Ionicons
                name="person-add-outline"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.buttonText}>Create Account</Text>
            </View>
          </AnimatedPress>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>OR</Text>

            <View style={styles.divider} />
          </View>

          {/* Social */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={22} color="#DB4437" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="telegram" size={22} color="#229ED9" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <MaterialCommunityIcons name="apple" size={24} color="#434343" />
            </TouchableOpacity>
          </View>

          {/* Login */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 24 }}
          >
            <Text style={styles.loginText}>
              Already have an account?{" "}
              <Text style={{ fontWeight: "700", color: "#2563eb" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 30,
  },

  // bgCircle1: {
  //   position: "absolute",
  //   width: 260,
  //   height: 260,
  //   borderRadius: 200,
  //   backgroundColor: "#01408f",
  //   top: -130,
  //   right: -60,
  // },

  // bgCircle2: {
  //   position: "absolute",
  //   width: 220,
  //   height: 220,
  //   borderRadius: 200,
  //   backgroundColor: "#9a1b1a",
  //   bottom: -40,
  //   left: -70,
  // },

  logoContainer: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: -50,
  },

  logo: {
    width: 95,
    height: 95,
    resizeMode: "contain",
    marginBottom: -10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#434343",
  },

  subtitle: {
    marginTop: 8,
    color: "rgba(67, 67, 67, 0.7)",
    fontSize: 14,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 58,

    borderRadius: 18,

    backgroundColor: "rgba(161, 161, 161, 0.15)",

    paddingHorizontal: 16,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: "rgba(161, 161, 161, 0.25)",
  },

  input: {
    flex: 1,
    color: "#434343",
    marginLeft: 10,
    fontSize: 14,
  },

  button: {
    width: 340,
    height: 58,
    borderRadius: 18,

    backgroundColor: "#01408f",

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginTop: 10,

    shadowColor: "#01408f",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,

    elevation: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(69, 232, 36, 0.15)",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "rgba(67, 67, 67, 0.7)",
    fontWeight: "600",
    fontSize: 13,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },

  socialButton: {
    width: 58,
    height: 58,
    borderRadius: 18,

    backgroundColor: "rgba(161, 161, 161, 0.15)",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "rgba(161, 161, 161, 0.25)",
  },

  loginText: {
    textAlign: "center",
    color: "#434343",
    fontSize: 13,
  },
  langButton: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
