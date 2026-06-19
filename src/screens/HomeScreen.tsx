import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  useWindowDimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import LanguageButton from "../components/LanguageButton";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [lang, setLang] = useState("EN");

  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);

  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768;

  const wp = (percent: number) => width * (percent / 100);
  const hp = (percent: number) => height * (percent / 100);

  const SLIDE_WIDTH = width - wp(8);

  const slides = [
    { image: require("../../assets/slide1.png") },
    { image: require("../../assets/slide2.png") },
    { image: require("../../assets/slide3.png") },
  ];

  const toggleLang = () => {
    setLang((prev) => (prev === "EN" ? "KH" : "EN"));
  };

  /* AUTO SLIDER */
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (indexRef.current + 1) % slides.length;

      indexRef.current = next;

      scrollRef.current?.scrollTo({
        x: next * SLIDE_WIDTH,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [SLIDE_WIDTH]);

  const styles = createStyles(width, height);

  function DeliveryItem({ image, title, onPress }: any) {
    return (
      <TouchableOpacity
        style={styles.deliveryCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image
          source={image}
          style={styles.deliveryImage}
          resizeMode="cover"
        />

        <View style={styles.deliveryContent}>
          <Text style={styles.deliveryTitle}>
            {title}
          </Text>

          <Ionicons
            name="chevron-forward-outline"
            size={width > 768 ? 22 : 18}
            color="#757575"
            style={styles.deliveryArrow}
          />
        </View>
      </TouchableOpacity>
    );
  }
  function ServiceItem({ image, title, desc, onPress }: any) {
    return (
      <TouchableOpacity
        style={styles.serviceGridCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={styles.serviceGridIcon}>
          <Image
            source={image}
            style={styles.serviceImage}
            resizeMode="cover"
          />

          <View style={styles.serviceOverlay} />

          <Text
            numberOfLines={1}
            style={styles.serviceGridText}
          >
            {title}
          </Text>

          <Text
            numberOfLines={3}
            style={styles.serviceGridDesc}
          >
            {desc}
          </Text>

          <TouchableOpacity
            style={styles.serviceBtn}
            onPress={onPress}
          >
            <Ionicons
              name="arrow-forward-circle"
              size={width > 768 ? 32 : 24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: hp(12) }}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.stickyHeader}>
          <View style={styles.header}>
            <View style={styles.locationBox}>
              <Ionicons
                name="location"
                size={isTablet ? 22 : 16}
                color="#001f4d"
              />

              <Text style={styles.locationText}>Chamkadong</Text>
            </View>

            <View style={styles.headerRight}>
              <LanguageButton lang={lang} onPress={toggleLang} />

              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons
                  name="notifications-outline"
                  size={isTablet ? 24 : 18}
                  color="#001f4d"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* HERO SLIDER */}
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            snapToInterval={SLIDE_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / SLIDE_WIDTH,
              );

              indexRef.current = newIndex;
            }}
          >
            {slides.map((item, i) => (
              <View
                key={i}
                style={[
                  styles.slide,
                  {
                    width: SLIDE_WIDTH,
                  },
                ]}
              >
                <View style={styles.slideInner}>
                  <Image source={item.image} style={styles.slideBgImage} />

                  <View style={styles.overlay} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* OVERVIEW */}
        <Section title="Overview" styles={styles}>
          <View style={styles.overviewWrapper}>
            <View style={styles.grid2}>
              {overviewData.map((item, i, arr) => (
                <React.Fragment key={i}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    activeOpacity={0.8}
                    onPress={() => {
                      console.log("Pressed Overview item:", item.title);
                      navigation.navigate("History");
                    }}
                  >
                    <Card
                      {...item}
                      styles={styles}
                      width={width}
                    />
                  </TouchableOpacity>

                  {i !== arr.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </Section>

        {/* SHIPPING */}
        <Section title="Shipping Address" styles={styles}>
          <View style={styles.deliveryRow}>
            <DeliveryItem
              image={require("../../assets/truck.jpg")}
              title="Land"
              onPress={() =>
                navigation.navigate("Warehouse", {
                  activeTab: "warehouse",
                  warehouseType: "land",
                })
              }
            />

            <DeliveryItem
              image={require("../../assets/ship.jpg")}
              title="Sea"
              onPress={() =>
                navigation.navigate("Warehouse", {
                  activeTab: "warehouse",
                  warehouseType: "sea",
                })
              }
            />

            <DeliveryItem
              image={require("../../assets/airplane.jpg")}
              title="Air"
              onPress={() =>
                navigation.navigate("Warehouse", {
                  activeTab: "warehouse",
                  warehouseType: "air",
                })
              }
            />
          </View>
        </Section>

        {/* SERVICES */}
        <Section title="Services" styles={styles}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: wp(4),
            }}
          >
            <ServiceItem
              image={require("../../assets/announcement.jpg")}
              title="News"
              desc={"Latest\nupdates & offers"}
              onPress={() => navigation.navigate("News")}
            />

            <ServiceItem
              image={require("../../assets/message.jpg")}
              title="Contact Us"
              desc={"We are here\nto help you"}
              onPress={() => navigation.navigate("Contact")}
            />

            <ServiceItem
              image={require("../../assets/warehouse.jpg")}
              title="Find Location"
              desc={"Find nearest\nbranches"}
              onPress={() => navigation.navigate("Warehouse")}
            />
          </ScrollView>
        </Section>
      </ScrollView>

      {/* BOTTOM NAV */}

    </SafeAreaView>
  );
}

/* SECTION */
function Section({ title, children, styles }: any) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {children}
    </View>
  );
}


