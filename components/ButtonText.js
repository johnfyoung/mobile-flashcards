import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { blue, white } from '../utils/colors';

export default function ButtonText({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={[styles.text, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: blue,
        padding: 10,
        paddingLeft: 23,
        paddingRight: 23,
        borderRadius: 5,
        marginTop: 10
    },
    text: {
        color: white,
        textAlign: 'center'
    }
});