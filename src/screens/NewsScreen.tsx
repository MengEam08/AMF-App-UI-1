import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const notifications = [
  {
    title: "🛒 Even Easier Than Ever!",
    time: "2h ago",
    desc: "Taobao and 1688 are now available in the Chamkadong app.",
    icon: "bullhorn",
  },
  {
    title: "Shipping Costs Stay the Same 🔥",
    time: "1d ago",
    desc: "We continue to keep shipping costs low and do not increase them like others.",
    icon: "fire",
  },
  {
    title: "Important Notice 🔔",
    time: "3d ago",
    desc: "We are continuing to maintain very low shipping rates from China.",
    icon: "bell-ring",
  },
  {
    title: "Announcement! 🎉",
    time: "5d ago",
    desc: "New warehouse tracking features are live! Track items even faster.",
    icon: "bullhorn-outline",
  },
  {
    title: "Inventory Check 📦",
    time: "6d ago",
    desc: "Packaging supplies have been replenished. Order now!",
    icon: "package-variant",
  },
];

export default function NewsScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#001f4d"
          />
        </TouchableOpacity>

        <View style={styles.headerTitle}>
          <Text style={styles.title}>
            Promotion{" "}
          </Text>

          <Text style={styles.redTitle}>
            Notification
          </Text>
        </View>

        
      </View>

      {/* NEWS LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {notifications.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={styles.card}
          >
            {/* LEFT ICON */}
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={22}
                color="#ef4444"
              />
            </View>

            {/* CONTENT */}
            <View style={styles.textContainer}>
              <View style={styles.row}>
                <Text
                  numberOfLines={2}
                  style={styles.cardTitle}
                >
                  {item.title}
                </Text>

                <Text style={styles.time}>
                  {item.time}
                </Text>
              </View>

              <Text style={styles.desc}>
                {item.desc}
              </Text>
            </View>

            
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },

  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    flexDirection: "row",
  },

  title: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },

  redTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#ef4444",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: "#ef4444",

    position: "absolute",
    top: 7,
    right: 7,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    elevation: 2,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 999,

    backgroundColor: "#FEE2E2",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    marginBottom: 5,
  },

  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginRight: 10,
  },

  time: {
    fontSize: 11,
    color: "#9ca3af",
  },

  desc: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },

  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginLeft: 8,
  },
});