import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import List from "./List";
import Favorite from "./Favorite";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'List') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Favorite') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
      <Tab.Screen name="List" component={List} options={{ headerShown: false }} />
      <Tab.Screen name="Favorite" component={Favorite} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
