import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    TouchableHighlight,
    Image,
    Alert,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import firebase from "firebase";

const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

export default class AddChild extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            phoneNumber: '',
            ok: '',
            email: '',
            password: '',
            keyList: [],
            userDict: [],
            fullName: '',
            phoneNumber: '',
            ok: '',
            section: '',
            class0: '',
            year: '',
            parentsData: [],
            isEnable: false
        };
        this.onClickListener = this.onClickListener.bind(this);
    }

    componentDidMount() {


    }
    onClickListener = (viewId) => {

        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('users').once('value').then(snapshot => {

            this.changeData(snapshot.val())

        })
    }
    changeData(data) {

        this.setState({ userDict: data })
        this.setState({ keyList: Object.keys(data) })
        for (index in data) {

            if (this.state.userDict[index]['email'] === this.state.email) {
                console.log(this.state.userDict[index]['email'])
                this.setState({ uid: index })
                this.setState({ isEnable: true })
                //this.props.navigation.navigate('AddStudent', { uid: index });
                //Actions.AddChild({ uid: index })
            } else {
                console.log('not find user')
            }
        }
    }
    onSubmitClick = (viewId) => {

        console.log('if not')

        let ref = "/Parents/" + this.state.uid + '/child';
        let msgId = firebase.database().ref(ref).push().key
        firebase.database().ref(ref).child(msgId).set({
            fullName: this.state.fullName,
            class: this.state.class0,
            section: this.state.section,
            parentsID: this.state.uid,
            educationalYear: this.state.year,
            timeAdded: firebase.database.ServerValue.TIMESTAMP,
            studentKey: msgId,
        })

        let ref2 = "/Students/" + this.state.year + "/Class " + this.state.class0 + "/Section " + this.state.section;
        //let msgId = firebase.database().ref(ref).push().key
        firebase.database().ref(ref2).child(msgId).set({
            fullName: this.state.fullName,
            class: this.state.class0,
            section: this.state.section,
            parentsID: this.props.uid,
            educationalYear: this.state.year,
            timeAdded: firebase.database.ServerValue.TIMESTAMP,
            studentKey: msgId,
            homeWork: "ok"
        })
        Actions.AdminPage()
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{ height: 50, width: 50, marginLeft: 20 }}>
                        <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, tintColor: 'white', marginTop: 10 }} resizeMode="contain" />

                    </TouchableOpacity>
                    <View style={styles.searchView}>
                        <TextInput
                            style={styles.searchText}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder="Search Parents By Email"
                        />
                        <TouchableOpacity
                            onPress={() => this.onClickListener('login')}
                            style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('../img/search.png')} style={{ height: 25, width: 25, flex: 1, }} resizeMode="contain" />

                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Full Name"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            editable={this.state.isEnable}
                            onChangeText={(fullName) => this.setState({ fullName })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Educational Year"
                            secureTextEntry={false}
                            underlineColorAndroid='transparent'
                            editable={this.state.isEnable}

                            onChangeText={(year) => this.setState({ year })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Class"
                            secureTextEntry={false}
                            underlineColorAndroid='transparent'
                            editable={this.state.isEnable}
                            onChangeText={(class0) => this.setState({ class0 })} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Section"
                            secureTextEntry={false}
                            underlineColorAndroid='transparent'
                            editable={this.state.isEnable}
                            onChangeText={(section) => this.setState({ section })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Ok"
                            secureTextEntry={false}
                            underlineColorAndroid='transparent'
                            editable={this.state.isEnable}
                            onChangeText={(password) => this.setState({ password })} />
                    </View>
                    <TouchableHighlight

                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.onSubmitClick('login')}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>


                </View>
                {/* <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Enter Parents Email ID"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(fullName) => this.setState({ fullName })} />
                </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
                    <Text style={styles.loginText}>Search</Text>
                </TouchableHighlight>


            </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    headerView: {
        height: 50,
        width: width1,
        backgroundColor: "blue",
        flexDirection: 'row'
    },
    searchView: {
        backgroundColor: 'white',
        height: 40,
        marginTop: 5,
        flex: 1,
        borderRadius: 20,
        paddingRight: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        marginRight: 15,
    },
    searchText: {
        flex: 1,
        marginRight: 50
    }
});