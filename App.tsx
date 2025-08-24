import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font"; 
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { User } from './src/services/AuthService';

import Login from "./src/pages/Login";
import Home from "./src/pages/home";
import Register from "./src/pages/register";

export type RootStackParamList = {
  Login: undefined; // A tela Login não recebe parâmetros
  Home: { user: User }; // A tela Home ESPERA receber um objeto 'user'
  Register: undefined; // A tela Register não recebe parâmetros
};

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Italic": require("./src/assets/fonts/Roboto-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
     
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Login" 
      screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
