/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, 
    StyleSheet,
    Text,
    SafeAreaView,
    ImageBackground,
    ScrollView,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    Alert


} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MyButton from '../Design/MyButton';
import firebase from "firebase";
try {
    firebase.initializeApp({
        apiKey: "AIzaSyA_D-SOP8ae168hCT3AxhkXQTac1gI5_7A",
        authDomain: "schoolapp-88d39.firebaseio.com/",
        databaseURL: "https://schoolapp-88d39.firebaseio.com/",
        storageBucket: "schoolapp-88d39.appspot.com",
        projectId: "schoolapp-88d39"
    })
} catch (err) {

    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
    }
}
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export default class App extends Component {
    //-------------Variable Define------------------
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    //---------------Button Method-------------------
    onLoginClick = () => {
   
        if ((this.state.email == '') || (this.state.password == '')) {
            Alert.alert("Alert", "Fill All the field");
        } else {
            this.login(this.state.email, this.state.password)
        }
    }
    async login(email, pass) {

        try {

            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then(result => {
                    // This is the success path
                    if (firebase.auth().currentUser){

                    
                    firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('users').child(firebase.auth().currentUser.uid).once('value').then(snapshot => {
                        var userData = snapshot.val();
                        console.log(userData)
                        console.log(userData['userType'])
                        if (userData['userType'] == 'admin') {
                           // Alert.alert("Alert", 'User is Admin');
                            this.props.navigation.navigate('AHome')
                            AsyncStorage.setItem('login', "Admin")
                        
                        } else if (userData['userType'] == 'parents') {
                            this.props.navigation.navigate('newHome')
                            AsyncStorage.setItem('login', "Parents")
                           
                        } else if (userData['userType'] == 'Teacher') {
                            this.props.navigation.navigate('Teach')
                            AsyncStorage.setItem('login', "Teacher")
                        }
                        else {
                            AsyncStorage.setItem('login', "user")
                            Alert.alert("Alert", 'User is not Avaliable');
                        }
                    })
                    }

                }).catch(error => {

                    Alert.alert("Alert", '' + error);
                });

        } catch (error) {
            console.log(error.toString())
        }
    }


    render() {
        return (
            <ImageBackground source={require('../img/back.jpg')} style={{flex:1}}>
                <View style={{ flex: 1, backgroundColor: 'rgba(89,83,245,0.8)' }}>
                    <SafeAreaView style={{flex:1}}>
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ flex: 1, height: height / 2, justifyContent:'center', alignItems:'center' }}>
                                <Image source={require('../img/logo.png')} style={{height: height / 4, width: width / 2}} resizeMode="contain"/>
                            </View>
                            <View style={{ flex: 1, height: height / 2 }}>
                                <View style={[styles.textview, {marginTop:20}]}>
                                    <View style={{ height: 40, width: 40, justifyContent:'center', alignItems:'flex-start', marginLeft:10}}>
                                        <Image source={require('../img/envelopes.png')} style={{ height: 30, width: 30, alignItems:'flex-start' }} resizeMode="contain"/>
                                    </View>
                                    
                                    <View style={{flex:1}}>
                                        <TextInput
                                            placeholder="Enter Email"
                                            placeholderTextColor="gray"
                                            onChangeText = {(email) => this.setState({email: email})}
                                            style={{ paddingLeft: 10, paddingRight: 10, fontSize: 17, color: 'white', flex: 1, flexGrow: 1 }}
                                        />
                                    </View>
                                    
                                </View>
                                <View style={[styles.textview, {marginTop:15}]}>
                                    <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10 }}>
                                        <Image source={require('../img/lock.png')} style={{ height: 30, width: 30, alignItems: 'flex-start' }} resizeMode="contain" />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TextInput
                                            placeholder="***************"
                                            placeholderTextColor="gray"
                                            secureTextEntry={true}
                                            onChangeText={(password) => this.setState({ password: password })}
                                            style={{ paddingLeft: 10, paddingRight: 10, fontSize: 17, color: 'white', flex: 1, flexGrow: 1 }}
                                        />
                                    </View>

                                </View>
                                <View style={{width:width/2, alignSelf:'center', marginTop:30}}>
                                    <MyButton
                                        text="LOGIN"
                                        onPress={this.onLoginClick}
                                />
                                </View>
                                <View style={{alignSelf:'center', marginTop:30}}>
                                    <Text style={{ color: 'white' }}>Not have a account? <Text>Sign Up</Text></Text>
                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    textview: {
        alignSelf:'center',
        width: width - 40,
        borderWidth:0.5,
        height:50,
        borderColor:'white',
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row'
    },
});

