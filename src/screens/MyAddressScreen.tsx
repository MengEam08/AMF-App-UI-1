import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function MyAddressScreen({ navigation }: any) {
  const addresses = [
    {
      id: 1,
      title: "Home",
      name: "Seng MengEam",
      phone: "012345678",
      address: "Street 271, Sangkat Boeng Tumpun, Khan Meanchey, Phnom Penh",
      default: true,
    },
    {
      id: 2,
      title: "Office",
      name: "Seng MengEam",
      phone: "098765432",
      address: "Russian Boulevard, Tuol Kork, Phnom Penh",
      default: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* TOP BAR */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#434343" />
          </TouchableOpacity>

          <Text style={styles.title}>My Address</Text>

          <View style={{ width: 28 }} />
        </View>

        {/* HEADER */}
       

        {/* ADDRESS LIST */}
        {addresses.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* top row */}
            <View style={styles.cardTop}>
              <View style={styles.labelBox}>
                <Ionicons
                  name={item.title === "Home" ? "home" : "business"}
                  size={16}
                  color="#01408f"
                />

                <Text style={styles.labelText}>{item.title}</Text>
              </View>

              {item.default && (
                <View style={styles.defaultTag}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>

            {/* info */}
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.phone}>{item.phone}</Text>

            <Text style={styles.address}>{item.address}</Text>

            {/* buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editBtn}>
                <Ionicons name="create-outline" size={18} color="#01408f" />

                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={18} color="#fff" />

                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ADD BUTTON */}
      <TouchableOpacity style={styles.addButton}
      onPress={() =>navigation.navigate("AddAddressScreen")}>
        <Ionicons name="add" size={22} color="#fff" />

        <Text style={styles.addText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    marginTop: 30,
  },

  topBar: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
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

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    marginTop: 14,
    fontSize: 28,
    fontWeight: "700",
    color: "#434343",
  },

  subtitle: {
    color: "rgba(67,67,67,0.7)",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,

    borderWidth: 1,
    borderColor: "rgba(161,161,161,0.15)",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  labelBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  labelText: {
    color: "#01408f",
    fontWeight: "700",
  },

  defaultTag: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  defaultText: {
    color: "#16A34A",
    fontSize: 12,
    fontWeight: "700",
  },

  name: {
    fontWeight: "700",
    fontSize: 16,
    color: "#434343",
  },

  phone: {
    color: "#64748B",
    marginTop: 5,
  },

  address: {
    marginTop: 8,
    color: "#666",
    lineHeight: 22,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  editBtn: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  editText: {
    color: "#01408f",
    fontWeight: "700",
  },

  deleteBtn: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#DC2626",

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },

  addButton: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 30,

    height: 58,
    borderRadius: 18,
    backgroundColor: "#01408f",

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 8,
  },

  addText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
