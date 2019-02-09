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
                <View>
                    <Text style={styles.label}>What is the name of this deck?</Text>
                    <TextInput style={styles.textInput} value={this.state.deckName} onChangeText={(text) => this.handleChange(text)} />
                    <ButtonText onPress={this.handleSubmit}>SUBMIT</ButtonText>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: white
    },
    label: {
        fontSize: 16,
        color: grey
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    textInput: {
        borderWidth: 1,
        borderColor: grey,
        padding: 10
    },

});

const mapDispatchToProps = dispatch => {
    return {
        addDeck: (deck) => dispatch(addDeckAsync(deck))
    }
}

export default connect(null, mapDispatchToProps)(ViewAddDeck);