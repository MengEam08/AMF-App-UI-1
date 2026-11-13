import React, { type PropsWithChildren } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useAppDimensions } from "../hooks/useAppDimensions";
import "./web.css";

// Must match the breakpoint in useAppDimensions.web.ts
const DESKTOP_BREAKPOINT = 600;

// Frame styled after the Samsung Galaxy S23 Ultra: boxy corners, thin bezels,
// centred punch-hole camera, volume rocker and power key on the right edge.
export default function AppShell({ children }: PropsWithChildren) {
  const { width, height } = useAppDimensions();
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth >= DESKTOP_BREAKPOINT;

  const screen = (
    <View
      testID="phone-preview"
      style={[styles.app, isDesktop && styles.screen, { width, height }]}
    >
      {children}
    </View>
  );

  if (!isDesktop) {
    return <View style={styles.shell}>{screen}</View>;
  }

  return (
    <View style={[styles.shell, styles.desktopShell]}>
      <View testID="device-frame" style={styles.device}>



        <View style={[styles.sideButton, styles.volumeRocker]} />
        <View style={[styles.sideButton, styles.powerButton]} />
        {screen}
        <View testID="device-camera" style={styles.camera} />
      </View>
    </View>
  );
}


const BEZEL = 6;
const SCREEN_RADIUS = 12;
const CAMERA_SIZE = 12;

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: "#ededed", alignItems: "center", justifyContent: "center" },
  desktopShell: { backgroundColor: "#e5e7eb" },
  app: { flexShrink: 0, minHeight: 0, overflow: "hidden", backgroundColor: "#f5f5f5" },

  screen: { borderRadius: SCREEN_RADIUS },
  device: {
    flexShrink: 0,
    padding: BEZEL,



    borderRadius: SCREEN_RADIUS + BEZEL,
    backgroundColor: "#0b0b0d",
    boxShadow: "0 0 0 2px #3f3f46, 0 24px 60px rgba(0, 0, 0, 0.35)",
  },
  sideButton: {
    position: "absolute",
    right: -5,
    width: 4,

    backgroundColor: "#3f3f46",
    borderRadius: 2,
  },




  volumeRocker: { top: 150, height: 96 },
  powerButton: { top: 270, height: 52 },
  camera: {
    position: "absolute",
    top: BEZEL + 10,
    left: "50%",
    marginLeft: -CAMERA_SIZE / 2,
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    borderRadius: CAMERA_SIZE / 2,
    backgroundColor: "#000",
    pointerEvents: "none",
  },
});
