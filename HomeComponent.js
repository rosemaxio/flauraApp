'use strict';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, FlatList, Text, TouchableOpacity, SafeAreaView, View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Base64 from './Base64';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-community/async-storage';

const textWidth = parseInt(Dimensions.get('window').width * 0.8);
const logoWidth = parseInt(Dimensions.get('window').width * 0.8);
const loadingWidth = parseInt(Dimensions.get('window').width * 0.2);


class HomeComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      loadingPot: false,
      pots: []
    }
  }

  async logout(){
    try {

      await AsyncStorage.removeItem('flaura-accessToken');
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome'}],
      });
      const response = await fetch('http://134.122.86.251/api/users/logoutRequest', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: this.props.route.params.accessToken
            })
          }).then((response) => response).catch(e => null);
      console.log(response);
    } catch (e) {
      // saving error
    }
  }

  async componentDidMount(){
    const pots = await this.loadPots();
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      // do something
      this.setState({oading: true});
      const newPots = await this.loadPots();
      this.setState({pots: newPots, loading: false});
    });
    this.setState({loading: false, pots: pots});
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async addNewPot(){
    this.setState({loadingPot: true});
    const response = await fetch('http://134.122.86.251/api/users/newPot', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: this.props.route.params.accessToken
            })
          }).catch(e => console.log(e));
    this.setState({loadingPot: false, loading: true});
    const newPots = await this.loadPots();
    this.setState({pots: newPots, loading: false});
    //return jsonObj.pots;
  }

  async loadPots(){
    const response = await fetch('http://134.122.86.251/api/users/getUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: this.props.route.params.accessToken
            })
          });
    const jsonObj = await response.json();
    return jsonObj.pots;
  }

  render() {
    //this.props.route.params
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View style={{backgroundColor: 'grey', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 6}}>
          <Text style={{fontWeight: 'bold', fontSize: 24}}>Pots</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 12, backgroundColor: 'lightgrey', borderRadius: 8}} onPress={() => this.logout()}>
              <Text>Log-out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={this.state.pots}
          onRefresh={() => this.componentDidMount()}
          refreshing={this.state.loading}
          renderItem={({item}) => (
              <TouchableOpacity onPress={() =>{ this.props.navigation.push('Pot', {pot: item, accessToken: this.props.route.params.accessToken}) }} style={{marginVertical: 12, overflow:'hidden', marginHorizontal: 20, flex: 1, backgroundColor: 'lightgrey', borderRadius: 10, alignItems: 'center', flexDirection: 'row'}}>
                <Text style={{fontSize: 24, flex: 1, marginHorizontal: 20, marginVertical: 10}}>{item.token}</Text>
                <TouchableOpacity onPress={() =>{
                  this.props.navigation.push('Camera', {pot: item, accessToken: this.props.route.params.accessToken})
                }}>
                  <Image style={{width: 60, height: 60, resizeMode: "contain"}} source={require("./imgs/cam_click.jpg")} />
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item) => item.token}
          ListFooterComponent={
            <TouchableOpacity key={"pot_" + this.state.pots.length} onPress={() => !this.state.loadingPot && !this.state.loading ? this.addNewPot() : {}} style={{marginVertical: 12, marginHorizontal: 20, flex: 1, alignItems: 'center', backgroundColor: 'lightgreen', padding: 20, borderRadius: 10}}>
              {
                this.state.loadingPot ? (
                  <ActivityIndicator size={51} color="white" />
                ) : (
                  <Text style={{fontSize: 38, fontWeight: 'bold', color: 'white'}}>+</Text>
                )
              }
              
            </TouchableOpacity>
          }
        />
        
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

export default HomeComponent;