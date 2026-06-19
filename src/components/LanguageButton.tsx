import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  lang: string;
  onPress: () => void;
  style?: any; // 👈 ADD THIS
};

export default function LanguageButton({
  lang,
  onPress,
  style,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.langBtn, style]} // 👈 MERGE STYLE
      onPress={onPress}
    >
      <Ionicons name="globe-outline" size={18} color="#fff" />

      <Text style={styles.langText}>{lang}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  langBtn: {
    backgroundColor: "#0668df",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    
  },

  langText: {
    fontWeight: "700",
    color: "#fff",
  },
});