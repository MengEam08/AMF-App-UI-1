import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const contacts = [
  {
    name: "Head Office (Smart)",
    phone: "015776406",
    icon: "office-building",
    color: "#3B82F6",
  },
  {
    name: "Head Office (Smart)",
    phone: "010538658",
    icon: "office-building",
    color: "#8B5CF6",
  },
  
];

const socials = [
  {
    title: "Messenger",
    icon: "facebook-messenger",
    type: "FontAwesome5",
    color: "#0084FF",
  },
  {
    title: "Facebook",
    icon: "facebook",
    type: "FontAwesome5",
    color: "#1877F2",
  },
  // {
  //   title: "Instagram",
  //   icon: "instagram",
  //   type: "FontAwesome5",
  //   color: "#E4405F",
  // },
  {
    title: "Youtube",
    icon: "youtube",
    type: "FontAwesome5",
    color: "#FF0000",
  },
  {
    title: "Telegram",
    icon: "telegram-plane", // ✅ correct FA5 name
    type: "FontAwesome5",
    color: "#229ED9",
  },
  {
    title: "TikTok",
    icon: "tiktok", // ⚠️ NOT always available in FA5
    type: "FontAwesome5",
    fallbackIcon: "music-note", // fallback
    color: "#000",
  },
];

export default function ContactScreen({ navigation }: any) {
  const makeCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

 return (
  <SafeAreaView style={styles.container}>
    
    {/* STICKY HEADER */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#3e3e3e" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Contact Us</Text>

      <View style={{ width: 24 }} />
    </View>

    {/* SCROLL CONTENT */}
    <ScrollView showsVerticalScrollIndicator={false}>
      
      {/* HERO */}
      <View style={styles.hero}>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>
            Customer <Text style={{ color: "#222" }}>Service</Text>
          </Text>

          <Text style={styles.heroSubtitle}>We're here to help!</Text>

          <Text style={styles.heroDesc}>
            Chat or call our customer support team anytime.
          </Text>

          <View style={styles.supportBadge}>
            <Ionicons name="call" size={16} color="#fff" />
            <Text style={styles.supportText}>24/7 SUPPORT</Text>
          </View>
        </View>

        <Image
          source={require("../../assets/customer-service.png")}
          style={styles.heroImage}
        />
      </View>

      {/* CONTACTS */}
      <Text style={styles.sectionTitle}>Contact by Phone Number</Text>

      <View style={styles.grid}>
        {contacts.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => makeCall(item.phone)}
          >
            <View style={[styles.iconBox, { backgroundColor: item.color + "20" }]}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={22}
                color={item.color}
              />
            </View>

            <Text style={styles.cardTitle}>{item.name}</Text>

            <Text style={[styles.phone, { color: item.color }]}>
              {item.phone}
            </Text>

            <Ionicons
              name="call"
              size={18}
              color="#01408f"
              style={{ position: "absolute", top: 12, right: 12 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* SOCIAL */}
      <Text style={styles.sectionTitle}>Official Social Media</Text>

      <View style={styles.socialGrid}>
        {socials.map((item, index) => (
          <TouchableOpacity key={index} style={styles.socialCard}>
            <View style={styles.socialLeft}>
              <FontAwesome5
                name={item.icon as any}
                size={22}
                color={item.color}
              />
              <Text style={styles.socialText}>{item.title}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
 

container: {
  flex: 1,
  backgroundColor: "#f5f5f5",
    marginTop: 30, // IMPORTANT so content not hidden behind header
},

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    
  },

  hero: {
    // margin: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#F3F7FF",
    flexDirection: "row",
    alignItems: "center",
  },

  heroTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#01408f",
  },

  heroSubtitle: {
    marginTop: 8,
    fontWeight: "700",
    color: "#01408f",
  },

  heroDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    width: "80%",
  },

  supportBadge: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#9A1B1A",
  },

  supportText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 5,
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginHorizontal: 16,
    marginBottom: 15,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 2,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    marginTop: 15,
    fontWeight: "700",
    fontSize: 12,
  },

  phone: {
    marginTop: 5,
    fontWeight: "800",
  },

  socialCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
  },

  socialLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  socialText: {
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 13,
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  heroImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
