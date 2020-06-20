/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    ScrollView,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    Alert


} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

export default class Home extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
               <SafeAreaView style={{flex:1, backgroundColor:"red"}}>
                <ScrollView style={{flex:1, backgroundColor:'white'}}>
                    <View style={styles.imageBack}>
                        <ImageBackground style={{width:width1}}>

                        </ImageBackground>
                    </View>
                </ScrollView>
               </SafeAreaView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    textview: {
        alignSelf: 'center',
        width: width1 - 40,
        borderWidth: 0.5,
        height: 50,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageBack:{
        width:width1,
        height:200
    }
});

