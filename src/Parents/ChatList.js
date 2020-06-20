import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Image,
    SafeAreaView,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "firebase";

const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width
export default class ChatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            textMessage: 'dfs',
            messageList: [],
            keyList: [],
            userDict: [],
            title:''

        };
        this.changeData = this.changeData.bind(this);

    }
    componentDidMount() {
        //console.log(JSON.stringify(firebase.auth()))
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('users').once('value').then(snapshot => {

            this.changeData(snapshot.val())
        })
    }
 
    changeData(data) {
        //console.log(data)
        this.setState({ userDict: data })
        let allData = Object.values(data)
        AsyncStorage.getItem('login').then(async (value) => {
            let isLogin = value;
            var newArray = [];
            if (isLogin != null) {
                console.log('playerid------', isLogin)
                if (isLogin == "Parents") {
                    this.setState({title:"Teachers"})
                   for (let i = 0; i < allData.length; i++) {
                       const element = allData[i].userType;
                       
                       if ((allData[i].userType != "parents") && (allData[i].userType != "admin")){
                           newArray.push(allData[i])
                       }else {
                           console.log(element)
                       }
                   }
                } else if (isLogin == "Teacher"){
                    this.setState({ title: "Parents" })
                    for (let i = 0; i < allData.length; i++) {
                        const element = allData[i].userType;

                        if ((allData[i].userType != "Teacher") && (allData[i].userType != "admin")) {
                            newArray.push(allData[i])
                        } else {
                            console.log(element)
                        }
                    }
                }else if(isLogin == "Admin"){
                    this.setState({ title: "Teachers" })
                    for (let i = 0; i < allData.length; i++) {
                        const element = allData[i].userType;

                        if ((allData[i].userType != "parents") && (allData[i].userType != "admin")) {
                            newArray.push(allData[i])
                        } else {
                            console.log(element)
                        }
                    }
                }

                this.setState({ keyList: newArray })

            } else {
       
            
            }
        });
   
    }
    renderRow = ({ item }) => {
        return (
            <TouchableWithoutFeedback style={{flex:1, height:80}} onPress={() => this.onClick(item)}>
                <View style={styles.cellButton}>
                    <Image source={require('../img/user.png')} 
                    style={{ height:70, width:70, marginTop:5, marginLeft:15, borderRadius:35 }} resizeMode="contain" />
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                
            </TouchableWithoutFeedback>
        )
    }
    onClick = (item) => {
        console.log(item)
        this.props.navigation.navigate('Chat', { uid:item.uid, userName: item.name });
    }
   
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.toggleDrawer()}
                        style={{ height: 50, width: 50, marginLeft: 20 }}>
                        <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, tintColor:'white', marginTop:10 }} resizeMode="contain" />

                    </TouchableOpacity>
                    <View style={styles.titleView}>
                        <Text style={{ color:'white', fontSize:18}}>{this.state.title}</Text>
                    </View>
                    
                </View>
                <FlatList
                    style={styles.flatView}
                    data={this.state.keyList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                /> 

            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    textstyle: {
        borderWidth: 1,
        height: 50,
        width: '70%',
        borderColor: 'red',
        padding: 10,
        borderRadius: 25

    },
    buttonContainer: {
        height: 50,
        // backgroundColor:'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    flatView: {

    },
    cellButton:{
        height:80,
        backgroundColor:'white',
        marginTop:1,
        flexDirection:'row',
        flex:1

    },
    text:{
        fontSize:25,
        textTransform:'capitalize',
        marginLeft:15,
        alignSelf:'center'
    },
    headerView:{
        height:50,
        width: width1,
        backgroundColor:"blue",
        flexDirection:'row'
    },
    titleView:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginRight:70
    }

});