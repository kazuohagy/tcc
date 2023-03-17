import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';
import AppRoutes from './src/routes/AppRoutes'


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <AppRoutes/>
  );
}
