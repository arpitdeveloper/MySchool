import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';

const height = Dimensions.get('window').height
const width1 = Dimensions.get('window').width

class NewView extends Component {
    render() {
      
        
           const  gradientHeight = width1/2;
    const gradientBackground = 'red';
    const wo = width1/2;
    const newBack = 'blue'
        const data = Array.from({ length: gradientHeight });
        return (
            <View style={{ flex: 1 }}>
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            backgroundColor: gradientBackground,
                            height: 50,
                            width: width1,
                            
                            top: 0,
                            right: 0,
                            left: (gradientHeight - i),
                            transform: [{ rotate: '270deg' }],
                            zIndex: 2,
                            opacity: (1 / gradientHeight) * (i + 1)
                        }}
                    />

                ))}
                {data.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'absolute',
                            backgroundColor: newBack,
                            height: 50,
                            width: width1,
                            top: 0,
                            right: 0,
                            left: (wo - i),
                            transform: [{ rotate: '90deg' }],
                            zIndex: 2,
                            opacity: (1 / wo) * (i + 1)
                        }}
                    />

                ))}
            </View>

        );
    }
}



const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        color: 'blue',
        textAlign: 'center'
    },

    buttonStyle: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5
    }
});

export default NewView;