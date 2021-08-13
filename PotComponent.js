'use strict';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView, View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Base64 from './Base64';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';

const textWidth = parseInt(Dimensions.get('window').width * 0.8);
const logoWidth = parseInt(Dimensions.get('window').width * 0.8);
const loadingWidth = parseInt(Dimensions.get('window').width * 0.2);


class PotComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      pot: props.route.params.pot
    }
  }

  async deletePod(){
    //delete
    const response = await fetch('http://134.122.86.251/api/users/deletePot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            loginToken: this.props.route.params.accessToken,
            potToken: this.props.route.params.pot.token
          })
        }).catch(e => console.log(e));
    this.props.navigation.goBack();
  }

  async handleChangePotObject(){
    
    const response = await fetch('http://134.122.86.251/api/users/changePot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.state.pot,
        token: this.props.route.params.accessToken,
        potToken: this.props.route.params.pot.token,
        
      })
    }).catch(e => console.log(e));
  }


  render() {
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
        <View style={{margin: 10}}>
          <Text style={{marginBottom: 10, fontSize: 24, marginTop: 10}}>
            sleepTime: {this.state.pot.sleepTime}
          </Text>
          <Slider
            value={this.state.pot.sleepTime}
            minimumValue={1}
            maximumValue={200}
            step={1}
            onSlidingComplete={() => this.handleChangePotObject()}
            onValueChange={value => this.setState({ pot: {...this.state.pot, sleepTime: value} })}
            />

          <Text style={{marginBottom: 10, fontSize: 24, marginTop: 20}}>
          criticalMoisture: {this.state.pot.criticalMoisture}
          </Text>
          <Slider
            value={this.state.pot.criticalMoisture}
            minimumValue={0}
            maximumValue={100}
            step={1}
            onSlidingComplete={() => this.handleChangePotObject()}
            onValueChange={value => this.setState({ pot: {...this.state.pot, criticalMoisture: value} })}
            />

          <Text style={{marginBottom: 10, fontSize: 24, marginTop: 20}}>
          waterAmountML: {this.state.pot.waterAmountML}
          </Text>
          <Slider
            value={this.state.pot.waterAmountML}
            minimumValue={0}
            maximumValue={700}
            step={1}
            onSlidingComplete={() => this.handleChangePotObject()}
            onValueChange={value => this.setState({ pot: {...this.state.pot, waterAmountML: value} })}
            />
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