import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";

type Props = {
    packageId: string;
    barcode: string;
};

export default function ChinaWarehouseCard({
    packageId,
    barcode,
}: Props) {
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>

                <View style={styles.card}>
                    <Ionicons
                        name="archive-outline"
                        size={120}
                        color="#ffffff"
                        style={styles.bgPackageIcon}
                    />

                    <View style={styles.topRow}>
                        <View>
                            <Text style={styles.trackingLabel}>
                                TRACKING NUMBER
                            </Text>

                            <Text style={styles.packageId}>
                                {barcode}
                            </Text>
                        </View>

                        <View style={styles.statusBadge}>
                            <Ionicons
                                name="car-outline"
                                size={14}
                                color="#fff"
                            />
                            <Text style={styles.statusText}>
                                In Transit
                            </Text>
                        </View>
                    </View>
                </View>


            </View>

            {/* Pending Card */}
            {/* <View style={styles.pendingCard}>
                <View style={styles.pendingIcon}>
                    <Ionicons
                        name="time-outline"
                        size={26}
                        color="#FB923C"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.pendingTitle}>
                        Details pending confirmation
                    </Text>

                    <Text style={styles.pendingDesc}>
                        Volume, cost and branch will appear
                        after arrival at Cambodia Warehouse
                    </Text>
                </View>
            </View> */}

            {/* Grid */}
            {/* Grid */}
            <View style={styles.grid}>

                {/* Volume */}
                <View style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.blueIconBg}>
                            <Image resizeMode="contain" source={require("../../assets/Packages.png")} style={{ width: 18, height: 18 }} />
                        </View>

                        <Text style={styles.infoLabel}>
                            Volume
                        </Text>
                    </View>

                    <Text style={styles.infoValue}>
                        — — —
                    </Text>


                </View>

                {/* Cost */}
                <View style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.greenIconBg}>
                            <Image resizeMode="contain" source={require("../../assets/bage.png")} style={{ width: 18, height: 18 }} />
                        </View>

                        <Text style={styles.infoLabel}>
                            Cost
                        </Text>
                    </View>

                    <Text style={styles.infoValue}>
                        — — —
                    </Text>

                </View>

                {/* Branch */}
                <View style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.purpleIconBg}>
                            <Image resizeMode="contain" source={require("../../assets/Building.png")} style={{ width: 18, height: 18 }} />
                        </View>

                        <Text style={styles.infoLabel}>
                            Branch
                        </Text>
                    </View>

                    <Text style={styles.infoValue}>
                        — — —
                    </Text>


                </View>

            </View>

            {/* Destination */}
            {/* <View style={styles.destinationCard}>

                <View style={{ flexDirection: "row" }}>

                    <View style={styles.destinationIcon}>
                        <MaterialIcons
                            name="map"
                            size={24}
                            color="#2563EB"
                        />
                    </View>

                    <View>
                        <Text style={styles.destinationLabel}>
                            Destination
                        </Text>

                        <Text style={styles.destinationTitle}>
                            Awaiting assignment
                        </Text>
                    </View>

                </View>

                <View style={styles.pendingBadge}>
                    <Text style={{ color: "#2563EB" }}>
                        Pending
                    </Text>
                </View>

            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        marginTop: -25,
        gap: 16
    },

    header: {
        backgroundColor: "#1E3A8A",
        padding: 10,
        borderRadius: 12,
    },




    packageId: {
        fontSize: 24,
        fontWeight: "900",
        color: "#fff",
        marginTop: 5
    },

    barcode: {
        fontSize: 12,
        color: "#93C5FD",
        marginTop: 6
    },





    warehouseCard: {
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center"
    },

    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },

    warehouseName: {
        color: "#fff",
        fontWeight: "800"
    },

    updated: {
        fontSize: 11,
        color: "#BFDBFE"
    },

    // pendingCard: {
    //     backgroundColor: "#FFF7ED",
    //     padding: 18,
    //     borderRadius: 12,
    //     flexDirection: "row",
    //     alignItems: "center"
    // },

    pendingIcon: {
        marginRight: 15
    },

    pendingTitle: {
        fontWeight: "800",
        fontSize: 17
    },

    pendingDesc: {
        color: "#64748B",
        marginTop: 5
    },



    destinationCard: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    destinationIcon: {
        marginRight: 10
    },

    destinationLabel: {
        fontSize: 11,
        color: "#94A3B8"
    },

    destinationTitle: {
        fontWeight: "800",
        fontSize: 16
    },

    pendingBadge: {
        backgroundColor: "#DBEAFE",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 30
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
    },

    infoCard: {
        width: "31%", // fit 3 cards in one row
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },


    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    blueIconBg: {
        width: 25,
        height: 25,
        borderRadius: 8,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
        marginTop: 2,
    },

    greenIconBg: {
        width: 25,
        height: 25,
        borderRadius: 8,
        backgroundColor: "#ECFDF5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        marginTop: 2,
    },

    purpleIconBg: {
        width: 25,
        height: 25,
        borderRadius: 8,
        backgroundColor: "#F3E8FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 6,
        marginTop: 2,

    },

    infoLabel: {
        flex: 1,
        fontSize: 10,
        fontWeight: "700",
        color: "#94A3B8",
        textTransform: "uppercase",
    },

    infoValue: {
        fontSize: 10,
        fontWeight: "900",
        color: "#374151",
        textAlign: "center",
        marginTop: -20,
        marginLeft: 5,
    },


    trackingLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 6,
        fontWeight: "600",
    },

    packageRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    packageIcon: {
        marginRight: 6,
    },



    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#2E7D32",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        marginTop: -10,
    },

    statusIcon: {
        marginRight: 4,
    },

    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 4,
        marginBottom: 2,
    },
    packageBigIcon: {
        marginTop: 12,
        alignSelf: "center",
        opacity: 0.9,

    },
    card: {
        borderRadius: 12,
        padding: 16,
        overflow: "hidden", // keeps icon inside card
        position: "relative",
    },

    bgPackageIcon: {
        position: "absolute",
        right: -10,
        bottom: -10,
        opacity: 0.20,
        transform: [{ rotate: "-30deg" }],
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
});