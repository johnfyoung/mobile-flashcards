import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux'

import { grey, white, blue } from '../utils/colors';
import TextHeading from './TextHeading';
import ButtonText from './ButtonText';

class ViewDeck extends Component {
    render() {
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <TextHeading style={{ marginTop: 30 }}>{deck.name}</TextHeading>
                    <Text style={styles.subheadText}>{deck.cards.length === 1 ? ('1 Card') : (`${deck.cards.length} Cards`)}</Text>
                </View>
                <View style={styles.buttons}>
                    <ButtonText onPress={() => { Alert.alert('Starting Quiz', '') }}>START QUIZ</ButtonText>
                    <ButtonText onPress={() => { Alert.alert('Add a card', '') }}>Add a card</ButtonText>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-between'
    },
    subheadText: {
        textAlign: 'center',
        fontSize: 20,
        color: grey
    },
    buttons: {
        alignItems: 'center',
        paddingBottom: 30,
    }
});

const mapStateToProps = (decks, { navigation }) => ({
    deck: decks[navigation.state.params.deckId]
})

export default connect(mapStateToProps)(ViewDeck)