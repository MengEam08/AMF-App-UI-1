import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function EditScreen({ navigation }: any) {
  const [name, setName] = useState("MengSor");
  const [email, setEmail] = useState("mengsor@email.com");
  const [phone, setPhone] = useState("012345678");
  const [dob, setDob] = useState("12/05/2000");
  const handleDOBChange = (text: string) => {
    // Keep numbers only
    let cleaned = text.replace(/[^0-9]/g, "");

    // Limit to 8 digits (DDMMYYYY)
    cleaned = cleaned.slice(0, 8);

    // Add "/" automatically
    if (cleaned.length >= 5) {
      cleaned =
        cleaned.slice(0, 2) +
        "/" +
        cleaned.slice(2, 4) +
        "/" +
        cleaned.slice(4);
    } else if (cleaned.length >= 3) {
      cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    }

    setDob(cleaned);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* TOP BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#434343" />
            </TouchableOpacity>

            <Text style={styles.title}>Edit Profile</Text>

            <View style={{ width: 28 }} />
          </View>

          {/* PROFILE */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/avatar-loged.jpg")}
              style={styles.avatar}
            />

            <TouchableOpacity style={styles.changeBtn}>
              <Ionicons name="camera-outline" size={16} color="#fff" />

              <Text style={styles.changeText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* FORM */}
          <View style={styles.card}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Enter name"
            />

            <Text style={styles.label}>Email</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}  
              placeholder="Enter email"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Phone</Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              placeholder="Enter phone"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Date of Birth</Text>

            <TextInput
              value={dob}
              onChangeText={handleDOBChange}
              style={styles.input}
              placeholder="DD/MM/YYYY"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* SAVE */}
          <TouchableOpacity style={styles.saveBtn}>
            <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />

            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
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

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#434343",
  },

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 25,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  changeBtn: {
    marginTop: 15,
    backgroundColor: "#01408f",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },

  changeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  label: {
    marginBottom: 8,
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 15,
    backgroundColor: "#F8FAFC",
    fontSize: 15,
  },

  saveBtn: {
    marginTop: 30,
    backgroundColor: "#01408f",
    height: 58,
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 8,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
