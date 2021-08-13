'use strict';
import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import Base64 from './Base64';
import { WebView } from 'react-native-webview';

const loadingWidth = parseInt(Dimensions.get('window').width * 0.2);


class WebComponent extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          ref={webview => (this.webview = webview)}
          source={{ uri: 'http://134.122.86.251' }}
          cacheEnabled={false}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          onLoadEnd={() => this.webview.postMessage("RN message")}
          onMessage={(test) => console.log(test)}
          />
      </View>
    );
  }
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

export default WebComponent;