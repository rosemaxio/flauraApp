/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-community/async-storage';


import CameraComponent from './CameraComponent';
import LoginComponent from './LoginComponent';

import Scanner from './Scanner';
import WebComponent from './WebComponent';
import WelcomeComponent from './WelcomeComponent';
import RegisterComponent from './RegisterComponent';
import HomeComponent from './HomeComponent';
import PotComponent from './PotComponent';


const logoWidth = parseInt(Dimensions.get('window').width * 0.8);

const Stack = createNativeStackNavigator();

export default class App extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){

    

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Welcome" component={WelcomeComponent} />
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Register" component={RegisterComponent} />
          <Stack.Screen name="Home" component={HomeComponent} />
          <Stack.Screen name="Camera" component={CameraComponent} />
          <Stack.Screen name="Pot" component={PotComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    width: logoWidth,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: "lightgreen",
    borderRadius: 14
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});