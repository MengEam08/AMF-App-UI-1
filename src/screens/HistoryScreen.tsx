import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import PackageCard from "../components/PackageCard";

export default function HistoryScreen({ navigation }: any) {
  const packages = [ 
    {
      id: "1",
      tracking: "BN260508000004",
      barcode: "79000947639277",
      status: "Delivered",
      branch: "Chamkadong",
      weight: "1.00 kg",
      cost: "USD 1.50",
      icon: "checkmark",
    },
    {
      id: "2",
      tracking: "BN260508000005",
      barcode: "79000947639278",
      status: "Delivering",
      branch: "Chamkadong",
      weight: "1.00 kg",
      cost: "USD 1.50",
      icon: "car",
    },
    {
      id: "3",
      tracking: "BN260508000006",
      barcode: "79000947639279",
      status: "Arrived Branch",
      branch: "Chamkadong",
      weight: "1.00 kg",
      cost: "USD 1.50",
      icon: "business",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        stickyHeaderIndices={[0, 1]}
      >
        {/* HEADER */}
        <View style={styles.stickyHeader}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} color="#111827" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>History</Text>

            <View style={{ width: 26 }} />
          </View>
        </View>

        {/* STICKY ACCOUNT SUMMARY */}
        <View style={styles.stickySummaryWrapper}>
          <View style={styles.accountSummaryContainer}>
            {/* TOTAL EXPENDED CARD */}
            <View style={styles.expendedCard}>
              <View style={styles.expendedLeft}>
                <View style={styles.expendedIcon}>
                  <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
                </View>

                <View>
                  <Text style={styles.expendedLabel}>Total Expended</Text>

                  <Text style={styles.expendedValue}>$120.00</Text>
                </View>
              </View>

              <View style={styles.expendedRight}>
                <Text style={styles.expendedPercent}>+12%</Text>

                <Text style={styles.expendedSmall}>This month</Text>
              </View>
            </View>

            {/* MINI CARDS */}
            <View style={styles.overviewWrapper}>
              <View style={styles.grid2}>
                {[
                  {
                    image: require("../../assets/Packages.png"),
                    color: "#2563EB",
                    title: "Packages",
                    label: "All",
                    value: "24",
                  },
                  {
                    image: require("../../assets/Delivered_hist.png"),
                    color: "#16A34A",
                    title: "Delivered",
                    label: "Completed",
                    value: "18",
                  },
                  {
                    image: require("../../assets/Airplane_Hist.png"),
                    color: "#EA580C",
                    title: "Shipping",
                    label: "Active",
                    value: "6",
                  },
                ].map((item, index, arr) => (
                  <React.Fragment key={index}>
                    <View style={styles.overviewCard}>
                      <View
                        style={[
                          styles.overviewIconBox,
                          { backgroundColor: `${item.color}18` },
                        ]}
                      >
                        <View
                          style={{
                            position: "absolute",
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            backgroundColor: `${item.color}10`,
                            top: -10,
                            right: -10,
                          }}
                        />

                        <Image
                          source={item.image}
                          style={styles.overviewImage}
                          resizeMode="contain"
                        />
                      </View>

                      <View style={styles.cardContent}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.value}>{item.value}</Text>
                        <Text style={styles.label}>{item.label}</Text>
                      </View>
                    </View>

                    {index !== arr.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* PACKAGE LIST */}
        {packages.map((item) => (
          <PackageCard
            key={item.id}
            tracking={item.tracking}
            barcode={item.barcode}
            status={item.status}
            branch={item.branch}
            weight={item.weight}
            cost={item.cost}
            icon={item.icon as any}
            onPress={
              () => console.log(item.tracking)

              // navigation.navigate("PackageDetails", {
              //   package: item,
              // })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
  },

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginHorizontal: 16,
    marginTop: 14,

    backgroundColor: "#003C95",
    borderRadius: 22,

    paddingVertical: 22,
    paddingHorizontal: 12,

    shadowColor: "#003C95",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  summaryLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#DBEAFE",
    fontWeight: "600",
  },

  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",
  },

  /* ACCOUNT SUMMARY */

  iniValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    lineHeight: 18,
  },

  summaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  accountSummaryTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  summaryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  summaryButtonText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "800",
    color: "#2563EB",
  },

  /* MINI CARDS */

  accountSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  accountMiniCard: {
    width: "31%",

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    paddingVertical: 14,
    paddingHorizontal: 10,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#0F172A",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },

  miniIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  miniValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },

  miniLabel: {
    marginTop: 4,

    fontSize: 11,
    fontWeight: "700",

    color: "#64748B",
  },

  stickyHeader: {
    backgroundColor: "#F8FAFC",
    zIndex: 1000,
    paddingTop: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  stickySummaryWrapper: {
    backgroundColor: "#F8FAFC",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
    zIndex: 999,
  },

  accountSummaryContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },

  /* EXPENDED CARD (keep yours but improved spacing consistency) */

  /* OVERVIEW WRAPPER (mini cards container like Home) */
  overviewWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,

    borderWidth: 1,
    borderColor: "#EEF2F7",

    paddingVertical: 10,
  },

  grid2: {
    flexDirection: "row",
    alignItems: "center",
  },

  overviewCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },


  cardContent: {
    alignItems: "center",
  },

  title: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748B",
  },

  value: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 2,
  },

  label: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    marginTop: 2,
  },

  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "#E2E8F0",
  },

  expendedCard: {
    backgroundColor: "#0F4CDB",

    borderRadius: 24,

    paddingVertical: 20,
    paddingHorizontal: 18,

    marginBottom: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",

    shadowColor: "#0F4CDB",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,

    overflow: "hidden",
  },

  expendedLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  expendedIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,

    backgroundColor: "rgba(255,255,255,0.16)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  expendedLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(255,255,255,0.75)",
  },

  expendedValue: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  expendedRight: {
    alignItems: "flex-end",
  },

  expendedPercent: {
    fontSize: 16,
    fontWeight: "900",
    color: "#86EFAC",
  },

  expendedSmall: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "600",
    color: "#ffffff",
  },
  overviewIconBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",

    // soft shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },

  },

  overviewImage: {
    width: 50,
    height: 50,

  },
});
