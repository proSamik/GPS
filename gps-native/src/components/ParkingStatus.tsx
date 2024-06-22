// src/components/ParkingStatus.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParkingStatus: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Parking Status Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default ParkingStatus;
