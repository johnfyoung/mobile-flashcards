import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { blue, white } from '../utils/colors';

export default function ButtonText({ children, onPress, icon = '', style = {}, buttonStyle = {}, type = '' }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                (type === 'text' ? styles.buttonText : styles.buttonPrimary),
                buttonStyle,
            ]}>
            {icon ? icon : null}
            <Text style={[
                styles.label,
                (type === 'text' ? styles.labelText : styles.labelPrimary),
                style,
                (icon
                    ? {
                        marginLeft: 10
                    }
                    : '')
            ]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        paddingLeft: 28,
        paddingRight: 28,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonPrimary: {
        backgroundColor: blue,
    },
    buttonText: {
        backgroundColor: white,
    },
    label: {
        textAlign: 'center',
        fontSize: 16
    },
    labelPrimary: {
        color: white,
    },
    labelText: {
        color: blue
    }
});