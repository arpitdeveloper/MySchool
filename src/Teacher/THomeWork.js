import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    StatusBar,
    Dimensions,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
    SafeAreaView
    
} from 'react-native';

import firebase from "firebase";


const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

var today = new Date();
export default class ClassList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classlabel: 'Select Class',
            sectionlabel: 'Select Section',
            subjectlabel: 'Select Subject',
            note: '',
            classData: [],
            sectionData: [],
            isModalVisible: false,
            isValue:'',
            title:'',
            subjectData: [
                { value: 'Hindi' },
                { value: 'English' },
                { value: 'General Knowledge' },
                { value: 'Social Science' },
                { value: 'Science' },
                { value: 'Mathematics' },
                { value: 'Sanskrit' },

            ],
            allDict: [],
        };
    }
    componentDidMount() {
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Students').child('2019-20').once('value').then(snapshot => {


            var vale = Object.keys(snapshot.val())
            for (index in vale) {
                var newData = { value: vale[index] }
                this.state.classData.push(newData)
            }
            this.setState({ classData: this.state.classData })

            console.log(vale)

        }).catch((error) => {
            Alert.alert("Alert", '' + error);
            //console.log('error ' , error)
        })
    }
   
   
    handleEmail = (text) => {
        this.setState({ note: text })
        console.log(text)
    }
    submitclick = () => {

        if ((this.state.classlabel == '') || (this.state.sectionlabel == '') || (this.state.subjectlabel == '') || (this.state.note == '') || (this.state.classlabel == undefined) || (this.state.sectionlabel == undefined) || (this.state.subjectlabel == undefined)) {
            Alert.alert("Alert", 'Please Fill All section');
            //undefined
        }
        else {
            var homeworkData = {}
            homeworkData[this.state.subjectlabel] = this.state.note
            firebase.database().ref('HomeWork/').child('2019-20').child(this.state.classlabel).child(this.state.sectionlabel).child(today.toDateString()).update(
                homeworkData
            ).then((data) => {
                //Actions.TeacherHome()
                this.props.navigation.navigate('THome')
                console.log('ok', data)
            }).catch((error) => {
                Alert.alert("Alert", '' + error);
            })
        }
    }
    
    onClassValueChange = (txt) => {

        console.log("-------------------------------------")
        console.log(this.state.classlabel)
        firebase.database().refFromURL('https://schoolapp-88d39.firebaseio.com/').child('Students').child('2019-20').child(txt).once('value').then(snapshot => {


            var vale = Object.keys(snapshot.val())
            for (index in vale) {
                var newData = { value: vale[index] }
                this.state.sectionData.push(newData)
            }
            this.setState({ sectionData: this.state.sectionData })
            //var jjj = JSON.parse(Object.keys(snapshot.val()))

            console.log(vale)

        }).catch((error) => {
            Alert.alert("Alert", '' + error);
            //console.log('error ' , error)
        })

    }
    renderRow = ({ item }) => {
        return (
            <TouchableWithoutFeedback style={{ flex: 1, height: 60, backgroundColor: 'white' }} onPress={() => this.onflatClick(item)}>
                <View style={styles.cellButton}>
                    
                    <Text style={styles.text}>{item.value}</Text>
                </View>

            </TouchableWithoutFeedback>
        )
    }
    onflatClick = (item) => {
        if (this.state.isValue == "class") {
            
            this.setState({classlabel:item.value, isModalVisible:false})
            this.onClassValueChange(item.value)
        } else if (this.state.isValue == "section") {
         
            this.setState({ sectionlabel: item.value, isModalVisible: false })
        } else {
            this.setState({ subjectlabel: item.value, isModalVisible: false })
        }
        console.log(item.value) 
    }
    onButtonClick = (vid) => {
        
        if (vid == "class"){
            this.setState({isModalVisible:true, isValue:"class", title:"Select Class"})
            this.setState({allDict: this.state.classData})
        } else if (vid == "section") {
            this.setState({ isModalVisible: true, isValue: "section", title:"Select Section" })
            this.setState({ allDict: this.state.sectionData })
        } else if (vid == "subject") {
            this.setState({ isModalVisible: true, isValue: "subject", title: "Select Subject" })
            this.setState({ allDict: this.state.subjectData })
        } 
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView>
                    <View style={styles.headerView}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.toggleDrawer()}
                            style={{ height: 50, width: 50, marginLeft: 20 }}>
                            <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, tintColor: 'white', marginTop: 10 }} resizeMode="contain" />

                        </TouchableOpacity>
                        <View style={styles.titleView}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{today.toDateString()}</Text>
                        </View>

                    </View>
            </SafeAreaView>
                <ScrollView style={styles.scrollV}>
                    {/* <View style={{ alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 20 }}>{today.toDateString()}</Text>
                    </View> */}
                    <View style={styles.container}>
                        <View style={styles.dropView}>
                            <TouchableWithoutFeedback onPress={() => this.onButtonClick("class")}>
                                <View style={{
                                   
                                    flex:1,
                                    width:'100%',
                                    justifyContent:'center',
                                    marginLeft:15
                                }}>
                                    <Text style={{
                                        fontSize:18
                                    }}>{this.state.classlabel}</Text>
                                </View>
                              
                                
                            </TouchableWithoutFeedback>
                            <View style={{ backgroundColor: 'gray', height: 1, width: '100%' }} />
                            
                        </View>
                        <View style={styles.dropView}>
                            <TouchableWithoutFeedback onPress={() => this.onButtonClick("section")}>
                                <View style={{

                                    flex: 1,
                                    width: '100%',
                                    justifyContent: 'center',
                                    marginLeft: 15
                                }}>
                                    <Text style={{
                                        fontSize: 18
                                    }}>{this.state.sectionlabel}</Text>
                                </View>


                            </TouchableWithoutFeedback>
                            <View style={{ backgroundColor: 'gray', height: 1, width: '100%' }} />
                           
                        </View>
                        <View style={styles.dropView}>
                            <TouchableWithoutFeedback onPress={() => this.onButtonClick("subject")}>
                                <View style={{

                                    flex: 1,
                                    width: '100%',
                                    justifyContent: 'center',
                                    marginLeft: 15
                                }}>
                                    <Text style={{
                                        fontSize: 18
                                    }}>{this.state.subjectlabel}</Text>
                                </View>


                            </TouchableWithoutFeedback>
                            <View style={{ backgroundColor: 'gray', height: 1, width: '100%' }} />
                           
                        </View>
                        <View style={styles.textView}>
                            <TextInput style={styles.input}
                                underlineColorAndroid="blue"
                                placeholder="HomeWork"
                                autoCapitalize="none"
                                multiline
                                style={{ fontSize: 17, 
                                    paddingLeft: 10,
                                    height:150,
                                    borderWidth:0.5,
                                    borderColor:'gray',
                                    padding:15,
                                    borderRadius:10, 
                                    paddingRight: 10,}}
                                onChangeText={this.handleEmail} />
                        </View>
                        <View style={styles.dropView}>
                            <TouchableOpacity style={{
                                backgroundColor: '#fff176', height: 40, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={this.submitclick}>
                                <Text style={{ fontSize: 20, color: '#795548' }}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent:'center'}}>
                        <View style={styles.popView}>
                            <View style={styles.popHeader}>
                                <Text style={{
                                    color:'white',
                                    fontSize:17
                                }}>
                                    {this.state.title}
                                </Text>
                            </View>
                            <FlatList
                                style={styles.flatView}
                                data={this.state.allDict}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                            /> 
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
let width = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%'
    },
    flatView: {
        padding: 10,
        height: '100%',
        width: '100%'
    },
    dropView: {
        height:50,
        width: width1-70,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        //backgroundColor:'red'
    },
    buttonStyle: {
        width: '100%',
        height: '90%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0
        },
    },
    dropdown: {
        width: '80%',
    },
    textView: {
        width: '80%',
        marginTop: 30
    },
    popView:{
        height: height - 150, 
        backgroundColor: '#eeeeee', 
        width: width1 - 40,
        alignSelf:'center',
        borderRadius:10,
        
    },
    popHeader:{
        height:45,
        width:'100%',
        backgroundColor:'blue',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    cellButton: {
        height: 60,
        backgroundColor: 'white',
        marginTop: 1,
        flexDirection: 'row',
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'

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
    }

});