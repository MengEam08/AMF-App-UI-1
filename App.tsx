import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppShell from "./src/components/AppShell";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BottomTabs from "./src/navigation/BottomTabs";
import SplashScreen from "./src/screens/SplashScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import NewsScreen from "./src/screens/NewsScreen";
import ContactScreen from "./src/screens/ContactScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import EditScreen from "./src/screens/EditScreen";
import WarehouseScreen from "./src/screens/WarehouseScreen";
import MyAddressScreen from "./src/screens/MyAddressScreen";
import AddAddressScreen from "./src/screens/AddAddressScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import LevelPriceScreen from "./src/screens/LevelPriceScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppShell>
      <SafeAreaProvider>
      <NavigationContainer documentTitle={{ enabled: false }}>
        <Stack.Navigator
          id="root"
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {/* SPLASH */}
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
          />

          {/* MAIN TABS */}
          <Stack.Screen name="Main">
            {(props) => (
              <BottomTabs
                {...props}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>

          {/* AUTH */}
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Signup">
            {(props) => (
              <SignupScreen
                {...props}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />

          {/* OTHER SCREENS */}
          <Stack.Screen
            name="History"
            component={HistoryScreen}
          />

          <Stack.Screen
            name="News"
            component={NewsScreen}
          />

          <Stack.Screen
            name="Contact"
            component={ContactScreen}
          />

          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
          />

          <Stack.Screen
            name="EditScreen"
            component={EditScreen}
          />

          <Stack.Screen
            name="Warehouse"
            component={WarehouseScreen}
          />

          <Stack.Screen
            name="MyAddressScreen"
            component={MyAddressScreen}
          />

          <Stack.Screen
            name="AddAddressScreen"
            component={AddAddressScreen}
          />

          <Stack.Screen
            name="LevelPrice"
            component={LevelPriceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
    </AppShell>
  );
}
