import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type Props = {
  packageId: string;
  barcode: string;
  status: string;
  volume: string;
  cost: string;
  destination: string;
};

export default function TrackingInfoCard({
  packageId,
  barcode,
  status,
  volume,
  cost,
  destination,
}: Props) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.packageId}>{packageId}</Text>

          <View style={styles.barcodeRow}>
            <Ionicons name="barcode-outline" size={14} color="#94A3B8" />

            <Text style={styles.trackingId}>{barcode}</Text>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <Ionicons name="car-outline" size={12} color="#FFF" />

          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          {/* Volume */}
          <View style={styles.item}>
            <View >
              <Image
                source={require("../../assets/Packages.png")}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.label}>Volume</Text>

              <Text style={styles.value}>{volume}</Text>
            </View>
          </View>

          {/* Cost */}
          <View style={styles.item}>
            <View >
              <Image
                source={require("../../assets/Expense.png")}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text style={styles.label}>Cost</Text>

              <Text style={styles.value}>{cost}</Text>
            </View>
          </View>
        </View>

        {/* Destination */}
        <View style={styles.destinationBox}>
          <View >
            <Image
              source={require("../../assets/Location.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text style={styles.label}>Destination</Text>

            <Text style={styles.value}>{destination}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <MaterialIcons name="home" size={18} color="#64748B" />

        <Text style={styles.footerText}>{destination}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
  },

  packageId: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },

  barcodeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  trackingId: {
    marginLeft: 6,
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "700",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    alignSelf: "flex-start",
  },

  statusText: {
    marginLeft: 4,
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
  },

  detailsContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "47%",
  },


  destinationBox: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },

  value: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  footer: {
    backgroundColor: "#F8FAFC",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  footerText: {
    marginLeft: 8,
    color: "#64748B",
    fontWeight: "700",
  },
  
  iconImage: {
    width: 18,
    height: 18,
    padding: 20,
    marginRight: 12,
  },

  smallIconImage: {
    width: 16,
    height: 16,
  },
});
