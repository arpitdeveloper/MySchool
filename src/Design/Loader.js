import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width
class Loader extends Component {
    render() {
  
        return (
            <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    loaderView: {
        flex: 1,
        //backgroundColor:'red',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        position: 'absolute',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        width: width1,

    }
});

export default Loader;