import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class MyButton extends Component {
    render() {
        const { text, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.buttonStyle}
                onPress={() => onPress()}
            >
                <Text style={styles.textStyle}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

MyButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};

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

export default MyButton;