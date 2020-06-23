import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
    StatusBar,
    Dimensions
} from 'react-native';

import firebase from "firebase";
import Loader from '../Design/Loader'


var today = new Date();
export default class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            dataArray: [],

            modalVisible: false,
        };
    }
    componentDidMount() {


        var dictData = this.props.route.params.home
        
        let values = Object.values(dictData)
    
         //var data = Object.keys(values)
     //console.log(n)
        this.setState({ dataArray: values })
        
    }
    onClickChild = (item) => {

        Actions.ViewChildProfile({ item })
    }
    renderRow = ({ item }) => {

        return (

            <View style={styles.AllView}>
                <View style={{ alignContent: 'stretch' }}>
                    <Text style={{ paddingLeft: 5, fontSize: 18, fontWeight: 'bold', textAlign: 'justify', alignSelf: 'stretch' }}>{Object.keys(item)}</Text>
                </View>
                <View>
                    <Text style={{ padding: 10, fontSize: 16 }}>{Object.values(item)}</Text>
                </View>
            </View>

        )
    }
 
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={styles.headerView}>
                    <TouchableOpacity style={{ height: 50, width: 50, flexDirection: 'row' }} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../img/backA.png')}
                            style={{ height: 20, width: 20, marginTop: 15, marginLeft: 5, tintColor:'black' }} resizeMode="contain" />

                    </TouchableOpacity>
                    <Text style={{ color: 'white', marginLeft: 30, alignSelf: 'center', textTransform: 'capitalize', fontSize: 20, fontWeight: 'bold' }}>{this.props.route.params.userName}</Text>
                </View>
                <View style={styles.container}>

                    <FlatList
                        style={styles.flatView}
                        data={this.state.dataArray}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                        indicatorStyle='white'

                    />
                </View>
                {this.state.isLoad ? <Loader /> : null}
            </SafeAreaView>

        );
    }
}
let width = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    flatView: {
        padding: 10,
        flex: 1,
        width: '100%',
        marginBottom: 5

    },
    AllView: {
        width: '100%',
        padding: 10,
        backgroundColor: '#e3f2fd',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10

    },

});