import React from "react";
import Search from "../Components/Search";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesDetails from "../screens/MoviesDetails";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabs from "./TabNavigator";
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MyTabs" component={MyTabs} />
        <Stack.Screen name="MoviesDetails" component={MoviesDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
