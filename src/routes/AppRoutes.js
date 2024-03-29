import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Cadastro from "../screens/Cadastro";
import Home from "../screens/Home";
import NewPlant from "../screens/NewPlant";
import EditPlant from "../screens/EditPlant";
import Clima from "../screens/Clima"

const Stack = createNativeStackNavigator();
export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPlant"
          component={NewPlant}
          options={{ headerTintColor: "#3CB371" }}
        />
        <Stack.Screen
          name="EditPlant"
          component={EditPlant}
          options={{ headerTintColor: "#3CB371" }}
        />
        <Stack.Screen
          name="Clima"
          component={Clima}
          options={{ headerTintColor: "#3CB371" }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
