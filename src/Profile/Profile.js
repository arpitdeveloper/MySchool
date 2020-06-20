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
    ImageBackground,
    SafeAreaView,
    

} from 'react-native';

//import LinearGradient from 'react-native-linear-gradient';
import firebase from "firebase";
import ImagePicker from 'react-native-image-picker';


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
       
        };
    }
    componentDidMount() {
       
    }
    onImageClick = () => {
        // console.log('one image click///////////===============================')
        const options = {

            customButtons: [{ name: 'fb', title: 'Remove Photo' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.uri);

            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //  console.log('User tapped custom button: ', response.customButton);
                this.removeProfilePicture()
                this.setState({ imgPath: '' })
            } else {


                if (Platform.OS == 'android') {

                    console.log('image url//////////////////[--------anderoid/////-uri]', response.uri)
                    const ss = 'file:///' + response.path
                    console.log('image url//////////////////[--------anderoid/////-]', ss)
                    const source = response.uri;
                    this.updateProfilePicture(ss)
                } else {
                    const source = response.uri;
                    try {
                    var storageRef = firebase.storage().ref();
                    var thisRef = storageRef.child("user/");
                    
                    thisRef.put(response.data).then(function (snapshot) {
                        console.log('Uploaded a blob or file!',JSON.stringify(snapshot));
                    }
                   
                    );
                    } catch (error) {
                        console.log('------in file', JSON.stringify(error))
                        //console.log(error.toString(JSON.stringify(error));
                    }
                    this.updateProfilePicture(source)
                }

            }
        });
    }
    updateProfilePicture = (imgURL) => {

        const uriPart = imgURL.split('.');
       
        const filename = uriPart[uriPart.length - 2];
        const fileExtension = uriPart[uriPart.length - 1];

        var userdata = { Image: uriPart }
        try {
            var storageRef = firebase.storage().ref();
            var metadata = {
                contentType: 'image/'+ fileExtension,
            };
            let nameI = filename+'.'+fileExtension 
            // Upload the file and metadata
            var uploadTask = storageRef.child('images/'+nameI).put(imgURL, metadata);

            console.log('------')
            console.log(JSON.stringify(uploadTask))
            // console.log('=======', firebasedata.auth())
            // var demo = firebasedata.auth().currentUser.uid;
            // console.log(demo)

            // mDatabase = firebase.database().ref('user').child(demo).push(userdata);


        } catch (error) {
            console.log('------', JSON.stringify(error))
            //console.log(error.toString(JSON.stringify(error));
        }

        // const data = new FormData();
        // data.append('userid', this.state.userid); // you can append anyone.
        // data.append('username', this.state.username);
        // data.append('email', this.state.useremail);
        // data.append('profilepicture', {
        //     uri: imgURL,
        //     type: 'image/' + fileExtension, // or photo.type
        //     name: 'testPhotoName.' + fileExtension
        // });
        // //console.log('...................')
        // // console.log('userid......', this.state.userid)
      //item.from === firebase.auth().currentUser.uid ? 'flex-end' : 'flex-start'
/*
var user = firebase.auth().currentUser;

user.updateProfile({
  displayName: "Jane Q. User",
  photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});
*/
    }
    // uplod = () => {
    //     var fileimage = this.state.imagedata;
    //     var document = this.state.dcmt;

    //     var userdata = { Image: fileimage, Document: document }

    //     try {

    //         console.log('=======', firebasedata.auth())
    //         var demo = firebasedata.auth().currentUser.uid;
    //         console.log(demo)

    //         mDatabase = firebasedata.database().ref('user').child(demo).push(userdata);


    //     } catch (error) {
    //         console.log(error.toString(error));
    //     }

    // };
    handleEmail = (text) => {
        this.setState({ note: text })
        console.log(text)
    }
    render() {

        return (
           
            <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
                

                
                    <View style={styles.pattern}>
                        <ImageBackground source={require('../img/gard.png')} style={styles.img} resizeMode="cover">
                         
                        </ImageBackground>
                    </View>
                    <View style={styles.imgBack}>
                        <Image source={require('../img/user.png')} style={{ width: '100%', flex: 1 }} resizeMode="cover" />
                    </View>
                    <View style={{flex:1, width:'100%', marginTop:30}}>
                        <View style={styles.menuView} >
                            <Image source={require('../img/username.png')} style={styles.userImage } resizeMode="cover" />
                            <Text style={styles.text}>Mukesh</Text>
                        </View>
                        <View style={styles.lineVIEW}/>
                        <View style={styles.menuView} >
                            <Image source={require('../img/phone.png')} style={styles.userImage} resizeMode="cover" />
                            <Text style={styles.text}>9754228596</Text>
                        </View>
                        <View style={styles.lineVIEW} />
                        <View style={styles.menuView} >
                            <Image source={require('../img/mail.png')} style={styles.userImage} resizeMode="cover" />
                            <Text style={styles.text}>
                            {firebase.auth().currentUser != null ? firebase.auth().currentUser.email : 'emty'}</Text>
                        </View>
                        <View style={styles.lineVIEW} />
                     
                        
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginBottom:20 }}>
                        <TouchableOpacity 
                        onPress={() => this.onImageClick()}
                        style={{ backgroundColor: 'white', height: 50, width: width1 / 2, borderRadius:5 }}>
                            <ImageBackground
                            imageStyle={{ borderRadius: 5, backgroundColor:'#b3e5fc'}}
                            source={require('../img/gard.png')} style={{flex:1, borderRadius:5, justifyContent:'center', alignItems:'center'}} resizeMode="cover">
                            <Image source={require('../img/cam.png')} style={{ width: 40, height:40, flex: 1 }} resizeMode="contain" />
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.toggleDrawer()}
                    style={{ height: 50, width: 50, marginTop: 25, marginLeft: 20, position:'absolute' }}>
                    <Image source={require('../img/menu.png')} style={{ height: 30, width: 30, }} resizeMode="contain" />

                </TouchableOpacity>
            </SafeAreaView>
                
        
        );
    }
}

const styles = StyleSheet.create({
    pattern:{
      
        borderRadius: width1,
        width: width1 * 2,
        height: width1 * 2,
        marginLeft: -(width1/ 2),
        marginTop: -(height / 1.1),
       // position: 'absolute',
        //backgroundColor:'#81d4fa',
        overflow: 'hidden'
        
    },
    img:{
        flex:1,
        width:width1 * 2,
        borderBottomEndRadius: width1,
 
        alignSelf:'center'
    },
    imgBack: {
        height: 100,
        width: 100,
        backgroundColor: '#BDC6F3',
        marginTop: - 50,
        marginLeft: 20,
        borderRadius: 50,
        // shadowColor: 'gray',
        // shadowOffset: {
        //     width: 0.2,
        //     height: 0.2
        // },
        // shadowRadius: 10,
        // shadowOpacity: 1.0,
         alignSelf:'center',
         
    },
    userImage:{
        height:30,
        width:30,
        tintColor: '#42a5f5'
        
    },
    menuView:{
        flexDirection:'row',
        marginLeft:30,
        marginTop:20
       
    },
    text:{
        alignSelf:'center',
        marginLeft:50,
        fontSize:18,
        color:'gray'
    },
    lineVIEW:{
        width:width1,
        height:1,
        backgroundColor:'#e0e0e0',
        marginTop:10
    }
   

});