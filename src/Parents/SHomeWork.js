import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    TouchableOpacity,
    Animated,
    Alert,
    SafeAreaView,
    Dimensions,
    Image,
    LayoutAnimation,
    
} from 'react-native';

import firebase from "firebase";
import Loader from '../Design/Loader'


var today = new Date();


export default class SHomeWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            dataArray: [],
            fadeAnim: new Animated.Value(0),
            isLoad: false,
           
        };
    }
    componentDidMount() {
      

        this.setState({ isLoad: true });
        if (this.props.route.params.class != undefined){
            firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('HomeWork').child('2019-20').child(this.props.route.params.class).child(this.props.route.params.section).once('value').then(snapshot => {
                this.setState({ isLoad: false });
                // console.log(snapshot.val())
                var dictData = snapshot.val()

                var data = Object.keys(snapshot.val())
                data.sort((d1, d2) => new Date(d2).getTime() - new Date(d1).getTime());

                for (index in data) {

                    var tempDictData = {}
                    tempDictData[data[index]] = dictData[data[index]]
                    this.state.dataArray.push(tempDictData)

                }
                this.setState({ dataArray: this.state.dataArray })
                //console.log(this.state.dataArray)

            })
        }
        
    }
    onClickChild = (item) => {
        var newItem = Object.values(item)
        console.log('ok done child', item)
        var newD = newItem[0]
        this.props.navigation.navigate('ShowHome', { home:item})
        //Actions.ViewHomeWork({ newD })
    }
    renderRow = ({ item }) => {
        // Animated.timing(this.state.fadeAnim, {
        //     toValue: 1,
        //     duration: 2000
        // }).start();

        var dateString = Object.keys(item)
        var newDate = ''

        var d = new Date();

        //console.log('Today is: ' + d.toLocaleString());

        d.setDate(d.getDate() - 1);

        //console.log('5 days ago was: ' + d.toDateString());
        if (dateString == today.toDateString()) {
            newDate = 'Today'
            console.log('todjay date is running')
        }
        else if (dateString == d.toDateString()) {

            newDate = 'Yesterday'
        } else {
            newDate = dateString
        }
        return (
            <View style={styles.childCell} >
                <TouchableOpacity style={styles.buttonStyle} onPress={() => this.onClickChild(item)}>
                
                    <Text style={{fontSize: 16, paddingLeft:20 }}>{newDate}</Text>
                </TouchableOpacity>
            </View>
        )
    }
   

    render() {
       
        return (
            <View style={{ flex: 1, backgroundColor:'#f5f5f5' }}>
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.headerView}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.toggleDrawer()}
                            style={{ height: 50, width: 50, marginLeft: 20 }}>
                            <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, tintColor: 'white', marginTop: 10 }} resizeMode="contain" />

                        </TouchableOpacity>
                        <View style={styles.titleView}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{this.state.title}</Text>
                        </View>

                    </View>
                
               
             

                    <FlatList
                        style={styles.flatView}
                        data={this.state.dataArray}
                        renderItem={this.renderRow}
                        bounces={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                       
             
                </SafeAreaView>
                {this.state.isLoad ? <Loader /> : null}
            </View>

        );
    }
}
let width1 = Dimensions.get('window').width
let height = Dimensions.get('window').height
const styles = StyleSheet.create({
    
    flatView: {
        height: 50,
        width: width1,
      
        flexDirection: 'row'

    },
    childCell: {
        width: width1,
        height:50,
        backgroundColor: 'white',
        
        //borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3

    },
    buttonStyle: {
        height: 50,
        width: width1,
        backgroundColor: "white",
        flexDirection: 'row',
        alignItems:'center'

       // marginLeft: 12
    },
    headerView: {
        height: 50,
        width: width1,
        backgroundColor: "blue",
        flexDirection: 'row'
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginRight: 70
    },
    loaderView: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        position: 'absolute',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        width: width1,

    },
    
    
});