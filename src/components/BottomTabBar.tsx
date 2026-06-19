import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export default function BottomTabBar({ state, navigation }: any) {
  type IconName = ComponentProps<typeof Ionicons>["name"];

const icons: IconName[] = ["home", "search", "add-circle", "person"];

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        const iconName =
          icons[index] || "ellipse";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}
          >
            <Ionicons
              name={iconName}
              size={26}
              color={isFocused ? "#001f4d" : "#999"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 65,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});