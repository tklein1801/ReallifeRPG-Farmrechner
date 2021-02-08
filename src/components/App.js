// App.js

import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  StyleSheet,
} from "react-native";

import Home from './Home';
import Rechner from './Rechner';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#ff6f00',
          inactiveTintColor: '#435a64',
          labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
           textAlign: 'center',
           alignContent: 'center'
          },
        }}
      >
        <Tab.Screen
          name="Startseite"
          component={Home}
        />

        <Tab.Screen
          name="Rechner"
          component={Rechner}
        />

        <Tab.Screen
          name="Einstellungen"
          component={Settings}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
  },
});

export default App;
