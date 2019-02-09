import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { blue } from '../utils/colors';

export default function TextHeading({ children, style = {} }) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 26,
        color: blue,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});