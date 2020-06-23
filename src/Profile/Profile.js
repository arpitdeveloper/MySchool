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
import Loader from '../Design/Loader'
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
            uid:'',
            isLoad:false,
            imgUrl:'',
        };
    }
    componentDidMount() {
       if (firebase.auth().currentUser){
            this.setState({uid: firebase.auth().currentUser.uid})
            this.setState({imgUrl: firebase.auth().currentUser.photoURL})
       }
    }
    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                // return the blob
                console.log("resolve:- ", xhr.response)
               // console.log("reject:- ", reject)
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                console.log("resolve:- rejct")
                reject(new Error('uriToBlob failed'));
            };
            // this helps us get a blob
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);

            xhr.send(null);
        });
    }
    uploadToFirebase = (blob) => {
        return new Promise((resolve, reject) => {
            var storageRef = firebase.storage().ref();
            //const time = firebase.database().ServerValue.TIMESTAMP
           // var time1 = new Date()
            const time = Date.now()
            const fileData = blob.data.name

            const uriPart = fileData.split('.');

            const fileExtension = uriPart[1]
            //console.log('******* Blob*********: - ', time.getTime())

            const fileName = "IMG_"+time+"."+fileExtension
            storageRef.child('uploads/'+this.state.uid+'/'+fileName).put(blob, {
                contentType: 'image/' + fileExtension
            }).then((snapshot) => {
                blob.close();
                this.setState({isLoad:false})
                
                console.log("snapshot: " + snapshot.state);
                console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                    console.log("Success");
                    var starsRef = storageRef.child('uploads/' + this.state.uid + '/' + fileName);


                    starsRef.getDownloadURL().then(function (url) {
                        // Insert url into an <img> tag to "download"
                        console.log('url:-----',url)
                        var user = firebase.auth().currentUser;

                        user.updateProfile({
                            //displayName: "Jane Q. User",
                            photoURL: url
                        }).then(function (n) {
                            // Update successful.
                            console.log(firebase.auth().currentUser)
                        }).catch(function (error) {
                            // An error happened.
                        });

                    }).catch(function (error) {

                        // A full list of error codes is available at
                        console.log(error)
                    });
                }
                resolve(snapshot);
            }).catch((error) => {
                this.setState({ isLoad: false })
                reject(error);
            });
        });
    }
    onImageClick = () => {

        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (result) =>{

            if (!result.cancelled) {
                this.setState({isLoad:true})
                try {
                // User picked an image

                const { height, width, type, uri } = result;
             
                const bl = this.uriToBlob(uri).then((blob) => {
                    const fl = this.uploadToFirebase(blob);
                    fl.then((snapshotf) => {
                        
                        console.log('Upload: - ')
                    })

                });
                console.log(bl)
                } catch (error) {
                    console.log('------in file', JSON.stringify(error))
                    //console.log(error.toString(JSON.stringify(error));
                }

            }

        })

    }
    
    
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
                    <Image  source={{ uri:this.state.imgUrl}} style={{ width: '100%', flex: 1, borderRadius:50, borderWidth:0.5, borderColor:'gray' }} resizeMode="cover" />
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
                    <View style={styles.menuView} >
                        <Image source={require('../img/calendar.png')} style={styles.userImage} resizeMode="cover" />
                        <Text style={styles.text}>
                            {today.getDate() +"-"+ today.getMonth() +"-"+today.getFullYear()}</Text>
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
                {this.state.isLoad ? <Loader /> : null}
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