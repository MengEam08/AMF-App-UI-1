import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TimelineItem = {
  title: string;
  subtitle: string;
  location: string;
  date: string;
  active?: boolean;
  icon: any;
};

type Props = {
  timelineData: TimelineItem[];
};

export default function TimelineComponent({ timelineData }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Journey Timeline</Text>

      {timelineData.map((item, index) => {
        return (
          <View key={index} style={styles.itemContainer}>
            {/* LINE */}
            {index !== timelineData.length - 1 && <View style={styles.line} />}

            {/* ICON */}
            <View style={[styles.circle, item.active && styles.activeCircle]}>
              {item.active ? (
                <View style={styles.activeDot} />
              ) : (
                <Ionicons name={item.icon} size={18} color="#9CA3AF" />
              )}
            </View>

            {/* CONTENT (CUSTOM FORMAT) */}
            <View style={styles.content}>
              {/* TITLE */}
              <Text style={styles.title}> {item.title}</Text>

              {/* SUBTITLE */}
              <Text style={styles.subtitle}> {item.subtitle}</Text>

              {/* LOCATION */}
              <Text style={styles.location}> {item.location}</Text>

              {/* DATE */}
              <Text style={styles.date}> {item.date}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#d7d9da",
    borderRadius: 10,
  },

  heading: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 25,
    color: "#1F2937",
  },

  itemContainer: {
    flexDirection: "row",
    marginBottom: 28,
    position: "relative",
  },

  line: {
    position: "absolute",
    left: 19,
    top: 40,
    width: 2,
    height: "120%",
    backgroundColor: "#E5E7EB",
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  activeCircle: {
    borderColor: "#0047AB",
    borderWidth: 2,
  },

  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0047AB",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 13,
    color: "#6B7280",
  },

  location: {
    marginTop: 6,
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },

  date: {
    marginTop: 5,
    fontSize: 12,
    color: "#9CA3AF",
  },
});
