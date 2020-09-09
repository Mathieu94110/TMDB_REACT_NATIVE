import React from "react";
import Search from "../Components/Search";
import Favorites from "../Components/Favorites";
import Test from "../screens/Test";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={Test} />
      <Tab.Screen name="Rechercher" component={Search} />
      <Tab.Screen name="Favoris" component={Favorites} />
    </Tab.Navigator>
  );
}
export default MyTabs;
