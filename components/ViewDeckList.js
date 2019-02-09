import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';

import { fetchDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import isEmpty from '../utils/is-empty';
import { grey, white, blue, lightBlue } from '../utils/colors';

import TextHeading from './TextHeading';

class ViewDeckList extends Component {
    state = {
        ready: false
    }

    componentDidMount() {
        fetchDecks()
            .then((decks) => {
                return this.props.receiveDecks(decks);
            })
            .then(() => this.setState({
                ready: true
            }))
    }

    render() {
        const { decks } = this.props;

        if (this.state.ready === false) {
            return (
                <AppLoading />
            )
        }

        return (
            <View style={styles.container}>
                {
                    isEmpty(decks)
                        ? (
                            <View style={[styles.subContainer, { paddingTop: 30, justifyContent: 'center', alignItems: 'center' }]}>
                                <TextHeading style={{ color: grey, marginBottom: 20 }}>You have no decks.</TextHeading>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Click the "Add Deck" tab to start making decks.</Text>
                            </View>
                        )
                        : (
                            <View style={styles.subContainer}>
                                <TextHeading style={{ backgroundColor: blue, color: white, paddingTop: 30, paddingBottom: 30 }}>Choose a deck:</TextHeading>
                                <FlatList
                                    data={decks}
                                    renderItem={(item) => (
                                        <TouchableOpacity
                                            style={styles.deckCard}
                                            onPress={() => this.props.navigation.navigate(
                                                'ViewDeck',
                                                { deckId: item.item.id }
                                            )}
                                        >
                                            <Text style={styles.cardName}>{item.item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id}
                                >
                                </FlatList>
                            </View>
                        )
                }
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    subContainer: {
        flex: 1
    },
    deckCard: {
        backgroundColor: lightBlue,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        borderWidth: 1,
        borderColor: blue

    },
    cardName: {
        fontSize: 22,
        color: blue,
        textAlign: 'center'
    }
});

function mapStateToProps(decks) {
    return {
        decks: !isEmpty(decks) ? Object.values(decks).sort((a, b) => b.timestamp - a.timestamp) : {}
    }
};

const mapDispatchToProps = dispatch => ({
    receiveDecks: decks => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeckList);
