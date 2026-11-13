import React, { type PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import "./web.css";

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <View style={styles.shell}>
      <View style={styles.banner}>
        <Text style={styles.brand}>AMF EXPRESS</Text>
        <Text style={styles.description}>Portfolio demo · Sample data · No real shipments or accounts</Text>
      </View>
      <View style={styles.app}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: "#f5f5f5" },
  banner: { backgroundColor: "#001f4d", paddingHorizontal: 16, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 6, flexWrap: "wrap" },
  brand: { color: "#fff", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  description: { color: "#d5e3fa", fontSize: 11 },
  app: { flex: 1, minHeight: 0 },
});
