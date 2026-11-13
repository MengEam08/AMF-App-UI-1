import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  Animated,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import React, { useEffect, useRef } from "react";
import { useAppDimensions } from "../hooks/useAppDimensions";

import HomeScreen from "../screens/HomeScreen";
import PackagesScreen from "../screens/PackagesScreen";
import TrackingScreen from "../screens/TrackingScreen";
import WarehouseScreen from "../screens/WarehouseScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

// 🔥 Animated Tab Item (FULL RESPONSIVE)
function TabItem({ focused, iconName, label }: any) {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const { width, height } = useAppDimensions();

  const isSmallDevice = width < 350;
  const isTablet = width >= 768;

  const itemWidth = isTablet ? width / 7 : width / 5.4;

  const circleSize = isSmallDevice ? 36 : isTablet ? 52 : 42;

  const iconSize = isSmallDevice ? 18 : isTablet ? 24 : 20;

  const labelSize = isSmallDevice ? 9 : isTablet ? 12 : 10;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    Animated.spring(translateY, {
      toValue: focused ? -6 : 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={[
        styles.item,
        {
          width: itemWidth,

          transform: [{ scale }, { translateY }],

          // ✅ RESPONSIVE marginBottom (ALL DEVICES FIX)
          marginBottom:
            height < 650
              ? -4
              : height < 750
                ? -10
                : Platform.OS === "ios"
                  ? -8
                  : -10,
        },
      ]}
    >
      <View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
          },
          focused && styles.activeCircle,
        ]}
      >
        <Ionicons
          name={focused ? iconName.replace("-outline", "") : iconName}
          size={iconSize}
          color={focused ? "#fff" : "#8e8e8e"}
        />
      </View>

      <Text
        style={[
          styles.label,
          {
            fontSize: labelSize,
          },
          focused && styles.activeLabel,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

export default function BottomTabs({ isLoggedIn, setIsLoggedIn }: any) {
  const { width, height } = useAppDimensions();

  const isSmallDevice = width < 350;
  const isTablet = width >= 768;

  return (
    <Tab.Navigator
      id="tabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        // ✅ FULL RESPONSIVE TAB BAR
        tabBarStyle: {
          position: "absolute",
          left: 12,
          right: 12,

          height:
            height < 650
              ? 70
              : height < 800
                ? 76
                : 100,

          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,

          bottom: Platform.OS === "ios" ? 18 : 12,

          marginBottom: Platform.OS === "ios" ? -8 : -10,

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarIcon: ({ focused }) => {
          let iconName: any = "home-outline";

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;

            case "Shipment":
              iconName = "cube-outline";
              break;

            case "Tracking":
              iconName = "navigate-outline";
              break;

            case "Warehouse":
              iconName = "business-outline";
              break;

            case "Account":
              iconName = "person-outline";
              break;
          }

          return (
            <TabItem
              focused={focused}
              iconName={iconName}
              label={route.name}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen name="Shipment" component={PackagesScreen} />

      <Tab.Screen name="Tracking" component={TrackingScreen} />

      <Tab.Screen name="Warehouse" component={WarehouseScreen} />

      <Tab.Screen name="Account">
        {(props) => (
          <ProfileScreen
            {...props}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    justifyContent: "center",
    alignItems: "center",
  },

  activeCircle: {
    backgroundColor: "#034090",

    shadowColor: "#3071c6",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.35,
    shadowRadius: 6,

    elevation: 6,
  },

  label: {
    marginTop: 3,
    color: "#8e8e8e",
    fontWeight: "600",
  },

  activeLabel: {
    color: "#034090",
    fontWeight: "700",
  },
});
