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
    Alert,
    StatusBar


} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 22.22000,
                longitude: 75.202000,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
        };
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{ height: 50, width: 50, marginTop: 20, marginLeft: 20 }}>
                        <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, }} resizeMode="contain" />

                    </TouchableOpacity>
     
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
    imageBack: {
        width: width1,
        height: 200
    },
    gridButton: {
        flex: 1,
        alignSelf: 'center'
    },
    imageView: {
        flex: 0.5,
        alignSelf: 'center'
    },
    titleText: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 17,
        fontWeight: 'bold'
    }
});

