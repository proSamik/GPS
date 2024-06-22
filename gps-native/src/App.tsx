import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen'; // Import splash screen
import HomePage from './components/HomePage';
import MapComponent from './components/MapComponent';
import ParkingStatus from './components/ParkingStatus';
import BookingComponent from './components/BookingComponent';
import { RootStackParamList } from './types'; // Import the ParamList

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    // Hide splash screen when component is mounted
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Map" component={MapComponent} />
        <Tab.Screen name="Status" component={ParkingStatus} />
        <Tab.Screen name="Booking" component={BookingComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
