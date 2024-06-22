import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import QRCode from 'react-native-qrcode-svg';

const BookingComponent: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState({
    userId: '',
    parkingSpaceId: '',
    date: new Date(),
    time: new Date()
  });
  const [message, setMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleChange = (name: string, value: string) => {
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        date: selectedDate
      }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setBookingDetails(prevDetails => ({
        ...prevDetails,
        time: selectedTime
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Submitting booking details:', bookingDetails);
    setQrData(JSON.stringify({
      ...bookingDetails,
      date: bookingDetails.date.toISOString().split('T')[0],
      time: bookingDetails.time.toISOString().split('T')[1].substring(0, 5)
    }));
  };

  return (
    <View style={styles.bookingContainer}>
      <Text style={styles.bookingTitle}>Book Parking Space</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={bookingDetails.userId}
          onChangeText={(value) => handleChange('userId', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Parking Space ID"
          value={bookingDetails.parkingSpaceId}
          onChangeText={(value) => handleChange('parkingSpaceId', value)}
        />
        <Text
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          {bookingDetails.date.toISOString().split('T')[0]}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={bookingDetails.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <Text
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          {bookingDetails.time.toISOString().split('T')[1].substring(0, 5)}
        </Text>
        {showTimePicker && (
          <DateTimePicker
            value={bookingDetails.time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <Button
          title="Book Now"
          onPress={handleSubmit}
        />
      </View>
      {message !== '' && <Text style={styles.message}>{message}</Text>}
      {qrData && (
        <View style={styles.qrContainer}>
          <QRCode value={qrData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bookingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  formContainer: {
    width: '100%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  message: {
    marginTop: 10,
    color: 'red'
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  }
});

export default BookingComponent;
