import React from "react";
import Search from "../Components/Search";
import Favorites from "../Components/Favorites";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" initialRouteName="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}
export default MyTabs;
