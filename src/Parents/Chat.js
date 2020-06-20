import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList,
    Dimensions
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import firebase from "firebase";


const height0 = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

export default class AddChild extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            textMessage: '',
            messageList: []

        };
        this.changeData = this.changeData.bind(this);
    }
    UNSAFE_componentWillMount() {
        console.log(this.props.route)
        
        let ref = "/Message/" + firebase.auth().currentUser.uid + '/' + this.props.route.params.uid;
        firebase.database().ref(ref).on("value", snapshot => {
            //console.log("ss", firebase.auth().currentUser.uid)
            //console.log("change child", snapshot.val())
            this.changeData(snapshot.val())
            //this.state.messageList.push(snapshot.val())
        })

        this.showChat()
    }
    showChat() {
        //console.log("not colling every time---------------------------------")
        let ref = "/Message/" + firebase.auth().currentUser.uid + '/' + this.props.route.params.uid;
        firebase.database().ref(ref).once('value').then(snapshot => {
            //console.log(snapshot.val())
            this.changeData(snapshot.val())

        })

    }
    handleChnageText = key => val => {
        let ref2 = "/typ/" + firebase.auth().currentUser.uid;
        //let msgId = firebase.database().ref(ref).push().key
        firebase.database().ref(ref2).set({
            msg: "typing",

        })
        this.setState({ [key]: val })
    }
    changeData(data) {
        //console.log(data)
        //this.setState({userDict: data})
        if (data == null) {

        } else {
            this.setState({ messageList: Object.values(data) })
        }

        //console.log(this.state.messageList)
        //console.log('undddd--------------')
    }
    renderRow = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    //width:'60%',
                    maxWidth: '80%',
                    alignSelf: item.from === firebase.auth().currentUser.uid ? 'flex-end' : 'flex-start',
                    backgroundColor: item.from === firebase.auth().currentUser.uid ? '#90CAF9' : '#1E88E5',
                    borderRadius: 5,
                    marginBottom: 10

                }}
            >
                <Text style={{ color: item.from === firebase.auth().currentUser.uid ? 'black' : 'white', padding: 7, fontSize: 16 }}>{item.msg}</Text>
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Text style={{ color: item.from === firebase.auth().currentUser.uid ? 'black' : 'white', padding: 3, fontSize: 12 }}>{this.convertTime(item.time)}</Text>
                </View>

            </View>
        )
    }
    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();


        var options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        var timeString = d.toLocaleString('en-US', options);

        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;

    }

    SendMessage = () => {
        if (this.state.textMessage != '') {
            //console.log('if not')

            let ref = "/Message/" + firebase.auth().currentUser.uid + '/' + this.props.route.params.uid;
            let msgId = firebase.database().ref(ref).push().key
            firebase.database().ref(ref).child(msgId).set({
                msg: this.state.textMessage,
                from: firebase.auth().currentUser.uid,
                time: firebase.database.ServerValue.TIMESTAMP,
            })

            let ref2 = "/Message/" + this.props.route.params.uid + '/' + firebase.auth().currentUser.uid;
            //let msgId = firebase.database().ref(ref).push().key
            firebase.database().ref(ref2).child(msgId).set({
                msg: this.state.textMessage,
                from: firebase.auth().currentUser.uid,
                time: firebase.database.ServerValue.TIMESTAMP,
            })
            this.showChat()
            this.setState({ textMessage: '' })
        } else {

        }
    }
    onBackClick = () => {

        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity style={{height:50, width:50,flexDirection:'row'}} onPress={this.onBackClick}>
                        <Image source={require('../img/backA.png')}
                            style={{ height: 20, width: 20, marginTop: 15, marginLeft: 5, }} resizeMode="contain" />
                        <Image source={require('../img/user.png')}
                            style={{ height: 40, width: 40, marginTop: 5, marginLeft: 5,borderRadius:15 }} resizeMode="contain" />

                    </TouchableOpacity>
                    <Text style={{ color: 'white', marginLeft: 30, alignSelf:'center', textTransform:'capitalize', fontSize:20, fontWeight:'bold' }}>{this.props.route.params.userName}</Text>
                </View>
                <FlatList
                    style={styles.flatView}
                    //ref={elm => this.flatList = elm}
                    ref="flatList"

                    onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    bounces={false}

                //extraData={this.state.messageList}

                />
                <View style={styles.container}>
                    <TextInput style={styles.textstyle}
                        placeholder='message'
                        onChangeText={this.handleChnageText('textMessage')}
                        value={this.state.textMessage}
                        autoCapitalize='none'
                        autoCorrect={false}
                       // multiline={true}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={this.SendMessage}>
                        <Image source={require('../img/send.png')} style={{ height: 20, width: 20,  tintColor:'white' }} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        );
    }
}
let { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
       
    },
    textstyle: {
       
        height: 50,
        flex:1,
        paddingLeft:20,
        padding: 15,
        paddingTop: 15,
        paddingBottom:15,
        backgroundColor:'white',
        borderRadius: 10,
        marginLeft:5,
        maxHeight:100,
        shadowColor: '#BBDEFB',
        shadowOffset: {
            width: 0.2,
            height: 0.2
        },
        shadowRadius: 10,
        shadowOpacity: 1.0

    },
    buttonContainer: {
        height: 50,
        // backgroundColor:'green',
        width:50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: '#1A237E',
        borderRadius:25,
        shadowColor: '#BBDEFB',
        shadowOffset: {
            width: 0.2,
            height: 0.2
        },
        shadowRadius: 10,
        shadowOpacity: 1.0
    },
    flatView: {
        padding: 10,
        height: height * 0.7,
        flex: 1,
        marginBottom: 10
    },
    headerView: {
        height: 50,
        width: width1,
        backgroundColor: "blue",
        flexDirection:'row'
    }

});