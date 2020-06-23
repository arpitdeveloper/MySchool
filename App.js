/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {  
  StyleSheet,
  Button,
  ActivityIndicator,
  View
 } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './src/Authentication/Login';

//------------------------Admin Import-----------------------------
import AHome from './src/Admin/AHome'
import AddParents from './src/Admin/AddParents'
import AddTeacjer from './src/Admin/AddTeacjer'
import AddStudent from './src/Admin/AddStudent'
import AddSubject from './src/Admin/AddSubject'

//------------------------Teacher Import----------------------------
import THome from './src/Teacher/THome'
import THomeWork from './src/Teacher/THomeWork'
import StudentAttend from './src/Teacher/StudentAttend'

//------------------------Parants Import----------------------------
import PHome from './src/Parents/PHome';
import BusLocation from './src/Parents/BusLocation';
import ChatList from './src/Parents/ChatList';
import Chat from './src/Parents/Chat';
import SHomeWork from './src/Parents/SHomeWork'
import ShowHome from './src/Parents/ShowHome'
//------------------------Other-------------------------------------
import SideMenu from "./src/Drawer/SideMenu"
import Profile from "./src/Profile/Profile"

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isUser: 'Login',
      user:""

    };
  }
  UNSAFE_componentWillMount() {
    AsyncStorage.getItem('login').then(async (value) => {
      let isLogin = value;
      
      if (isLogin != null) {
        console.log('playerid------', isLogin)
        if (isLogin == "Parents"){
          this.setState({ isUser:"newHome", user:isLogin})
          console.log(this.state.isUser)

        }else if(isLogin == "Teacher"){
          this.setState({ isUser: "Teach", user: isLogin })
          console.log(this.state.isUser)

        }else if(isLogin == "Admin"){
          this.setState({ isUser: "Admin", user: isLogin })
          console.log(this.state.isUser)

        }else {
          this.setState({ isUser:'Login'})
        }
        this.setState({ isLoading: false })

      } else {
        console.log('ok')
        this.setState({ isLoading: false })
      }
    });
  }
//----------For Tab bar-------------------------------
//  newHome() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   )
// }
admin() {
  return (
    <Drawer.Navigator initialRouteName="AHome" drawerContent={props => <SideMenu {...props} text={"admin"}/>}>
      <Drawer.Screen name="AHome" component={AHome} />
      <Drawer.Screen name="AddParents" component={AddParents} />
      <Drawer.Screen name="AddTeacjer" component={AddTeacjer} />
      <Drawer.Screen name="AddStudent" component={AddStudent} />
      <Drawer.Screen name="AddSubject" component={AddSubject} />
      <Drawer.Screen name="ChatList" component={ChatList} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Profile" component={Profile} />
      
    </Drawer.Navigator>
  )
}
teach() {
  return (
    <Drawer.Navigator initialRouteName="THome" drawerContent={props => <SideMenu {...props} text={"teacher"}/>}>
      <Drawer.Screen name="THome" component={THome} />
      <Drawer.Screen name="THomeWork" component={THomeWork} />
      <Drawer.Screen name="StudentAttend" component={StudentAttend} />
      <Drawer.Screen name="ChatList" component={ChatList} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}
 newHome() {

     return (
       <Drawer.Navigator initialRouteName="PHome" drawerContent={props => <SideMenu {...props} text={"parent"}/>}>
         <Drawer.Screen name="PHome" component={PHome} />
         <Drawer.Screen name="BusLocation" component={BusLocation} />
         <Drawer.Screen name="ChatList" component={ChatList} />
         <Drawer.Screen name="Chat" component={Chat} />
         <Drawer.Screen name="Profile" component={Profile} />
         <Drawer.Screen name="SHomeWork" component={SHomeWork} />
         <Drawer.Screen name="ShowHome" component={ShowHome} />
       </Drawer.Navigator>
     )
   
  
}
  
  render() {
    if (this.state.isLoading == true) {
      
      return (
        <View style={{ flex: 1, backgroundColor: 'rgba(89,83,245,0.8)', justifyContent:'center'}}>
          <ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }} />
        </View>
      );
      
    }
    else {
  
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={this.state.isUser}>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="newHome" component={this.newHome} options={{
              headerShown: false, headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="white"
                />
              ),}}/>
            <Stack.Screen name="Teach" component={this.teach} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={this.admin} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Profile" component={Profile} /> */}
          </Stack.Navigator>
        
        </NavigationContainer>
        
      );
    }
  }


}

const styles = StyleSheet.create({
  scrollView: {
    //backgroundColor: Colors.lighter,
  },
});

