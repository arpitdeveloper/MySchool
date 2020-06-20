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
const width = Dimensions.get('window').width

export default class App extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'green' }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1, height: height / 2, justifyContent: 'center', alignItems: 'center' }}>

                            </View>
                            <View style={{ flex: 1, height: height / 2 }}>


                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    textview: {
        alignSelf: 'center',
        width: width - 40,
        borderWidth: 0.5,
        height: 50,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
});

