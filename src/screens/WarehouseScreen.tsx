import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Linking,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "../components/MapView";

export default function WarehouseScreen({ route }: any) {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = Math.min(width - 40, 480);

  const [activeTab, setActiveTab] = useState("branches");
  const [warehouseTab, setWarehouseTab] = useState("all");

  // Add this
  useEffect(() => {
    if (route?.params) {
      setActiveTab(route.params.activeTab || "branches");
      setWarehouseTab(route.params.warehouseType || "all");
    }
  }, [route?.params]);
  
  const mapRef = useRef<any>(null);

  const branches = [
    {
      id: 1,
      name: "Chamkadong",
      code: "20309",
      latitude: 11.5205,
      longitude: 104.875,
      phone: "015776406",
    },
    {
      id: 2,
      name: "Depo",
      code: "20310",
      latitude: 11.5732,
      longitude: 104.894,
      phone: "015776406",
    },
    {
      id: 3,
      name: "Chhuk Va 2",
      code: "20311",
      latitude: 11.622,
      longitude: 104.832,
      phone: "015776406",
    },
    {
      id: 4,
      name: "Takhmao",
      code: "20312",
      latitude: 11.4833,
      longitude: 104.95,
      phone: "015776406",
    },
  ];
  const warehouses = [
    {
      id: 1,
      name: "Foshan",
      subtitle: "Mainland Logistics Center",
      recipient: "000006-Foshan (By Land)",
      transport: "Land",
      type: "land",
      phone: "18320189508",
      address: "...",
    },
    {
      id: 2,
      name: "Shenzhen Supply Hub",
      subtitle: "Shenzhen, China",
      recipient: "000006-Shenzhen Hub",
      transport: "Land",
      type: "land",
      phone: "0123456789",
      address: "...",
    },
    {
      id: 3,
      name: "Singapore Air Hub",
      subtitle: "Air Logistics Center",
      recipient: "000007-SG Air Hub",
      transport: "Air",
      type: "air",
      phone: "12345678",
      address: "...",
    },
    {
      id: 4,
      name: "Port Klang Sea Hub",
      subtitle: "Sea Freight Center",
      recipient: "000008-SEA Hub",
      transport: "Sea",
      type: "sea",
      phone: "98765432",
      address: "...",
    },
  ];
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showList, setShowList] = useState(false);




  const filteredWarehouses = 
    warehouseTab === "all"
      ? warehouses
      : warehouses.filter((w) => w.type === warehouseTab);

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const selectBranch = (branch: any) => {
    setSelectedBranch(branch);
    setShowDropdown(false);
    setSearchText(branch.name);

    mapRef.current?.animateToRegion({
      latitude: branch.latitude,
      longitude: branch.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Warehouses</Text>
        <Text style={styles.subtitle}>Find our warehouse locations</Text>
      </View>


      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          {/* SEARCH BOX */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#94A3B8" />

            <TextInput
              placeholder="Search by Branch"
              style={styles.input}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />

            {/* CLEAR BUTTON */}
            {searchText.length > 0 && (
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => {
                  setSearchText("");
                  setShowDropdown(false);

                  // reset selected branch
                  setSelectedBranch(branches[0]);

                  mapRef.current?.animateToRegion({
                    latitude: branches[0].latitude,
                    longitude: branches[0].longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  });
                }}
              >
                <Ionicons name="close-circle" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* LIST BUTTON */}
          <TouchableOpacity
            style={styles.branchListBtn}
            onPress={() => {
              setShowDropdown(!showDropdown);
              setSearchText("");
            }}
          >
            <Ionicons name="list" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* DROPDOWN */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <ScrollView
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {(searchText.length > 0 ? filteredBranches : branches).map(
                (item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      selectBranch(item);
                      setSearchText(item.name);
                      setShowDropdown(false);
                    }}
                  >
                    <Ionicons name="location" size={16} color="#0e3a8a" />

                    <View>
                      <Text style={styles.dropdownText}>{item.name}</Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#94A3B8",
                        }}
                      >
                        {item.code}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ),
              )}

              {searchText.length > 0 && filteredBranches.length === 0 && (
                <Text style={styles.noResult}>No branch found</Text>
              )}
            </ScrollView>
          </View>
        )}
      </View>

      {/* TAB SWITCH */}
      <View style={styles.tabBox}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "branches" && styles.activeTab]}
          onPress={() => setActiveTab("branches")}
        >
          <Ionicons
            name="location"
            size={16}
            color={activeTab === "branches" ? "#fff" : "#64748B"}
          />

          <Text
            style={[
              styles.tabText,
              activeTab === "branches" && styles.activeTabText,
            ]}
          >
            Branches
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "warehouse" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("warehouse")}
        >
          <Ionicons
            name="business"
            size={16}
            color={activeTab === "warehouse" ? "#fff" : "#64748B"}
          />

          <Text
            style={[
              styles.tabText,
              activeTab === "warehouse" && styles.activeTabText,
            ]}
          >
            Warehouses
          </Text>
        </TouchableOpacity>
      </View>

      {/* MAP */}
      {activeTab === "branches" ? (
        <>
          {/* MAP */}
          <View style={styles.mapWrapper}>
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              initialRegion={{
                latitude: 11.5564,
                longitude: 104.9282,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
            >
              {(searchText ? filteredBranches : branches).map((branch) => (
                <Marker
                  key={branch.id}
                  title={branch.name}
                  coordinate={{
                    latitude: branch.latitude,
                    longitude: branch.longitude,
                  }}
                  onPress={() => selectBranch(branch)}
                >
                  <View
                    style={[
                      styles.pin,
                      selectedBranch.id === branch.id && {
                        backgroundColor: "#e31e24",
                      },
                    ]}
                  >
                    <Ionicons name="location" size={16} color="#fff" />
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>

          {/* SWIPE CARDS */}
          {/* SWIPE CARDS */}
          <View style={styles.cardContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + 16}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / (CARD_WIDTH + 16),
                );

                const currentList = searchText ? filteredBranches : branches;

                const branch = currentList[index];

                if (branch) {
                  setSelectedBranch(branch);

                  mapRef.current?.animateToRegion({
                    latitude: branch.latitude,
                    longitude: branch.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  });
                }
              }}
            >
              {(searchText ? filteredBranches : branches).map((branch) => (
                <View key={branch.id} style={[styles.card, { width: CARD_WIDTH }]}>
                  <View style={styles.cardTop}>
                    <View style={styles.iconBox}>
                      <Ionicons name="business" size={22} color="#0e3a8a" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{branch.name}</Text>

                      <Text style={styles.cardSub}>{branch.code}</Text>
                    </View>
                  </View>

                  <View style={styles.btnRow}>
                    {/* Navigate */}
                    <TouchableOpacity
                      style={styles.btnPrimary}
                      onPress={() =>
                        Linking.openURL(
                          `https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`,
                        )
                      }
                    >
                      <Ionicons name="navigate" size={16} color="#fff" />

                      <Text style={styles.btnText}>Navigate</Text>
                    </TouchableOpacity>

                    {/* Call */}
                    <TouchableOpacity
                      style={styles.btnAccent}
                      onPress={() => Linking.openURL(`tel:${branch.phone}`)}
                    >
                      <Ionicons name="call" size={16} color="#fff" />

                      <Text style={styles.btnText}>Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          {/* STICKY TABS */}
          <View style={styles.warehouseTabs}>
            {["all", "land", "air", "sea"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.warehouseTab,
                  warehouseTab === type && styles.warehouseTabActive,
                ]}
                onPress={() => setWarehouseTab(type)}
              >
                <Text
                  style={[
                    styles.warehouseTabText,
                    warehouseTab === type && styles.warehouseTabTextActive,
                  ]}
                >
                  {type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SCROLLABLE LIST */}
          <ScrollView
            style={styles.warehouseContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {filteredWarehouses.map((item) => (
              <View key={item.id} style={styles.warehouseCard}>
                <View style={styles.warehouseHeader}>
                  <View style={styles.warehouseIcon}>
                    <Ionicons name="business" size={22} color="#0e3a8a" />
                  </View>

                  <View>
                    <Text style={styles.warehouseTitle}>{item.name}</Text>

                    <Text style={styles.warehouseSub}>{item.subtitle}</Text>
                  </View>
                </View>

                <View style={styles.warehouseInfo}>
                  <Text>Recipient: {item.recipient}</Text>

                  <Text>Transport: {item.transport}</Text>

                  <Text>Phone: {item.phone}</Text>

                  <Text>
                    Address:
                    {"\n"}
                    {item.address}
                  </Text>
                </View>

                <TouchableOpacity style={styles.copyButton}>
                  <Ionicons name="copy" size={18} color="#0e3a8a" />

                  <Text>Copy Address</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* SWIPE CARDS */}
      <View style={styles.cardContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        ></ScrollView>
      </View>
      {showList && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Branches</Text>

              <TouchableOpacity onPress={() => setShowList(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {branches.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.modalItem}
                  onPress={() => {
                    selectBranch(item);
                    setShowList(false);
                  }}
                >
                  <Ionicons name="location" size={18} color="#0e3a8a" />

                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.modalName}>{item.name}</Text>
                    <Text style={styles.modalCode}>{item.code}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    padding: 16,
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 5,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    height: 45,
    borderRadius: 12,
    paddingHorizontal: 12,
     borderWidth: 1,
     borderColor: "#DCE7FF",

    shadowColor: "#2d3e8b",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,

  },

  input: {
    flex: 1,
  },

  clearBtn: {
    paddingLeft: 8,
  },
  tabBox: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
  },

  activeTab: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0e3a8a",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    gap: 6,
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    gap: 6,
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "700",
  },

  tabText: {
    color: "#64748B",
    fontWeight: "700",
  },

  mapWrapper: {
    flex: 1,
  },

  pin: {
    backgroundColor: "#0e3a8a",
    padding: 8,
    borderRadius: 20,
  },

  cardContainer: {
    position: "absolute",
    bottom: 90,
    left: 0,
    right: 0,
  },

  card: {
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    elevation: 8,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconBox: {
    width: 45,
    height: 45,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  cardSub: {
    color: "#94A3B8",
  },

  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  btnPrimary: {
    flex: 1,
    backgroundColor: "#0e3a8a",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  btnAccent: {
    flex: 1,
    backgroundColor: "#e31e24",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  dropdown: {
    position: "absolute",
    top: 55, // below search row
    left: 0,
    right: 0,

    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: 220,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    zIndex: 9999,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  dropdownText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },

  noResult: {
    padding: 15,
    textAlign: "center",
    color: "#94A3B8",
  },
  listBtn: {
    width: 45,
    height: 45,
    marginLeft: 10,
    backgroundColor: "#0e3a8a",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    maxHeight: "70%",
    padding: 16,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  modalName: {
    fontSize: 15,
    fontWeight: "700",
  },

  modalCode: {
    fontSize: 12,
    color: "#94A3B8",
  },
  searchContainer: {
    paddingHorizontal: 16,
    zIndex: 999,
  },

  branchListBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#0e3a8a",
    justifyContent: "center",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 6,
    borderRadius: 10,
  },
  warehouseContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  warehouseCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  warehouseHeader: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 15,
  },

  warehouseIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  warehouseTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  warehouseSub: {
    color: "#94A3B8",
  },

  warehouseInfo: {
    gap: 10,
  },

  copyButton: {
    marginTop: 15,
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  warehouseTabs: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
    zIndex: 100,
  },

  warehouseTab: {
    backgroundColor: "#EEF4FF",
    paddingHorizontal: 19,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DCE7FF",
  },

  warehouseTabActive: {
    borderWidth: 1,
    borderColor: "#2d3e8b",

    shadowColor: "#2d3e8b",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  warehouseTabText: {
    color: "#2d3e8b",
    fontWeight: "700",
    fontSize: 13,
  },

  warehouseTabTextActive: {
    color: "#2d3e8b",
  },
});
