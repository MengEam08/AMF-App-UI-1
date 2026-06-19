import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TrackingResult from "../components/TrackingResult";
 
const trackingList = [
  {
    packageId: "BN260513000001",
    barcode: "549848948948484",
    status: "DELIVERING",
    volume: "0.1m³",
    cost: "$14.50",
    destination: "Olympic",

    timeline: [
      {
        title: "Completed delivery",
        subtitle: "Package out for delivery (invoice number)",
        location: "Cambodia Warehouse",
        date: "13/05/2026 2:50 PM",
        active: true,
        icon: "checkmark-circle-outline",
      },
      {
        title: "Delivery to Customer",
        subtitle: "Delivering to Customer",
        location: "Cambodia Warehouse",
        date: "13/05/2026 2:40 PM",
        icon: "car-outline",
      },
      {
        title: "Arrived Branch",
        subtitle: "Package arrived Branch",
        location: "Cambodia Warehouse",
        date: "13/05/2026 2:20 PM",
        icon: "business-outline",
      },
      {
        title: "Shipping to Cambodia Warehouse",
        subtitle: "Package delivering to Cambodia",
        location: "Cambodia Warehouse",
        date: "09/05/2026 2:20 PM",
        icon: "airplane-outline",
      },
      {
        title: "Package at AMF Warehouse (China)",
        subtitle: "Arrived at AMF China warehouse",
        location: "AMF China Warehouse",
        date: "09/05/2026 1:20 PM",
        icon: "cube-outline",
      },
    ],
  },

  {
    packageId: "BN260513000002",
    barcode: "83i3y4587354y488888",
    status: "CHINA_WAREHOUSE",

    volume: "",
    cost: "",
    destination: "",

    timeline: [
      {
        title: "Completed delivery",
        subtitle: "Package out for delivery (invoice number)",
        location: "Cambodia Warehouse",

        icon: "checkmark-circle-outline",
      },
      {
        title: "Delivery to Customer",
        subtitle: "Delivering to Customer",
        location: "Cambodia Warehouse",

        icon: "car-outline",
      },
      {
        title: "Arrived Branch",
        subtitle: "Package arrived Branch",
        location: "Cambodia Warehouse",

        icon: "business-outline",
      },
      {
        title: "Shipping to Cambodia Warehouse",
        subtitle: "Package delivering to Cambodia",
        location: "Cambodia Warehouse",
        date: "09/05/2026 2:20 PM",
        active: true,
        icon: "airplane-outline",
      },
      {
        title: "Package at AMF Warehouse (China)",
        subtitle: "Arrived at AMF China warehouse",
        location: "AMF China Warehouse",
        date: "09/05/2026 1:20 PM",
        icon: "cube-outline",
      },
    ],
  },
  {
    packageId: "BN260513000003",
    barcode: "888888888888888",
    status: "CHINA_WAREHOUSE",

    volume: "",
    cost: "",
    destination: "",

    timeline: [
      {
        title: "Completed delivery",
        subtitle: "Package out for delivery (invoice number)",
        location: "Cambodia Warehouse",

        icon: "checkmark-circle-outline",
      },
      {
        title: "Delivery to Customer",
        subtitle: "Delivering to Customer",
        location: "Cambodia Warehouse",
        active: true,
        icon: "car-outline",
      },
      {
        title: "Arrived Branch",
        subtitle: "Package arrived Branch",
        location: "Cambodia Warehouse",
        date: "12/05/2026 2:20 PM",
        icon: "business-outline",
      },
      {
        title: "Shipping to Cambodia Warehouse",
        subtitle: "Package delivering to Cambodia",
        location: "Cambodia Warehouse",
        date: "09/05/2026 2:20 PM",

        icon: "airplane-outline",
      },
      {
        title: "Package at AMF Warehouse (China)",
        subtitle: "Arrived at AMF China warehouse",
        location: "AMF China Warehouse",
        date: "09/05/2026 1:20 PM",
        icon: "cube-outline",
      },
    ],
  },
];

export default function TrackScreen() {
  const [focused, setFocused] = React.useState(false);

  const [trackingNumber, setTrackingNumber] = React.useState("");
  const cleanInput = trackingNumber.trim().toLowerCase();

  const foundTracking =
  trackingList.find((item) => item.barcode.toLowerCase() === cleanInput) ||
  trackingList.find((item) =>
    item.barcode.toLowerCase().includes(cleanInput),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
       
        stickyHeaderIndices={[0]}
      >
        <View style={styles.stickyContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Track Package</Text>

            <Text style={styles.subtitle}>
              Enter tracking number or scan QR code
            </Text>
          </View>

          {/* Search */}
         
            <View
              style={[styles.inputContainer, focused && styles.inputFocused]}
            >
              {/* QR Button */}
              <TouchableOpacity style={styles.qrButtonInline}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={22}
                  color="#0047AB"
                />
              </TouchableOpacity>

              {/* Search Icon */}
              <Ionicons
                name="search"
                size={20}
                color="#94A3B8"
                style={styles.inputIcon}
              />

              {/* Input */}
              <TextInput
               placeholder="Tracking Number"
                value={trackingNumber}
                onChangeText={setTrackingNumber}
                style={styles.input}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />  

              {/* Clear */}
              {trackingNumber.length > 0 && (
                <TouchableOpacity onPress={() => setTrackingNumber("")}>
                  <Ionicons name="close-circle" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        
        {/* Tracking Content */}
        <View style={styles.contentContainer}>
          {cleanInput.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="search-circle-outline"
                size={50}
                color="#94A3B8"
              />
              <Text style={styles.emptyText}>
                Enter tracking number to search
              </Text>
            </View>
          ) : foundTracking ? (
            <TrackingResult tracking={foundTracking} />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle-outline" size={50} color="#EF4444" />
              <Text style={styles.notFoundText}>Tracking not found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        {[
          ["home-outline", "HOME"],
          ["wallet-outline", "WALLET"],
          ["search", "TRACK"],
          ["person-outline", "PROFILE"],
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem}>
            <Ionicons
              name={item[0] as any}
              size={24}
              color={item[1] === "TRACK" ? "#0047AB" : "#94A3B8"}
            />

            <Text
              style={[
                styles.navText,
                item[1] === "TRACK" && {
                  color: "#0047AB",
                },
              ]}
            >
              {item[1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 5,
    color: "#64748B",
  },



  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 15,
    height: 58,
    marginBottom: 15,

    borderWidth: 1.5,
    borderColor: "#E2E8F0",

    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },

  inputFocused: {
    borderColor: "#0047AB",
    borderWidth: 2,
  },

  inputIcon: {
    marginRight: 10,
  },
 
  input: {
    flex: 1,
    fontSize: 16,
  },

  qrButtonInline: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#E8F1FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  contentContainer: {
    marginTop: 10,
    paddingBottom: 100,
    gap: 20,
  },

  bottomNav: {
    height: 70,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: "110%",
  },

  navItem: {
    alignItems: "center",
  },

  navText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  emptyText: {
    marginTop: 10,
    color: "#94A3B8",
    fontSize: 15,
  },

  notFoundText: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 15,
  },
  stickyContainer: {
    backgroundColor: "#F8FAFC",
    zIndex: 500,
    marginBottom: 20,
  },
});
