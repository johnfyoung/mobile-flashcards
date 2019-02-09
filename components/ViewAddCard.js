import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Header } from 'react-navigation';
import { connect } from 'react-redux';

import { addCardAsync } from '../actions';

import ButtonText from './ButtonText';
import TextHeading from './TextHeading';
import { grey, white } from '../utils/colors';

class ViewAddCard extends Component {
    state = {
        question: '',
        answer: ''
    };

    handleSubmit = () => {
        const card = this.state;
        const { deck, addCard } = this.props;
        addCard({ deck, card, navigation: this.props.navigation })
            .then(() => {
                this.setState({
                    question: '',
                    answer: ''
                })
            });
    };

    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }

    render() {
        const { deck } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Header.HEIGHT + 100}>
                <TextHeading>{deck.name}</TextHeading>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Question:</Text>
                    <TextInput style={styles.textInput} value={this.state.question} onChangeText={(text) => this.handleChange('question', text)} />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Answer:</Text>
                    <TextInput style={styles.textInput} value={this.state.answer} onChangeText={(text) => this.handleChange('answer', text)} />
                </View>
                <ButtonText onPress={this.handleSubmit} buttonStyle={{ alignSelf: 'center' }}>SUBMIT</ButtonText>
            </KeyboardAvoidingView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: white,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'stretch'
    },
    formGroup: {
        marginTop: 12
    },
    label: {
        fontSize: 16,
        color: grey,
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: grey,
        padding: 10
    },

});

const mapDispatchToProps = dispatch => {
    return {
        addCard: ({ deck, card, navigation }) => dispatch(addCardAsync({ deck, card, navigation }))
    }
}

const mapStateToProps = (decks, { navigation }) => ({
    deck: decks[navigation.state.params.deckId]
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewAddCard);