import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import AnimatedPress from "../components/AnimatedPress";
import LanguageButton from "../components/LanguageButton";
import BackButton from "../components/BackButton";
import { showAlert } from "../utils/showAlert";

export default function LoginScreen({ navigation, setIsLoggedIn }: any) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [lang, setLang] = useState("EN");
  const [loading, setLoading] = useState(false);

  const toggleLang = () => setLang(lang === "EN" ? "KH" : "EN");

  const handleLogin = () => {
    if (!phone || !password) {
      showAlert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setIsLoggedIn(true);

      // RESET NAVIGATION
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });

      setLoading(false);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* TOP BAR */}
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
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* LOGO */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.logo}
            />

            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>Login to continue</Text>
            {Platform.OS === "web" && (
              <TouchableOpacity
                accessibilityRole="button"
                style={{ marginTop: 16, padding: 14, borderRadius: 10, backgroundColor: "#e8f0ff" }}
                onPress={() => {
                  setIsLoggedIn(true);
                  navigation.reset({ index: 0, routes: [{ name: "Main" }] });
                }}
              >
                <Text style={{ color: "#034090", fontWeight: "700" }}>Try demo account</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* FORM */}
          <View style={styles.form}>
            {/* PHONE */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#434343" />

              <TextInput
                placeholder="Phone Number or Email"
                placeholderTextColor="rgba(67,67,67,0.6)"
                value={phone}
                onChangeText={setPhone}
                keyboardType="default"
                style={styles.input}
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#434343" />

              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(67,67,67,0.6)"
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

            {/* FORGOT */}
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                marginBottom: 15,
              }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={{
                  color: "#2563eb",
                  fontWeight: "600",
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* LOGIN BUTTON */}
            {/* LOGIN BUTTON */}
            <AnimatedPress onPress={handleLogin}>
              <View style={[styles.button, loading && { opacity: 0.7 }]}>
                <View style={[styles.button, loading && { opacity: 0.7 }]}>
                  <Ionicons name="log-in-outline" size={20} color="#fff" />

                  <Text style={styles.buttonText}>
                    {loading ? "Loading..." : "Login"}
                  </Text>
                </View>
                 </View>
            </AnimatedPress>


            {/* DIVIDER */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />

              <Text style={styles.dividerText}>OR</Text>

              <View style={styles.divider} />
            </View>

            {/* SOCIAL */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={22} color="#DB4437" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="telegram" size={22} color="#229ED9" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton}>
                <MaterialCommunityIcons name="apple" size={24} color="#111" />
              </TouchableOpacity>
            </View>

            {/* SIGNUP */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              style={{ marginTop: 25 }}
            >
              <Text style={styles.bottomText}>
                Don’t have an account?{" "}
                <Text
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                  }}
                >
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },


  logoContainer: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: -50,
  },

  logo: {
    width: 95,
    height: 95,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#434343",
  },

  subtitle: {
    marginTop: 6,
    color: "rgba(67,67,67,0.7)",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(161,161,161,0.15)",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 58,
    borderWidth: 1,
    borderColor: "rgba(161,161,161,0.25)",
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#434343",
    fontSize: 15,
  },

  button: {
    flex: 1,
    backgroundColor: "#01408f",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    height: 55,
    borderRadius: 14,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
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
    backgroundColor: "rgba(161,161,161,0.15)",

    justifyContent: "center",
    alignItems: "center",
  },

  bottomText: {
    textAlign: "center",
    color: "#434343",
    fontSize: 14,
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingVertical: 30,
  },

  form: {
    width: "100%",
    alignSelf: "stretch",
  }
});
