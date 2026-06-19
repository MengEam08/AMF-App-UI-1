import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PackageCard from "../components/PackageCard";

export default function TrackingScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState("All");

  const packages = [
    {
      id: "1",
      tracking: "BN260508000004",
      barcode: "79000947639277",
      status: "Delivering",
      branch: "Chamkadong",
      weight: "1.00 kg",
      cost: "USD 1.50",
      icon: "car-outline",
    },
    {
      id: "2",
      tracking: "BN260508000005",
      barcode: "79000947639278",
      status: "Arrived Branch",
      branch: "Chamkadong",
      weight: "2.00 kg",
      cost: "USD 3.50",
      icon: "business",
    },
    {
      id: "3",
      tracking: "BN260508000006",
      barcode: "79000947639279",
      status: "Completed",
      branch: "Chamkadong",
      weight: "3.00 kg",
      cost: "USD 5.00",
      icon: "checkmark-done",
    },
  ];

  const filteredPackages =
    activeTab === "All"
      ? packages
      : packages.filter((item) => item.status === activeTab);
  return (
    <SafeAreaView style={styles.container}>
      {/* FIXED TOP SECTION */}
      <View style={styles.topContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Shipment</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* STICKY TABS ONLY */}
        <View style={styles.stickyTabs}>
          <View style={styles.tabsWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsContainer}
            >
              {["All", "Arrived Branch", "Delivering", "Completed"].map(
                (tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={[styles.tab, activeTab === tab && styles.tabActive]}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab && styles.tabTextActive,
                      ]}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* SCROLLABLE PACKAGE LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {filteredPackages.map((item) => (
          <PackageCard
            key={item.id}
            tracking={item.tracking}
            barcode={item.barcode}
            status={item.status}
            branch={item.branch}
            weight={item.weight}
            cost={item.cost}
            icon={item.icon as any}
            onPress={() => console.log(item.tracking)}
          />
        ))}
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Nav icon="home" label="Home" />
        <Nav icon="cube" label="Packages" active />
        <Nav icon="map" label="Tracking" />
        <Nav icon="person" label="Profile" />
      </View>
    </SafeAreaView>
  );
}

/* NAV ITEM */
const Nav = ({ icon, label, active }: any) => (
  <View style={{ alignItems: "center" }}>
    <Ionicons name={icon} size={22} color={active ? "#2d3e8b" : "#888"} />
    <Text
      style={{
        fontSize: 10,
        fontWeight: "700",
        color: active ? "#2d3e8b" : "#888",
      }}
    >
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    backgroundColor: "#fff",
  },
  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  /* TABS */
  tabs: {
    paddingHorizontal: 16,
    marginTop: 10,
  },



  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
  },

  /* ================= PACKAGE CARD (UPDATED) ================= */

  /* TOP */

  tab: {
    backgroundColor: "#EEF4FF",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 100,
    marginRight: 8,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#DCE7FF",
  },

  tabActive: {
    borderWidth: 1,
    borderColor: "#2d3e8b",

    shadowColor: "#2d3e8b",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  tabText: {
    color: "#2d3e8b",
    fontWeight: "700",
    fontSize: 13,
  },

  tabTextActive: {
    color: "#2d3e8b",
  },

  topContainer: {
    backgroundColor: "#fff",
  },

  stickyTabs: {
    backgroundColor: "#fff",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tabsWrapper: {
    backgroundColor: "#031f9916",
    borderRadius: 20,
    marginVertical: 6,
    marginHorizontal: -5,
    paddingVertical: 10,
  },

  tabsContainer: {
    paddingHorizontal: 12,
  },
});
