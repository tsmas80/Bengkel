import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

function WelcomeScreen({navigation}) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('UserData').then((value) => {
      if (value != null) {
        setUsername(value.Username);
      }
    });
  }, []);

  const LogOut = () => {
    try {
      AsyncStorage.removeItem('UserData');

      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.titleColor}>{username}</Text>
      <Button title="Log Out" onPress={LogOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  titleColor: {
    marginTop: 10,
    fontFamily: 'Cochin',
    color: 'blue',
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default WelcomeScreen;
