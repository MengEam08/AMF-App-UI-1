import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";

export default function LevelPriceScreen() {
    const navigation = useNavigation<any>();

    const pricing = [
        {
            title: "By Land",
            color: "#9A1B1A",
            borderColor: "#9A1B1A",
            iconImagePrice: require("../../assets/By-Land.png"),
            data: [
                {
                    label: "Weight",
                    value: "$1.5",
                    icon: require("../../assets/Bage-Tier.png"),
                },
                {
                    label: "Normal (CBM)",
                    value: "$190",
                    icon: require("../../assets/Box.png"),
                },
                {
                    label: "Sensitive (CBM)",
                    value: "$210",
                    icon: require("../../assets/Shield.png"),
                },
            ],
        },
        {
            title: "By Sea",
            color: "#01408f",
            borderColor: "#01408f",
            iconImagePrice: require("../../assets/BySea-Red.png"),
            data: [
                {
                    label: "Weight",
                    value: "$1.5",
                    icon: require("../../assets/Bage-Tier.png"), 
                },
                {
                    label: "Normal (CBM)",
                    value: "$190",
                    icon: require("../../assets/Box.png"),
                },
                {
                    label: "Sensitive (CBM)",
                    value: "$210",
                    icon: require("../../assets/Shield.png"),
                },
            ],
        },
        {
            title: "By Air",
            color: "#5a2ade",
            borderColor: "#5a2ade",
            iconImagePrice: require("../../assets/By-Air.png"),
            data: [
                {
                    label: "Weight",
                    value: "$8",
                    icon: require("../../assets/Bage-Tier.png"),
                },
                {
                    label: "Normal (CBM)",
                    value: "$8",
                    icon: require("../../assets/Box.png"),
                },
                {
                    label: "Sensitive (CBM)",
                    value: "$8",
                    icon: require("../../assets/Shield.png"),
                },
            ],
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerBtn}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="#434343" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Price Level</Text>

                <View style={{ width: 28 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero */}
                <View style={styles.hero}>
                    {/* floating icons background */}
                    <View style={styles.heroIconLeft}>
                        <MaterialCommunityIcons name="truck-fast" size={22} color="rgba(255,255,255,0.4)" />
                    </View>

                    <View style={styles.heroIconRight}>
                        <MaterialCommunityIcons name="airplane" size={22} color="rgba(255,255,255,0.4)" />
                    </View>

                    <View style={styles.heroIconBottom}>
                        <MaterialCommunityIcons name="ship-wheel" size={22} color="rgba(255,255,255,0.4)" />
                    </View>

                    {/* main badge */}
                    <View style={styles.heroBadge}>
                        <Ionicons name="sparkles" size={18} color="#fff" />

                        <Text style={styles.heroTitle}>STANDARD</Text>

                        <Ionicons name="sparkles" size={18} color="#fff" />
                    </View>

                </View>


                {/* Pricing Cards */}
                {pricing.map((section, index) => (
                    <View key={index} style={styles.priceContainer}>

                        {/* Top floating tab */}
                        <View
                            style={[
                                styles.typeBadge,
                                { backgroundColor: section.color }
                            ]}
                        >
                            <View style={styles.badgeIcon}>
                                <Image
                                    source={section.iconImagePrice}
                                    style={{ width: 45, height: 45, resizeMode: "contain" }}
                                />
                            </View>

                            <Text style={styles.badgeText}>
                                {section.title}
                            </Text>
                        </View>

                        {/* Main Card */}
                        <View
                            style={[
                                styles.card,
                                {
                                    borderWidth: 1.5,
                                    borderColor: section.borderColor + "33", // light transparent border
                                },
                            ]}
                        >
                            {section.data.map((item, i) => (
                                <View key={i}>
                                    <View style={[styles.row, styles.rowBorder]}>
                                        <View style={styles.leftRow}>

                                            <View
                                                style={[
                                                    styles.smallIcon,
                                                    {
                                                        backgroundColor:
                                                            i === 0
                                                                ? "#EEF4FF"
                                                                : i === 1
                                                                    ? "#FFECEF"
                                                                    : "#EAFBF0",
                                                    },
                                                ]}
                                            >
                                                <Image
                                                    source={item.icon}
                                                    style={{ width: 26, height: 26, resizeMode: "contain" }}
                                                />
                                            </View>

                                            <Text style={styles.label}>
                                                {item.label}
                                            </Text>
                                        </View>

                                        <Text
                                            style={[
                                                styles.price,
                                                {
                                                    color:
                                                        i === 0
                                                            ? "#2563eb"
                                                            : "#ef4444",
                                                },
                                            ]}
                                        >
                                            {item.value}
                                        </Text>
                                    </View>

                                    {/* {i !== section.data.length - 1 && (
                                        <View style={styles.divider} />
                                    )} */}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}


                <View style={{ height: 100 }} />
            </ScrollView>

        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7fb",
        marginTop: 30,
    },

    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    headerBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "800"
    },


    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },

    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,.25)",
        justifyContent: "center",
        alignItems: "center"
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12
    },




    cardWrapper: {
        marginHorizontal: 16,
        marginBottom: 35,
        position: "relative",
    },

    topTypeCard: {
        position: "absolute",
        top: -20,
        left: 20,
        right: 20,

        zIndex: 100,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        paddingVertical: 12,
        borderRadius: 12,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },

    cardBody: {
        padding: 16,
        borderWidth: 1,
    },

    cardTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 12,
    },
    priceContainer: {
        marginHorizontal: 16,
        marginBottom: 35,
        position: "relative",
    },

    typeBadge: {
        height: 60,
        width: 160,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,

        flexDirection: "row",
        alignItems: "center",

        paddingLeft: 70,
        marginTop: -10,

        position: "absolute",
        top: 0,
        left: 0,

        zIndex: 1, // behind card
    },

    badgeIcon: {
        position: "absolute",

        left: 10,
        top: 5,

        width: 45,
        height: 45,
        borderRadius: 25,

        backgroundColor: "#fff",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    badgeText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "700",

    },


    card: {
        backgroundColor: "#fff",

        borderRadius: 14,

        marginTop: 40, // pushes card downward
        paddingTop: 30,
        paddingHorizontal: 16,
        paddingBottom: 10,

        zIndex: 5, // above badge

        shadowColor: "#4f378a",
        shadowOpacity: 0.20,
        shadowRadius: 10,
        elevation: 5,
    },



    leftRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    smallIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        marginRight: 15,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1e1e1e",
    },

    price: {
        fontSize: 16,
        fontWeight: "900",
    },

    // divider: {
    //     height: 1,
    //     backgroundColor: "#ececec",
    //     marginLeft: 58,
    // },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#dfefff",
    },
    hero: {
        margin: 16,
        borderRadius: 18,
        paddingVertical: 28,
        paddingHorizontal: 20,
        backgroundColor: "#2772f4",

        alignItems: "center",
        justifyContent: "center",

        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },

    heroBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,

        backgroundColor: "rgba(255,255,255,0.15)",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },

    heroTitle: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "900",
        letterSpacing: 1,
    },

    heroText: {
        color: "#E8F1FF",
        textAlign: "center",
        marginTop: 12,
        fontSize: 13,
        fontWeight: "500",
    },

    /* floating background icons */
    heroIconLeft: {
        position: "absolute",
        top: 15,
        left: 15,
        opacity: 1,
    },

    heroIconRight: {
        position: "absolute",
        top: 20,
        right: 18,
        opacity: 1,
    },

    heroIconBottom: {
        position: "absolute",
        bottom: 10,
        right: 60,
        opacity: 1,
    },

});