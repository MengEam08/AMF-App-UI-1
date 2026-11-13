import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Image,
    Platform,
} from "react-native";
import MapView, { Marker } from "../components/MapView";
import * as Location from "expo-location";
import { useEffect } from "react";
import { StatusBar } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { showAlert } from "../utils/showAlert";

export default function AddAddressScreen({ navigation }: any) {
    const [selectedType, setSelectedType] = useState("Home");
    const [isDefault, setIsDefault] = useState(false);
    const [showMapSheet, setShowMapSheet] = useState(false);

    const [province, setProvince] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);
    const [commune, setCommune] = useState<string | null>(null);
    const [village, setVillage] = useState<string | null>(null);

    const [region, setRegion] = useState({
        latitude: 11.5564,
        longitude: 104.9282,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [marker, setMarker] = useState({
        latitude: 11.5564,
        longitude: 104.9282,
    });

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                showAlert("Location", "Location permission denied. You can still select a pin on the map.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            setMarker(coords);

            setRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } catch (error) {
            showAlert("Location unavailable", "Select your location on the map, or allow location access in your device settings.");
        }
    };

    useEffect(() => {
        if (Platform.OS !== "web") getCurrentLocation();
    }, []);

    const addressTypes = [
        {
            name: "Home",
            icon: "home-outline",
        },
        {
            name: "Office",
            icon: "business-outline",
        },
        {
            name: "Warehouse",
            icon: "cube-outline",
        },
        {
            name: "Other",
            icon: "layers-outline",
        },
    ];

    const DATA = {
        PhnomPenh: {
            Chamkarmon: {
                TonleBassac: ["Village 1", "Village 2"],
                BoeungKengKang: ["Village 3", "Village 4"],
            },
            RusseyKeo: {
                TuolSangkae: ["Village 5", "Village 6"],
            },
        },

        Kandal: {
            Takhmao: {
                TakhmaoCenter: ["Village 7", "Village 8"],
            },
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 140,
                }}
            >
                {/* HEADER */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={28} color="#2f2f2f" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Add New Address</Text>

                    <View style={{ width: 30 }} />
                </View>

                {/* ADDRESS TYPE */}
                {/* ADDRESS TYPE */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.numberText}>1</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Address Type</Text>
                    </View>

                    <View style={styles.typeGrid}>
                        {addressTypes.map((item) => (
                            <TouchableOpacity
                                key={item.name}
                                style={[
                                    styles.typeButton,
                                    selectedType === item.name && styles.activeType,
                                ]}
                                onPress={() => setSelectedType(item.name)}
                            >
                                <View style={styles.typeContent}>
                                    <View
                                        style={[
                                            styles.typeIconWrapper,
                                            selectedType === item.name &&
                                            styles.activeTypeIconWrapper,
                                        ]}
                                    >
                                        <Ionicons
                                            name={item.icon as any}
                                            size={18}
                                            color={
                                                selectedType === item.name
                                                    ? "#fff"
                                                    : "#01308f"
                                            }
                                        />
                                    </View>

                                    <Text
                                        style={[
                                            styles.typeText,
                                            selectedType === item.name && {
                                                color: "#01308f",
                                            },
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* CONTACT */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.numberText}>2</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Contact Information</Text>
                    </View>

                    <View style={styles.input}>
                        <Ionicons name="person-outline" size={20} color="#01308f" />

                        <TextInput placeholder="Full Name" style={styles.textInput} />
                    </View>

                    <View style={styles.input}>
                        <Ionicons name="call-outline" size={20} color="#01308f" />

                        <TextInput
                            placeholder="+855 Phone Number"
                            keyboardType="phone-pad"
                            style={styles.textInput}
                        />
                    </View>
                </View>

                {/* ADDRESS INFORMATION */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.numberText}>3</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Address Information</Text>
                    </View>

                    {/* ROW 1 */}
                    <View style={styles.row}>
                        {/* PROVINCE */}
                        <View style={styles.col}>
                            <View style={styles.field}>
                                <Ionicons name="map-outline" size={18} color="#01308f" />

                                <Picker
                                    selectedValue={province}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => {
                                        setProvince(itemValue);
                                        setDistrict(null);
                                        setCommune(null);
                                        setVillage(null);
                                    }}
                                >
                                    <Picker.Item label="Province" value={null} />

                                    {Object.keys(DATA).map((item) => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {/* DISTRICT */}
                        <View style={styles.col}>
                            <View style={styles.field}>
                                <Ionicons name="business-outline" size={18} color="#01308f" />

                                <Picker
                                    selectedValue={district}
                                    style={styles.picker}
                                    enabled={!!province}
                                    onValueChange={(itemValue) => {
                                        setDistrict(itemValue);
                                        setCommune(null);
                                        setVillage(null);
                                    }}
                                >
                                    <Picker.Item label="District" value={null} />

                                    {province &&
                                        Object.keys(DATA[province as keyof typeof DATA]).map(
                                            (item) => (
                                                <Picker.Item key={item} label={item} value={item} />
                                            ),
                                        )}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* ROW 2 */}
                    <View style={styles.row}>
                        {/* COMMUNE */}
                        <View style={styles.col}>
                            <View style={styles.field}>
                                <Ionicons name="people-outline" size={18} color="#01308f" />

                                <Picker
                                    selectedValue={commune}
                                    style={styles.picker}
                                    enabled={!!district}
                                    onValueChange={(itemValue) => {
                                        setCommune(itemValue);
                                        setVillage(null);
                                    }}
                                >
                                    <Picker.Item label="Commune" value={null} />

                                    {province &&
                                        district &&
                                        Object.keys(
                                            DATA[province as keyof typeof DATA][
                                            district as keyof (typeof DATA)[keyof typeof DATA]
                                            ],
                                        ).map((item) => (
                                            <Picker.Item key={item} label={item} value={item} />
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        {/* VILLAGE */}
                        {/* VILLAGE */}
                        <View style={styles.col}>
                            <View style={styles.field}>
                                <Ionicons name="home-outline" size={18} color="#01308f" />

                                <Picker
                                    selectedValue={village}
                                    style={styles.picker}
                                    enabled={!!commune}
                                    onValueChange={(itemValue) => {
                                        setVillage(itemValue);
                                    }}
                                >
                                    <Picker.Item label="Village" value={null} />

                                    {province &&
                                        district &&
                                        commune &&
                                        (
                                            DATA[province as keyof typeof DATA]?.[
                                            district as keyof (typeof DATA)[keyof typeof DATA]
                                            ]?.[
                                            commune as keyof (typeof DATA)[keyof typeof DATA][keyof (typeof DATA)[keyof typeof DATA]]
                                            ] as string[]
                                        )?.map((item) => (
                                            <Picker.Item key={item} label={item} value={item} />
                                        ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* FULL ADDRESS */}
                    <View style={styles.textAreaField}>
                        <Ionicons name="location-outline" size={18} color="#5577bd" />

                        <TextInput
                            placeholder="House No / Street..."
                            multiline
                            style={styles.textAreaInput}
                        />
                    </View>
                </View>

                {/* DELIVERY */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <View style={styles.numberCircle}>
                            <Text style={styles.numberText}>4</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Delivery Instructions</Text>
                    </View>

                    <View
                        style={[
                            styles.input,
                            {
                                height: 60,
                                alignItems: "flex-start",
                                paddingTop: 15,
                            },
                        ]}
                    >
                        <Ionicons name="document-text-outline" size={17} color="#82a6f0" />

                        <TextInput
                            multiline
                            placeholder="Leave at gate, call before delivery..."
                            style={styles.textArea}
                        />
                    </View>
                </View>


                {/* MAP SECTION */}
                <View style={styles.card}>
                    <View style={styles.mapHeader}>
                        <View style={styles.mapTitleRow}>
                            <Ionicons name="location-outline" size={18} color="#01308f" />

                            <Text style={styles.sectionTitle}>Pin Location on Map</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.gpsButton}
                            onPress={getCurrentLocation}
                        >
                            <Ionicons name="locate-outline" size={14} color="#01308f" />

                            <Text style={styles.gpsText}>GPS</Text>
                        </TouchableOpacity>
                    </View>

                    {/* PREVIEW MAP */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.mapContainer}
                        onPress={() => setShowMapSheet(true)}
                    >
                        <MapView
                            style={styles.fullMap}
                            initialRegion={region}   // ✅ change this
                        >
                            <Marker
                                coordinate={marker}
                                draggable
                                onDragEnd={(e) => {
                                    setMarker(e.nativeEvent.coordinate);
                                }}
                            />
                        </MapView>

                        <View style={styles.previewOverlay}>
                            <Ionicons name="expand-outline" size={20} color="#fff" />

                            <Text style={styles.previewText}>Tap to open full map</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* DEFAULT */}
                <View style={styles.defaultCard}>
                    <View style={styles.switchRow}>
                        <View>
                            <Text style={styles.defaultTitle}>Set as Default Address</Text>

                            <Text style={styles.defaultSub}>
                                Auto-select for future deliveries
                            </Text>
                        </View>

                        <Switch
                            value={isDefault}
                            onValueChange={setIsDefault}
                            trackColor={{
                                true: "#01308f",
                            }}
                        />
                    </View>
                </View>

            </ScrollView>

            {/* SAVE BUTTON */}
            <TouchableOpacity style={styles.button}>
                <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />

                <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
            {/* MAP BOTTOM SHEET */}
            {showMapSheet && (
                <View style={styles.sheetWrapper}>
                    {/* BACKDROP */}
                    <TouchableOpacity
                        style={styles.backdrop}
                        activeOpacity={1}
                        onPress={() => setShowMapSheet(false)}
                    />

                    {/* SHEET */}
                    <View style={styles.bottomSheet}>
                        <StatusBar barStyle="dark-content" />
                        {/* HANDLE */}
                        <View style={styles.handle} />

                        {/* HEADER */}
                        <View style={styles.sheetHeader}>
                            <Text style={styles.sheetTitle}>Select Location</Text>

                            <TouchableOpacity onPress={() => setShowMapSheet(false)}>
                                <Ionicons name="close" size={24} color="#1A237E" />
                            </TouchableOpacity>
                        </View>

                        {/* MAP */}
                        <MapView
                            style={styles.fullMap}
                            region={region}
                            onRegionChangeComplete={(newRegion) => {
                                setRegion(newRegion);
                            }}
                            onPress={(e) => {
                                const coordinate = e.nativeEvent.coordinate;

                                setMarker(coordinate);

                                setRegion({
                                    ...region,
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
                                });
                            }}
                        >
                            <Marker
                                coordinate={marker}
                                draggable
                                onDragEnd={(e) => {
                                    setMarker(e.nativeEvent.coordinate);
                                }}
                            />
                        </MapView>

                        {/* ACTIONS */}
                        <View style={styles.sheetActions}>
                            <TouchableOpacity
                                style={styles.locationButton}
                                onPress={getCurrentLocation}
                            >
                                <Ionicons
                                    name="locate-outline"
                                    size={18}
                                    color="#01308f"
                                />

                                <Text style={styles.locationButtonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={() => setShowMapSheet(false)}
                            >
                                <Text style={styles.confirmText}>
                                    Select Address
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 18,
        marginTop: 30,
    },

    topBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: "800",
        color: "#2f2f2f",
        marginLeft: 10,
    },

    card: {
        marginBottom: 15,
    },

    defaultCard: {
        marginBottom: 30,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    numberCircle: {
        width: 24,
        height: 24,
        borderRadius: 22,
        backgroundColor: "#01308f",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    numberText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1A237E",
    },





    input: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        paddingHorizontal: 15,
        marginBottom: 12,
        height: 56,
    },

    textInput: {
        flex: 1,
        marginLeft: 10,
    },

    textArea: {
        flex: 1,
        marginTop: -10,
    },

    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    defaultTitle: {
        fontWeight: "700",
        color: "#1A237E",
    },

    defaultSub: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 4,
    },

    button: {
        position: "absolute",
        bottom: 25,
        left: 18,
        right: 18,
        height: 58,
        borderRadius: 16,
        backgroundColor: "#01308f",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },

    row: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
    },

    col: {
        flex: 1,
    },

    field: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },

    fieldText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#111",
    },

    textAreaField: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        height: 60,
        paddingHorizontal: 12,
        paddingTop: 12,
        backgroundColor: "#fff",
    },

    textAreaInput: {
        flex: 1,
        marginLeft: 8,
        textAlignVertical: "top",
        fontSize: 14,
        color: "#111",
        height: 100,
        marginTop: -10,
    },

    picker: {
        flex: 1,
        marginLeft: 1,
        color: "#111",
    },

    /* MAP */

    mapHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    mapTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    gpsButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },

    gpsText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#01308f",
    },

    mapContainer: {
        height: 170,
        borderRadius: 18,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#E2E8F0",
    },

    mapImage: {
        width: "100%",
        height: "100%",
    },

    pinWrapper: {
        position: "absolute",
        top: "35%",
        left: "50%",
        marginLeft: -21,
        zIndex: 2,
    },

    mapButton: {
        position: "absolute",
        bottom: 14,
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.96)",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    mapButtonText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#01308f",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    previewOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },

    previewText: {
        color: "#fff",
        marginTop: 6,
        fontWeight: "700",
    },

    sheetWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
    },

    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    bottomSheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: "#fff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        overflow: "hidden",

        paddingTop: 12,
    },

    handle: {
        width: 70,
        height: 5,
        borderRadius: 20,
        backgroundColor: "#CBD5E1",
        alignSelf: "center",
        marginBottom: 15,
    },

    sheetHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    sheetTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1A237E",
    },

    fullMap: {
        width: "100%",
        height: 420, // adjust here
    },
    sheetActions: {
        flexDirection: "row",
        paddingHorizontal: 18,
        paddingTop: 14,
        paddingBottom: 24,
        gap: 14,
        backgroundColor: "#fff",
    },


    locationButton: {
        flex: 1,
        height: 56,
        borderRadius: 18,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E2E8F0",

        justifyContent: "center",
        alignItems: "center",

        flexDirection: "row",
        gap: 8,
    },

    locationButtonText: {
        color: "#475569",
        fontWeight: "700",
        fontSize: 15,
    },

    confirmButton: {
        flex: 1,
        height: 56,
        borderRadius: 18,

        backgroundColor: "#E61E3C",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#E61E3C",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,

        elevation: 6,
    },

    confirmText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 15,
    },
    addressTypeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E2E8F0",

        borderRadius: 16,
        padding: 14,
    },

    activeAddressTypeRow: {
        borderWidth: 2,
        borderColor: "#01308f",
        backgroundColor: "#EFF6FF",
    },

    addressTypeLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    addressIconWrapper: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: "#EFF6FF",

        justifyContent: "center",
        alignItems: "center",

        marginRight: 12,
    },

    activeAddressIconWrapper: {
        backgroundColor: "#01308f",
    },

    addressTypeTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },

    addressTypeSub: {
        marginTop: 3,
        fontSize: 12,
        color: "#64748B",
    },
    typeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 10,
    },

    typeButton: {
        width: "47%",
        height: 72,

        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",

        backgroundColor: "#fff",

        justifyContent: "center",
        paddingHorizontal: 14,
    },

    activeType: {
        borderWidth: 2,
        borderColor: "#01308f",
        backgroundColor: "#EFF6FF",
    },

    typeContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    typeIconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",

        justifyContent: "center",
        alignItems: "center",
    },

    activeTypeIconWrapper: {
        backgroundColor: "#01308f",
    },

    typeText: {
        fontWeight: "700",
        fontSize: 14,
        color: "#0F172A",
    },
});
