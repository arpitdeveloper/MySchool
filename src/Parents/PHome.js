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
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{ height: 50, width: 50, marginTop: 20, marginLeft: 20 }}>
                        <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, }} resizeMode="contain" />

                    </TouchableOpacity>

                    <View style={{flex:1, marginLeft:15, marginRight: 15, marginBottom:15}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                   // onPress={() => this.props.navigation.toggleDrawer()}
                                    style={{ flex:1 }}>
                                    <Image source={require('../img/timetable.png')} style={{ flex:0.5 }} resizeMode="contain" />
                                    <Text style={{alignSelf:'center', marginTop:5, fontSize:17, fontWeight:'bold'}}>Time Table</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('BusLocation')}
                                    style={{ flex: 1 }}>
                                    <Image source={require('../img/busLoc.png')} style={{ flex: 0.5 }} resizeMode="contain" />
                                    <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 17, fontWeight: 'bold' }}>Bus Location</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity
                                    // onPress={() => this.props.navigation.toggleDrawer()}
                                    style={{ flex: 1 }}>
                                    <Image source={require('../img/homework.png')} style={{ flex: 0.5 }} resizeMode="contain" />
                                    <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 17, fontWeight: 'bold' }}>HomeWork</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('ChatList')}
                                    style={{ flex: 1 }}>
                                    <Image source={require('../img/chat.png')} style={{ flex: 0.5 }} resizeMode="contain" />
                                    <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 17, fontWeight: 'bold' }}>Chat</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, }}>

                            </View>
                            <View style={{ flex: 1, }}>

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1,  }}>

                            </View>
                            <View style={{ flex: 1, }}>

                            </View>
                            <View style={{ flex: 1,  }}>

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, }}>

                            </View>
                            <View style={{ flex: 1,  }}>

                            </View>
                            <View style={{ flex: 1,  }}>

                            </View>
                        </View>
                    </View>
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
    }
});

