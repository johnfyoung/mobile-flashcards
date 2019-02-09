import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { connect } from 'react-redux'

import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { deleteDeckAsync } from '../actions';
import { grey, white, blue } from '../utils/colors';
import TextHeading from './TextHeading';
import ButtonText from './ButtonText';


class ViewDeck extends Component {
    componentDidMount() {
        const { deck, navigation } = this.props;

        if (!deck) {
            navigation.navigate('Decks');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.deck) {
            return false;
        }

        return true;
    }

    render() {
        const { deck, deleteDeck, navigation } = this.props;

        const deckId = deck.id;
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <TextHeading style={{ marginTop: 30 }}>{deck.name}</TextHeading>
                    <Text style={styles.subheadText}>{deck.cards.length === 1 ? ('1 Card') : (`${deck.cards.length} Cards`)}</Text>
                    <ButtonText
                        onPress={() => {
                            navigation.navigate(
                                'ViewAddCard',
                                {
                                    deckId: deckId
                                }
                            )
                        }}
                        style={{
                            alignItems: 'center'
                        }}
                        icon={(<MaterialIcons name='library-add' color={white} size={25} />)}
                    >Add a card</ButtonText>
                    <ButtonText
                        onPress={() => {
                            deleteDeck({ deckId, navigation })
                        }}
                        style={{
                            alignItems: 'center'
                        }}
                        type='text'
                        icon={
                            Platform.OS === 'ios'
                                ? (<Ionicons name='ios-trash' color={blue} size={25} />)
                                : (<Ionicons name='md-trash' color={blue} size={25} />)
                        }
                    >Delete this deck</ButtonText>
                </View>
                <View style={styles.buttons}>
                    {deck.cards.length
                        ? (
                            <ButtonText
                                onPress={() => {
                                    navigation.navigate(
                                        'ViewQuiz',
                                        {
                                            deck: deck
                                        }
                                    )
                                }}
                                style={{
                                    fontSize: 18,
                                    paddingLeft: 1,
                                    paddingRight: 1
                                }}
                            >START QUIZ</ButtonText>
                        )
                        : (
                            <Text>Add some cards to take a quiz!</Text>
                        )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingBottom: 100,
        backgroundColor: white,
        justifyContent: 'space-between'
    },
    subheadText: {
        textAlign: 'center',
        fontSize: 20,
        color: grey,
        marginBottom: 30
    },
    buttons: {
        alignItems: 'center'
    }
});

const mapDispatchToProps = dispatch => ({
    deleteDeck: (info) => dispatch(deleteDeckAsync(info))
});

const mapStateToProps = (decks, { navigation }) => ({
    deck: decks[navigation.state.params.deckId]
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck)