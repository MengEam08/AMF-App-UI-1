import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PackageCardProps = {
  tracking: string;
  barcode: string;
  status: string;
  branch: string;
  weight: string;
  cost: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}; 

export default function PackageCard({
  tracking,
  barcode,
  status,
  branch,
  weight,
  cost,
  icon = "cube",
  onPress,
}: PackageCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.packageCard}
      onPress={onPress}
    >
      {/* TOP */}
      <View style={styles.packageTopRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.packageTracking}>{tracking}</Text>

          <View style={styles.subTrackingRow}>
            <Ionicons name="barcode-outline" size={13} color="#94A3B8" />

            <Text style={styles.subTracking}>{barcode}</Text>
          </View>
        </View>

        <View style={styles.shippingBadge}>
          <Ionicons name={icon} size={12} color="#FFFFFF" />

          <Text style={styles.shippingBadgeText}>{status}</Text>
        </View>
      </View>

      {/* BRANCH */}
      <View style={styles.branchContainer}>
        <View style={styles.branchIconBox}>
          <Ionicons name="location-outline" size={14} color="#2563EB" />
        </View>

        <View>
          <Text style={styles.branchSmall}>Branch</Text>

          <Text style={styles.branchValue}>{branch}</Text>
        </View>
      </View>

      {/* TABLE */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Method</Text>

          <Text style={styles.tableHeaderText}>Weight</Text>

          <Text style={[styles.tableHeaderText, { textAlign: "right" }]}>
            Cost
          </Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableValue}>Weight</Text>

          <Text style={styles.tableValue}>{weight}</Text>

          <Text style={styles.tablePrice}>{cost}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  packageCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 18,

    borderWidth: 1,
    borderColor: "#e0e7ff",
    shadowRadius: 5,
  },

  packageTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  packageTracking: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },

  subTrackingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  subTracking: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
  },

  shippingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },

  shippingBadgeText: {
    marginLeft: 4,
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  branchContainer: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F8FAFC",

    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  branchIconBox: {
    width: 34,
    height: 34,
    borderRadius: 12,

    backgroundColor: "#EEF4FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  branchSmall: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },

  branchValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  tableContainer: {
    marginTop: 18,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  tableHeaderText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "800",
    color: "#64748B",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },

  tableValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  tablePrice: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "900",
    color: "#16A34A",
  },
});
