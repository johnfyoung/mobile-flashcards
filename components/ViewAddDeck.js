import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addDeckAsync } from '../actions';

import ButtonText from './ButtonText';
import TextHeading from './TextHeading';
import { grey, white } from '../utils/colors';

class ViewAddDeck extends Component {
    state = {
        deckName: ''
    };

    handleSubmit = () => {
        const { deckName } = this.state;
        this.props.addDeck({ deckName, navigation: this.props.navigation });
        this.setState({
            deckName: ''
        })
    };

    handleChange = (t) => {
        this.setState({
            deckName: t
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextHeading>Add Deck</TextHeading>
                <View style={styles.subContainer}>
                    <Text style={styles.label}>What is the name of this deck?</Text>
                    <TextInput style={styles.textInput} value={this.state.deckName} onChangeText={(text) => this.handleChange(text)} />
                    <ButtonText onPress={this.handleSubmit} buttonStyle={{ alignSelf: 'center', marginTop: 30 }}>SUBMIT</ButtonText>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: white
    },
    label: {
        fontSize: 16,
        color: grey,
        marginBottom: 10,
    },
    subContainer: {
        flex: 1,
        alignItems: 'stretch',
        paddingLeft: 30,
        paddingRight: 30
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: grey,
    },

});

const mapDispatchToProps = dispatch => {
    return {
        addDeck: (deck) => dispatch(addDeckAsync(deck))
    }
}

export default connect(null, mapDispatchToProps)(ViewAddDeck);