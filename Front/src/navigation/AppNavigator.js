import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import AddPointScreen from '../components/AddPointScreen';
import MapViewComponent from '../components/MapViewComponent';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Map" component={MapViewComponent} />
      <Stack.Screen name="AddPoint" component={AddPointScreen} />
    </Stack.Navigator>
  );
}
