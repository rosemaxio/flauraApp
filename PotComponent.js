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

const pots = [
  {
    token: "AMJHDNFMOI",
    sleepTime: 3,
    criticalMoisture: 4,
    waterAmmountML: 125
  },
  {
    token: "AMDPOUTZDN",
    sleepTime: 3,
    criticalMoisture: 4,
    waterAmmountML: 125
  },
  {
    token: "VUDTEMNFBZ",
    sleepTime: 3,
    criticalMoisture: 4,
    waterAmmountML: 125
  }
];

class PotComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
  }

  async deletePod(){
    //delete
    this.props.navigation.back();
  }


  render() {
    //this.props.route.params
    console.log(this.props.route.params.pot)
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View style={{backgroundColor: 'grey', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 6}}>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>{this.props.route.params.pot.token}</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 12, backgroundColor: 'lightgrey', borderRadius: 8}} onPress={() => this.deletePod()}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>token: {this.props.route.params.pot.token}</Text>
          <Text>sleepTime: {this.props.route.params.pot.sleepTime}</Text>
          <Text>criticalMoisture: {this.props.route.params.pot.criticalMoisture}</Text>
          <Text>waterAmmountML: {this.props.route.params.pot.waterAmmountML}</Text>
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

export default PotComponent;