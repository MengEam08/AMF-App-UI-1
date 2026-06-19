import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}> 
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#434343" />
          </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/Person-1.png")}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />

          <Text style={styles.headerTitle}>MengSor</Text>
        </View>

        {/* ACCOUNT CARD */}
        <View style={styles.supportBox}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.supportMainCard}>
            <TouchableOpacity
              style={styles.smallCardFull}
              onPress={() => navigation.navigate("EditScreen")}
            >
              <Image
                source={require("../../assets/Person-1.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />

              <Text style={styles.smallCardText}>Edit Profile</Text>

              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.smallCardFull}>
              <Image
                source={require("../../assets/password.png")}
                style={{ width: 30, height: 35, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Change Password</Text>

              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.smallCardFull}>
             <Image
            source={require("../../assets/Notify.png")}
            style={{  width: 30, height: 35, marginRight: 10 }}
          />

              <Text style={styles.smallCardText}>Notifications</Text>

              <Switch value={notifications} onValueChange={setNotifications} />
            </View>

            <View style={styles.smallCardFull}>
             <Image
            source={require("../../assets/App-V.png")}
            style={{  width: 30, height: 35, marginRight: 10 }}
          />

              <Text style={styles.smallCardText}>App Version</Text>
 
              <Text style={styles.version}>v1.0.0</Text>
            </View>
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />

          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    backgroundColor: "#f5f5f5",
    marginTop: 50,
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

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#434343",
    marginTop: 10,
  },

  subtitle: {
    color: "rgba(67,67,67,0.7)",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,

    borderWidth: 1,
    borderColor: "rgba(161,161,161,0.2)",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
    color: "#434343",
  },

  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },

  logoutBtn: {
    marginTop: 30,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#b80707",

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 8,
  },

  logoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  supportBox: {
    marginTop: 10,
  },

  supportMainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 3,
  },

  smallCardFull: {
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderColor: "#e0e7ff",
    paddingVertical: 15,
    paddingHorizontal: 14,

    borderRadius: 14,
    marginBottom: 10,
  },

  smallCardText: {
    flex: 1,
    marginLeft: 12,

    fontSize: 14,
    fontWeight: "600",

    color: "#0F172A",
  },

  version: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",

    marginBottom: 10,
  },
});
