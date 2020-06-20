import React, {Component} from 'react';
import { TouchableOpacity,Text,  View, StyleSheet, SafeAreaView, Image } from 'react-native';


import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import firebase from "firebase";
import AsyncStorage from '@react-native-community/async-storage';

import PropTypes from 'prop-types';


class SideMenu extends Component {
    
    signOut = () => {
       
       
        console.log(this.props.user)
        firebase.auth().signOut().then(her => {
            // Sign-out successful.
            AsyncStorage.setItem('login', "user")
            this.props.navigation.navigate('Login')
        }).catch(function (error) {
            // An error happened.
        });
    }
    render() {
        const { text } = this.props;
        console.log("---side-----", text)
        return (
            <View style={{ flex: 1 }}>
                
                <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerContent}>
                        <View style={{ backgroundColor: 'white', height: 120, flex: 1 }}>
                            <Image source={require('../img/imgBack.png')} style={{ width:'100%', flex:1 }} resizeMode="cover" />
                        </View>
                        <View style={styles.imgBack}>
                            <Image source={require('../img/user.png')} style={{ width: '100%', flex: 1 }} resizeMode="cover" />

                        </View>
                        <View style={styles.userInfoSection}>
                            
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                               
                                {/* <Avatar.Image
                                    source={{
                                        uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                    }}
                                    size={50}
                                /> */}
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    {/* <Title style={styles.title}>John Doe</Title>
                                    <Caption style={styles.caption}>@j_doe</Caption> */}
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.section}>
                                    {/* <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                    <Caption style={styles.caption}>Following</Caption> */}
                                </View>
                                <View style={styles.section}>
                                    {/* <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                    <Caption style={styles.caption}>Followers</Caption> */}
                                </View>
                            </View>
                        </View>

                        <View style={styles.drawerSection}>
                            <DrawerItem
                                // icon={({ color, size }) => (
                                //     <Icon
                                //         name="home-outline"
                                //         color={color}
                                //         size={size}
                                //     />
                                // )}
                                label="Home"
                                onPress={() => { 
                                    if(text == "teacher"){
                                        this.props.navigation.navigate('THome')     
                                    } else if (text == "parent"){
                                        this.props.navigation.navigate('PHome') 
                                    }else if(text == "admin") {
                                        this.props.navigation.navigate('AHome') 
                                    }
                                    
                                }}
                            />
                            <DrawerItem
                                // icon={({ color, size }) => (
                                //     <Icon
                                //         name="account-outline"
                                //         color={color}
                                //         size={size}
                                //     />
                                // )}
                                label="Profile"
                                onPress={() => { this.props.navigation.navigate('Profile') }}
                            />
                            <DrawerItem
                                // icon={({ color, size }) => (
                                //     <Icon
                                //         name="bookmark-outline"
                                //         color={color}
                                //         size={size}
                                //     />
                                // )}
                                label="Bookmarks"
                                onPress={() => { this.props.navigation.navigate('BookmarkScreen') }}
                            />
                            <DrawerItem
                                // icon={({ color, size }) => (
                                //     <Icon
                                //         name="settings-outline"
                                //         color={color}
                                //         size={size}
                                //     />
                                // )}
                                label="Settings"
                                onPress={() => { this.props.navigation.navigate('SettingScreen') }}
                            />
                            <DrawerItem
                                // icon={({ color, size }) => (
                                //     <Icon
                                //         name="account-check-outline"
                                //         color={color}
                                //         size={size}
                                //     />
                                // )}
                                label="Support"
                                onPress={() => { this.props.navigation.navigate('SupportScreen') }}
                            />
                        </View>
                        <View >
                            {/* <TouchableRipple 
                            //onPress={() => { toggleTheme() }}
                            >
                                <View style={styles.preference}>
                                    <Text>Dark Theme</Text>
                                    <View pointerEvents="none">
                                       
                                    </View>
                                </View>
                            </TouchableRipple> */}
                        </View>
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem
                        // icon={({ color, size }) => (
                        //     // <Icon
                        //     //     name="exit-to-app"
                        //     //     color={color}
                        //     //     size={size}
                        //     // />
                        // )}
                        label="Sign Out"
                        onPress={() => { this.signOut() }}
                    />
                </View>
            </View>
        );
    }
}

SideMenu.propTypes = {
    text: PropTypes.string.isRequired,
    
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    imgBack:{
        height:100,
        width:100,
        backgroundColor:'white',
        marginTop: - 50,
        marginLeft:20,
        borderRadius:50,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.2,
            height: 0.2
        },
        shadowRadius: 10,
        shadowOpacity: 1.0
    }
});
export default SideMenu;