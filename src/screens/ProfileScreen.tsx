import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ 
  navigation,
  isLoggedIn,
  setIsLoggedIn,
}: any) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const menu = [
    { icon: "help-circle-outline", title: "Help & Support" },
    { icon: "shield-checkmark-outline", title: "Privacy Policy" },
    { icon: "settings-outline", title: "Settings" },
    { icon: "information-circle-outline", title: "About App" },
  ];

  // ================= NOT LOGGED IN =================
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.center}>
            <Image
              source={require("../../assets/Person.png")}
              style={styles.avatar}
            />

            <Text style={styles.title}>Please Login Your Account</Text>

            <View style={styles.buttonRow}>
              <View style={styles.topLoginContainer}>
                <TouchableOpacity
                  style={styles.topLoginBtn}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Ionicons name="log-in-outline" size={18} color="#1D4ED8" />
                  <Text style={styles.topLoginText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.supportBox}>
            <Text style={styles.sectionTitle}>Legal & Policies</Text>

            <View style={styles.supportMainCard}>
              <View style={styles.smallCardFull}>
                <Image
                  source={require("../../assets/Help.png")}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <Text style={styles.smallCardText}>About Us</Text>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>

              <View style={styles.smallCardFull}>
                <Image
                  source={require("../../assets/Privacy.png")}
                  style={{ width: 30, height: 32, marginRight: 10 }}
                />
                <Text style={styles.smallCardText}>Privacy Policy</Text>
                <Ionicons name="chevron-forward" size={18} color="#9494b8" />
              </View>

              <View style={styles.smallCardFull}>
                <Image
                  source={require("../../assets/Terms.png")}
                  style={{ width: 30, height: 31, marginRight: 10 }}
                />
                <Text style={styles.smallCardText}>Terms of Service</Text>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>

              <View style={styles.smallCardFull}>
                <Image
                  source={require("../../assets/Refund.png")}
                  style={{ width: 30, height: 32, marginRight: 10 }}
                />
                <Text style={styles.smallCardText}>Refund Policy</Text>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ================= LOGGED IN =================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#333" />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "900", color: "#333" }}>
            Profile
          </Text>

          <TouchableOpacity style={styles.settingsIcon}>
            <Ionicons
              name="settings-outline"
              size={22}
              color="#004182"
              onPress={() => navigation.navigate("SettingsScreen")}
            />
          </TouchableOpacity>
        </View>

        {/* PROFILE HERO */}
        <View style={styles.profileHero}>
          <View style={styles.profileDecoration1} />
          <View style={styles.profileDecoration2} />

          <View style={styles.tierBadge}>
            <Ionicons name="shield-checkmark" size={12} color="#fff" />
            <Text style={styles.tierText}>STANDARD</Text>
          </View>

          <View style={styles.profileRow}>
            <View>
              <Image
                source={require("../../assets/avatar-loged.jpg")}
                style={styles.avatarLarge}
              />

              <View style={styles.verifyBadge}>
                <Ionicons name="camera-outline" size={12} color="#fff" />
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.profileName}>MengSor</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 6,
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  marginRight={5}
                  color="#64748B"
                />

                <Text style={styles.memberText}>Member since May 2026</Text>
              </View>
            </View>
          </View>
        </View>

        {/* BASIC INFORMATION */}
        <View style={styles.supportBox}>
          {/* <Text style={styles.sectionTitle}>Basic Information</Text> */}

          <View style={styles.supportMainCard}>
            {/* Branch */}
            <View style={styles.smallCardFull}>
              {/* <View style={[styles.blueIconBox, { width: 38, height: 38 }]}>
               
              </View> */}
              {/* <Ionicons name="business-outline" size={20} color="#2563EB" /> */}
              <Image
                source={require("../../assets/Building.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.smallCardText}>CHAMKADONG BRANCH</Text>
                <Text
                  style={{ fontSize: 11, color: "#94A3B8", marginLeft: 10 }}
                >
                  ID Branch 20309
                </Text>
              </View>

              <View style={styles.blueBadge}>
                <Text style={styles.blueBadgeText}>CKD20309</Text>
              </View>
            </View>

            {/* Customer ID */}
            <View style={styles.smallCardFull}>
              {/* <View
                style={[
                  styles.blueIconBox,
                  { width: 38, height: 38, backgroundColor: "#F3E8FF" },
                ]}
              >
                
              </View> */}
              <Image
                source={require("../../assets/Person.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />

              <Text style={styles.smallCardText}>Customer ID</Text>

              <View style={[styles.blueBadge, { backgroundColor: "#4F46E5" }]}>
                <Text style={styles.blueBadgeText}>000001</Text>
              </View>
            </View>
          </View>
        </View>
        {/* SUPPORT CARD */}
        <View style={styles.supportBox}>
          <Text style={styles.sectionTitle}>Support</Text>

          <View style={styles.supportMainCard}>
            <TouchableOpacity style={styles.smallCardFull}
              onPress={() => navigation.navigate("LevelPrice")}>
              <Image
                source={require("../../assets/Tier-Level.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Price Level</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>


            <TouchableOpacity style={styles.smallCardFull}
              onPress={() => navigation.navigate("MyAddressScreen")}>
              <Image
                source={require("../../assets/Location.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>My Address</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallCardFull}
              onPress={() =>
                navigation.navigate("Warehouse", {
                  activeTab: "branches",
                })
              }
            >
              <Image
                source={require("../../assets/Branch(Support).png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Branch</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallCardFull}
              onPress={() =>
                navigation.navigate("Warehouse", {
                  activeTab: "warehouse",
                  warehouseType: "all",
                })
              }
            >
              <Image
                source={require("../../assets/Warehouse.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Warehouse</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            {/* ✅ NEW HISTORY CARD */}
            <TouchableOpacity
              style={styles.smallCardFull}
              onPress={() => navigation.navigate("History")}
            >
              <Image
                source={require("../../assets/History.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>History</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallCardFull}
              onPress={() => navigation.navigate("Contact")}
            >
              <Image
                source={require("../../assets/support.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* LEGAL */}
        <View style={styles.supportBox}>
          <Text style={styles.sectionTitle}>Legal & Policies</Text>

          <View style={styles.supportMainCard}>
            <View style={styles.smallCardFull}>
              <Image
                source={require("../../assets/Help.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>About Us</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>

            <View style={styles.smallCardFull}>
              <Image
                source={require("../../assets/Privacy.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={18} color="#9494b8" />
            </View>

            <View style={styles.smallCardFull}>
              <Image
                source={require("../../assets/Terms.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>

            <View style={styles.smallCardFull}>
              <Image
                source={require("../../assets/Refund.png")}
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Text style={styles.smallCardText}>Refund Policy</Text>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setIsLoggedIn(false)}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 300,
    marginTop: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  loginBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#034090",
    paddingVertical: 15,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "800",
  },

  signupBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    borderWidth: 1.5,
    borderColor: "#001f4d",
    paddingVertical: 15,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  signupText: {
    color: "#001f4d",
    fontWeight: "800",
  },

  menuList: {
    marginTop: 30,
    paddingHorizontal: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,

    marginBottom: 10,

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 10,
  },

  settingsIcon: {
    backgroundColor: "#eef5ff",
    borderRadius: 30,
    marginBottom: 20,
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 1,
  },

  memberText: {
    fontSize: 12,
    color: "#777",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: "#222",
  },

  logoutBtn: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#DC143C",
    paddingVertical: 15,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "800",
  },

  // tierBadge: {
  //   position: "absolute",
  //   top: 12,
  //   right: 12,

  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 5,

  //   paddingHorizontal: 12,
  //   paddingVertical: 5,

  //   borderRadius: 20,

  //   backgroundColor: "#ffb100",

  //   shadowColor: "#ffb100",
  //   shadowOpacity: 0.4,
  //   shadowRadius: 6,
  //   shadowOffset: { width: 0, height: 3 },

  //   elevation: 4,
  // },

  // tierText: {
  //   color: "#1a1a1a",
  //   fontSize: 10,
  //   fontWeight: "900",
  //   letterSpacing: 1,
  // },
  avatarSmall: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  branchBox: {
    marginTop: 20,
    marginHorizontal: 16,
  },

  branchCardSingle: {
    backgroundColor: "#f5f7ff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderColor: "#dbe3ff",
    borderWidth: 1,
  },

  branchRowInline: {
    flexDirection: "row",
    alignItems: "center",
  },

  branchText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "900",
    color: "#001f4d",
    flex: 1,
  },

  codeBadge: {
    backgroundColor: "#001f4d",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  codeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "900",
  },
  branchTitleHeader: {
    fontSize: 15,
    fontWeight: "900",
    color: "#222",
    marginBottom: 8,
    marginLeft: 2,
  },
  branchDivider: {
    height: 1,
    backgroundColor: "#dbe3ff",
    marginVertical: 10,
  },
  supportBox: {
    marginTop: 18,
    marginHorizontal: 16,
  },

  supportMainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    borderColor: "#e0e7ff",
    borderWidth: 1,
    shadowColor: "#000",
  },

  smallCardFull: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#e0e7ff",
    paddingVertical: 14,
    paddingHorizontal: 14,

    borderRadius: 14,
    marginBottom: 10,
  },

  smallCardText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
  topLoginContainer: {
    position: "absolute",
    top: -200,
    right: -5,
    zIndex: 10,
  },

  topLoginBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,

    backgroundColor: "#EEF2FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  topLoginText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1D4ED8",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarLarge: {
    width: 85,
    height: 85,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  verifyBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,

    width: 22,
    height: 22,

    borderRadius: 11,
    backgroundColor: "#2563EB",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#fff",
  },

  profileName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },

  tierBadge: {
    position: "absolute",
    top: 14,
    right: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F59E0B",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,
  },

  tierText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 10,
    marginLeft: 4,
  },
  profileDecoration1: {
    position: "absolute",
    right: -40,
    bottom: -50,
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "rgba(147,197,253,0.2)",
  },

  profileDecoration2: {
    position: "absolute",
    right: 20,
    top: 10,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "rgba(196,181,253,0.2)",
  },

  profileHero: {
    marginHorizontal: 16,
    marginTop: 1,
    borderRadius: 14,
    padding: 10,
    overflow: "hidden",

    backgroundColor: "#EEF2FF",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 8,
  },

  basicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  blueIconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },

  infoSub: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 4,
  },

  blueBadge: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  blueBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "900",
  },
});
