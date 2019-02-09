import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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
        addCard({ deck, card, navigation: this.props.navigation });
        this.setState({
            question: '',
            answer: ''
        })
    };

    handleChange = (field, text) => {
        this.setState({
            [field]: text
        });
    }

    render() {
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                <TextHeading>{deck.name}</TextHeading>
                <View>
                    <View>
                        <Text style={styles.label}>Question:</Text>
                        <TextInput style={styles.textInput} value={this.state.question} onChangeText={(text) => this.handleChange('question', text)} />
                    </View>
                    <View>
                        <Text style={styles.label}>Answer:</Text>
                        <TextInput style={styles.textInput} value={this.state.answer} onChangeText={(text) => this.handleChange('answer', text)} />
                    </View>
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
        addCard: ({ deck, card, navigation }) => dispatch(addCardAsync({ deck, card, navigation }))
    }
}

const mapStateToProps = (decks, { navigation }) => ({
    deck: decks[navigation.state.params.deckId]
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewAddCard);