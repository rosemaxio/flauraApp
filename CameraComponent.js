'use strict';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Base64 from './Base64';

import AsyncStorage from '@react-native-community/async-storage';

import jpeg from 'jpeg-js';

const loadingWidth = parseInt(Dimensions.get('window').width * 0.2);


class CameraComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      result: null,
      loading: false,
      loadingText: ""
    }
  }

  async goToPot(){
    const newPot = {
      ...this.props.route.params.pot,
      sleepTime: this.state.result.sleepTime,
      criticalMoisture: this.state.result.criticalMoisture,
      waterAmmountML: this.state.result.waterAmmountML,
    }
    try {
      const value = await AsyncStorage.getItem('flaura-accessToken');
      if(value !== null) {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: {accessToken: value} }, { name: 'Pot', params: {pot: newPot} }],
        });
      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
    
  }

  render() {
    if(this.state.loading){
      return (
        <View style={{flex: 1, backgroundColor: "white", justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={loadingWidth} color="#2d6d21" />
          <Text style={{marginTop: 20, fontSize: 20}}>{this.state.loadingText}</Text>
        </View>
      )
    }
    if(this.state.result){
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text>Plant found!</Text>
          <Text>{JSON.stringify(this.state.result)}</Text>
          <Text>name: {this.state.result.name}</Text>
          <Text>sleepTime: {this.state.result.sleepTime}</Text>
          <Text>criticalMoisture: {this.state.result.criticalMoisture}</Text>
          <Text>waterAmmountML: {this.state.result.waterAmmountML}</Text>
          <TouchableOpacity onPress={() => this.goToPot()} style={{backgroundColor: "lightgreen"}}>
            <Text>Save Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{backgroundColor: "lightgrey"}}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          horizontal={false}
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
          <Image style={{width: 60, resizeMode: "contain"}} source={require("./imgs/cam.jpg")} />
        </TouchableOpacity>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      
      const data = await this.camera.takePictureAsync(options);
      this.setState({loading: true, loadingText: "Processing image..."});
      //console.log(data);
      ImageResizer.createResizedImage(data.uri, 224, 224, "JPEG", 100, 90, RNFS.DocumentDirectoryPath, false, {mode: "stretch", onlyScaleDown: true})
        .then(async response => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
          const res = await RNFS.readFile(response.uri, "base64");
          
          fetch('http://134.122.86.251/search', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              base64: res
            })
          }).then((response) => response.json())
          .then((json) => {
            console.log('http://134.122.86.251/api/plants/' + encodeURI(json.result))
            fetch('http://134.122.86.251/api/plants/' + encodeURI(json.result), {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }).then((response) => response.json())
            .then(json => {
              this.setState({result: json[0], loadingText: "", loading: false})
            })
            
          }).catch(e => console.error(e));
          //var url = "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
          //const buffer = base64toBlob(res, "image/jpg");
          //resize
          //console.log("test")
          //const rawImageData = await jpeg.decode(buffer, {useTArray: true}); // return as Uint8Array
          //console.log(rawImageData);
        })
        .catch(err => {
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });
        
      
      
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
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

export default CameraComponent;