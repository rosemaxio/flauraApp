'use strict';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView, View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Base64 from './Base64';
import { WebView } from 'react-native-webview';

const textWidth = parseInt(Dimensions.get('window').width * 0.8);
const logoWidth = parseInt(Dimensions.get('window').width * 0.8);
const loadingWidth = parseInt(Dimensions.get('window').width * 0.2);


class RegisterComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: "",
      loading: false,
    }
  }

  async handleRegister(){
    this.setState({loading: true});
    const response = await fetch('http://134.122.86.251/api/users/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              passwordconfirm: this.state.password
            })
          })
          .catch(e => console.log(e));
    const test = await response.json();
    console.log(test)
    if(test){
      try {
        await AsyncStorage.setItem('flaura-accessToken', test.initialToken);
      } catch (e) {
        // saving error
      }
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: {accessToken: test.initialToken} }],
      });
    } else this.setState({loading: false, password: "", password2: ""});
    

    
    
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
      }
    } catch(e) {
      // error reading value
    }
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={loadingWidth} color="#2d6d21" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <ScrollView>
          <View  style={{ height: logoWidth/2, marginTop: logoWidth/4, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: logoWidth, resizeMode: "contain"}} source={require("./imgs/logo.jpg")} />
          </View>
          <View style={{alignItems: "center", justifyContent: 'center', marginTop: logoWidth/4}}>
            <TextInput
              style={styles.input}
              placeholder="E-Mail"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
            />
            <TextInput
              style={styles.input}
              placeholder="Repeat password"
              secureTextEntry
              onChangeText={(text) => this.setState({password2: text})}
              value={this.state.password2}
            />
            <TouchableOpacity onPress={() => this.state.email !== "" && this.state.password !== "" && this.state.password === this.state.password2 ? this.handleRegister() : {}} style={{paddingHorizontal: 30, paddingVertical: 14, backgroundColor: this.state.email !== "" && this.state.password !== "" && this.state.password === this.state.password2 ? "lightgreen" : "#e9fce9", borderRadius: 10}}>
              <Text style={{fontSize: 20}}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginBottom: parseInt(Dimensions.get('window').height * 0.05),
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

export default RegisterComponent;