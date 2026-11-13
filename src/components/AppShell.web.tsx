import React, { type PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDimensions } from "../hooks/useAppDimensions";
import "./web.css";

export default function AppShell({ children }: PropsWithChildren) {
  const { width, height } = useAppDimensions();
  return (
    <View style={styles.shell}>
      <View testID="phone-preview" style={[styles.app, { width, height }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: "#ededed", alignItems: "center", justifyContent: "center" },
  app: { flexShrink: 0, minHeight: 0, overflow: "hidden", backgroundColor: "#f5f5f5" },
});
