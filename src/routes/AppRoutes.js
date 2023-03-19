import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
export default function AppRoutes() {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
}