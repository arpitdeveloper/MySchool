import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Modal
} from 'react-native';

const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width
var today = new Date();
export default class CSList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classlabel: '',
            sectionlabel: '',
            subjectlabel: '',
            note: '',
            classData: [
                { value: 'Class 1st' },
                { value: 'Class 2nd' },
                { value: 'Class 3rd' },
                { value: 'Class 4th' },
                { value: 'Class 5th' },
                { value: 'Class 6th' },
                { value: 'Class 7th' },
                { value: 'Class 8th' },
                { value: 'Class 9th' },
                { value: 'Class 10th' },
                { value: 'Class 11th' },
                { value: 'Class 12th' },
            ],
            sectionData: [

                { value: 'Section A' },
                { value: 'Section B' },
                { value: 'Section C' },
                { value: 'Section D' },
            ],
            isModalVisible: false,
        };
    }

    
   
    submitclick = () => {
        console.log('ok done')
        Actions.StudentAttendence({ cls: this.state.classlabel, sec: this.state.sectionlabel })
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
                    
                    <View style={styles.container}>
                        <View style={styles.dropView}>
                            {/* <Dropdown
                                value={this.state.classlabel}
                                data={this.state.classData}
                                pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0, marginLeft: 150, width: 160, marginTop: 50 }}

                                containerStyle={styles.dropdown}
                                label='Select Class'
                                onChangeText={(classlabel) => { this.setState({ classlabel }); }}
                            /> */}
                        </View>
                        <View style={styles.dropView}>
                            {/* <Dropdown
                                value={this.state.sectionlabel}
                                data={this.state.sectionData}
                                pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0, marginLeft: 150, width: 160, marginTop: 50 }}

                                containerStyle={styles.dropdown}
                                label='Select Section'
                                onChangeText={(sectionlabel) => { this.setState({ sectionlabel }); }}
                            /> */}
                        </View>


                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={{ backgroundColor: 'green', height: 40, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={this.submitclick}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Continue</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)', justifyContent: 'center' }}>
                        <View style={styles.popView}>
                            <View style={styles.popHeader}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 17
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
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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
        marginTop: 20
    },

    bottomView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
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
    popView: {
        height: height - 150,
        backgroundColor: '#eeeeee',
        width: width1 - 40,
        alignSelf: 'center',
        borderRadius: 10,

    },
    popHeader: {
        height: 45,
        width: '100%',
        backgroundColor: 'blue',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cellButton: {
        height: 60,
        backgroundColor: 'white',
        marginTop: 1,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'

    },
});