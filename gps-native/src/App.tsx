// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './components/HomePage';
import MapComponent from './components/MapComponent';
import ParkingStatus from './components/ParkingStatus';
import { RootStackParamList } from './types'; // Import the ParamList

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Map" component={MapComponent} />
        <Tab.Screen name="Status" component={ParkingStatus} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
