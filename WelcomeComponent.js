'use strict';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView, View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Base64 from './Base64';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-community/async-storage';

const textWidth = parseInt(Dimensions.get('window').width * 0.8);
const logoWidth = parseInt(Dimensions.get('window').width * 0.8);
const loadingWidth = parseInt(Dimensions.get('window').width * 0.2);



class WelcomeComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  async componentDidMount(){
    try {
      const value = await AsyncStorage.getItem('flaura-accessToken');
      if(value !== null) {
        // value previously stored
        console.log(value);
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: {accessToken: value} }],
        });
      } else this.setState({loading: false})
    } catch(e) {
      console.log(e)
      // error reading value
    }

  }

  render() {
    if(this.state.loading) return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={loadingWidth} color="#2d6d21" />
      </View>
    );
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View  style={{height: logoWidth/2, alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
          <Image style={{width: logoWidth, resizeMode: "contain", height: logoWidth/3}} source={require("./imgs/logo.jpg")} />
          <Text style={{fontSize: 16, color: 'grey', marginTop: 15}}>The smart plant pot.</Text>
        </View>
        <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={{fontSize: 20}}>Log-in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button, marginTop: 40}}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text style={{fontSize: 20}}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  button: {
    width: logoWidth,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: "lightgreen",
    borderRadius: 14
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    width: textWidth,
    marginBottom: parseInt(Dimensions.get('window').height * 0.1),
    backgroundColor: 'lightgrey'
    //justifyContent: 'flex-end',
    //alignItems: 'center',
  },
  capture: {
    height: 80,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default WelcomeComponent;