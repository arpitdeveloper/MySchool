/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    ScrollView,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../Design/Loader'
import firebase from "firebase";
const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

var x_position = 10
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
            stdList:[],
            isListShow:false,
            studentName:[],
            isLoad:false

        };
    }
    componentWillMount() {
        this.setState({isLoad: true})
        if (firebase.auth().currentUser){
            console.log("---------------------")
            firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Parents').child(firebase.auth().currentUser.uid).child('child').once('value').then(snapshot => {
                this.setState({ modalVisible: false });
                console.log(snapshot.val())
                this.setState({ stdList: Object.values(snapshot.val()) })
                this.setState({ isLoad: false })
                this.setState({ studentName: this.state.stdList[0] })
                // this.setState({ childKey: Object.keys(snapshot.val()) })

            })
        }else {
            this.setState({ isLoad: false })
        }
        
    }
    onSelectClick = () => {
        console.log("ok")
        this.setState({isListShow: !this.state.isListShow})
    }
    renderItem = ({item}) => {
        return (
            <View style={styles.cellView}>
                <TouchableOpacity>
                    <Text>{item.fullName}</Text>
                </TouchableOpacity>
                
            </View>
        )
    } 
    onHomeWorkClick = () => {
        console.log('----------------------')
        console.log(this.state.studentName)
        this.props.navigation.navigate('SHomeWork', {section: this.state.studentName.section, class: this.state.studentName.class})
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.headerView}
                        onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            x_position = layout.y + 50
                            console.log('height:', layout.height);
                            console.log('width:', layout.width);
                            console.log('x:', layout.x);
                            console.log('y:', x_position);
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.toggleDrawer()}
                            style={{ height: 50, width: 50, marginLeft: 20 }}>
                            <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, marginTop: 10 }} resizeMode="contain" />

                        </TouchableOpacity>
                        <View style={styles.titleView}>
                            <TouchableOpacity 
                            onPress={this.onSelectClick}
                            style={styles.buttonView}>
                                <Text style={{ fontSize: 18, flex:1 }}>{this.state.studentName.fullName}</Text>
                                <Image source={require('../img/backA.png')} style={styles.backArrow} resizeMode="contain" />
                            </TouchableOpacity>

                        </View>

                    </View>

                    {this.state.isListShow ? <FlatList
                        data={this.state.stdList}
                        renderItem={this.renderItem}
                        //keyExtractor={item => item.id}
                        keyExtractor={(item, index) => index.toString()}
                        bounces={false}
                        style={styles.flatView}
                    />: null}
                    
                    <View style={{flex:1, margin:15}}>
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
                                    onPress={this.onHomeWorkClick}
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
                                    style={{ flex: 1, alignSelf:'center' }}>
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
                {this.state.isLoad ? <Loader />:null}
                
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
    headerView: {
        height: 50,
        width: width1,
        //backgroundColor: "blue",
        flexDirection: 'row'
    },
    buttonView:{
        flex:1,
        flexDirection:'row',
       // backgroundColor:'red',
        width: width1 - 90,
       // justifyContent:'center',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    backArrow:{
        height:20,
        width:30,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        transform: [{ rotate: '270deg' }],
        tintColor:'black',
        marginLeft:10
    },
    flatView:{
        position:'absolute',
        top:x_position+50,
        zIndex: 1,
        
    },
    cellView:{
        height:40,
        width:width1,
        backgroundColor:'#90caf9',
        marginTop:1,
        justifyContent:'center',
        alignItems:'center'
    },
    loaderView:{
        flex:1,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        position:'absolute',
        height:height,
        justifyContent:'center',
        alignItems:'center',
        width:width1,

    }
});

