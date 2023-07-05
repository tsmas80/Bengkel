import React, {useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const [location, setLocation] = useState(false);
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        return true;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then((res) => {
      console.log('res is:', result);
      if (res) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
      }
    });
    console.log(location);
  };
  // semua yg ada dalam return akan display di emulator
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Welcome GPS!</Text>
        <View
          style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}
        >
          <Button title="Get Location" onPress={getLocation} />
        </View>
        <Text>Latitude: {location ? location.coords.latitude : null}</Text>
        <Text>Longitude: {location ? location.coords.longitude : null}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default App;
