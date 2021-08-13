/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {
   SafeAreaView,
   Image,
   Dimensions,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
 } from 'react-native';
 
 
 const logoWidth = parseInt(Dimensions.get('window').width * 0.8);
 
 const Scanner = () => {
 
   const [page, setPage] = useState(0);
   const onPress = () => setPage(prevCount => 1);
   
   return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
            Seite 2
        </Text>
        </View>
    </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   button: {
     paddingHorizontal: 48,
     paddingVertical: 18,
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
 
 export default Scanner;
 