/* CARD */
function Card({
  image,
  color,
  title,
  label,
  value,
  styles,
  width,
}: any) {
  const isTablet = width >= 768;

  return (
    <View
      style={styles.card}
    >
      {/* ICON */}
      <View
        style={[
          styles.cardIconBox,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        <Image
          source={image}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      {/* CONTENT */}
      <View style={styles.cardContent}>
        <Text
          numberOfLines={2}
          style={styles.title}
        >
          {title}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>

        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </View>
  );
}

/* NAV ICON */
function NavIcon({ icon, active = false, size }: any) {
  return (
    <Ionicons
      name={icon}
      size={size}
      color={active ? "#001f4d" : "#777"}
    />
  );
}

/* DATA */
const overviewData = [
  {
    image: require("../../assets/Packages.png"),
    title: "Shipments",
    label: "All",
    value: "0",
  },

  {
    image: require("../../assets/Truck_icon.png"),
    title: "Shipping",
    label: "Active",
    value: "0",
  },

  {
    image: require("../../assets/Delivered_hist.png"),
    title: "Delivered",
    label: "Done",
    value: "0",
  },

  {
    image: require("../../assets/Expense.png"),
    title: "Expenses",
    label: "All",
    value: "0",
  },
];

const shippingData = [
  {
    image: require("../../assets/truck.jpg"),
    title: "Land",
  },

  {
    image: require("../../assets/ship.jpg"),
    title: "Sea",
  },

  {
    image: require("../../assets/airplane.jpg"),
    title: "Air",
  },
];


/* RESPONSIVE STYLES */
const createStyles = (width: number, height: number) => {
  const isTablet = width >= 768;

  const wp = (percent: number) => width * (percent / 100);
  const hp = (percent: number) => height * (percent / 100);

  const fs = (mobile: number, tablet?: number) =>
    isTablet ? tablet || mobile * 1.4 : mobile;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },

    stickyHeader: {
      backgroundColor: "#fafafa",
      zIndex: 999,
    },

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      paddingHorizontal: wp(4),
      paddingTop: hp(5),
      paddingBottom: hp(1.5),
    },

    locationBox: {
      flexDirection: "row",
      alignItems: "center",

      backgroundColor: "#f1f5f9",

      paddingHorizontal: wp(3),
      paddingVertical: hp(1),

      borderRadius: wp(3.5),
    },

    locationText: {
      marginLeft: wp(1.5),

      fontSize: fs(13, 18),
      fontWeight: "700",

      color: "#001f4d",
    },

    headerRight: {
      flexDirection: "row",
      alignItems: "center",

      gap: wp(2.5),
    },

    iconBtn: {
      width: isTablet ? 52 : 38,
      height: isTablet ? 52 : 38,

      borderRadius: isTablet ? 16 : 12,

      backgroundColor: "#f1f5f9",

      justifyContent: "center",
      alignItems: "center",
    },

    sliderContainer: {
      marginHorizontal: wp(4),

      borderRadius: wp(4),
      overflow: "hidden",
    },

    slide: {
      height: isTablet ? hp(28) : hp(24),

      paddingRight: wp(2),
    },

    slideInner: {
      margin: 5,

      borderRadius: 18,
      overflow: "hidden",

      height: width > 768 ? 280 : 190,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },

      shadowOpacity: 0.08,
      shadowRadius: 10,

      elevation: 5,
    },

    slideBgImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.18)",
    },

    overlayDark: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.25)",
    },

    sectionTitle: {
      fontSize: fs(16, 24),
      fontWeight: "800",

      marginLeft: wp(4),
      marginBottom: hp(1.2),
    },

    overviewWrapper: {
      marginHorizontal: wp(4),

      backgroundColor: "#fff",

      borderRadius: wp(3.5),

      paddingVertical: hp(1),

      borderWidth: 1,
      borderColor: "#E5E7EB",
    },

    grid2: {
      flexDirection: "row",
      alignItems: "center",
    },





    cardTitle: {
      marginTop: hp(0.5),

      fontSize: fs(10, 14),

      color: "#666",

      textAlign: "center",
    },

    cardValue: {
      fontSize: fs(17, 26),
      fontWeight: "900",

      marginTop: hp(0.3),
    },

    cardLabel: {
      fontSize: fs(9, 13),

      color: "#999",

      textAlign: "center",
    },

    divider: {
      width: 1,
      height: "70%",
      backgroundColor: "#e5e7eb",
    },




    card: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",

      paddingVertical: width > 768 ? 16 : 10,
      paddingHorizontal: width > 768 ? 10 : 5,
    },
    cardIconBox: {
      width: width > 768 ? 90 : 70,
      height: width > 768 ? 90 : 70,

      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    cardImage: {
      width: width > 768 ? 60 : 60,
      height: width > 768 ? 60 : 60,
  //      width: 60,
  // height: 60,
    },
    cardContent: {
      marginTop: width > 768 ? 12 : 8,

      alignItems: "center",

      width: "100%",
    },

    title: {
      fontSize: width > 768 ? 13 : 9,

      color: "#6b7280",

      fontWeight: "600",

      textAlign: "center",

      lineHeight: width > 768 ? 18 : 12,

      minHeight: width > 768 ? 36 : 24,
    },

    value: {
      fontSize: width > 768 ? 24 : 16,

      fontWeight: "900",

      color: "#111827",

      marginTop: width > 768 ? 6 : 4,
    },

    label: {
      fontSize: width > 768 ? 11 : 9,

      color: "#9ca3af",

      fontWeight: "700",

      textAlign: "center",

      marginTop: 4,
    },
    cardBtn: {
      flexDirection: "row",
      alignItems: "center",

      gap: 4,

      marginTop: 8,

      backgroundColor: "#2563eb",

      paddingHorizontal: 10,
      paddingVertical: 5,

      borderRadius: 30,
    },
    cardBtnText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "700",
    },
    deliveryCard: {
      flex: 1,
      height: width > 768 ? 150 : 100,

      marginHorizontal: 4,
      

      borderRadius: 14,
      overflow: "hidden",

      borderWidth: 1,
      borderColor: "#E2E8F0",

      backgroundColor: "#fff",

      shadowColor: "#656565",
      shadowOpacity: 0.03,
      shadowRadius: 4,

      elevation: 1,
    },

    deliveryContent: {
      flex: 1,
      padding: width > 768 ? 14 : 10,
      justifyContent: "flex-end",
    },

    deliveryTitle: {
      marginTop: width > 768 ? 90 : 65,

      color: "#2b2b2b",

      fontSize: width > 768 ? 16 : 12,
      fontWeight: "800",
    },

    deliveryImage: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },

    deliveryArrow: {
      backgroundColor: "#fff",

      padding: 1,

      borderRadius: 20,

      position: "absolute",
      bottom: 4,
      right: 8,
    },

    deliveryRow: {
      flexDirection: "row",
      justifyContent: "space-between",

      marginHorizontal: wp(4),
    },

    serviceGridCard: {
      width: width > 768 ? 220 : 110,
      height: width > 768 ? 180 : 100,

      marginHorizontal: 4,

      borderRadius: 12,
      overflow: "hidden",

      borderWidth: 1,
      borderColor: "#E2E8F0",

      backgroundColor: "#fff",

      shadowColor: "#656565",
      shadowOpacity: 0.03,
      shadowRadius: 4,

      elevation: 1,
    },

    serviceGridIcon: {
      width: "100%",
      height: "100%",
      position: "relative",
    },

    serviceImage: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },

    serviceOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.25)",
    },

    serviceGridText: {
      position: "absolute",

      bottom: width > 768 ? 95 : 65,
      left: 12,
      right: 12,

      color: "#fff",

      fontSize: width > 768 ? 16 : 12,
      fontWeight: "700",
    },

    serviceGridDesc: {
      position: "absolute",

      bottom: width > 768 ? 35 : 25,
      left: 12,
      right: 12,

      color: "#fff",

      fontSize: width > 768 ? 12 : 10,
    },

    serviceBtn: {
      position: "absolute",

      right: 10,
      bottom: 8,

      justifyContent: "center",
      alignItems: "center",
    },
  });
};