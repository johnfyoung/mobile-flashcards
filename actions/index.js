export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

import { storeDeck, updateDeck, removeDeck } from '../utils/api';

export function receiveDecks(decks) {
    return ({
        type: RECEIVE_DECKS,
        decks
    });
}

function addDeck(deck) {
    return ({
        type: ADD_DECK,
        deck
    });
}

export function addDeckAsync({ deckName, navigation }) {
    return function (dispatch) {
        return storeDeck(deckName)
            .then((deck) => {
                dispatch(addDeck(deck));

                return deck;
            })
            .then((deck) => navigation.navigate({
                routeName: "ViewDeck",
                params: {
                    deckId: deck.id
                }
            }));
    }
}


export function deleteDeck(deckId) {
    return ({
        type: DELETE_DECK,
        deckId
    });
}

export function deleteDeckAsync({ deckId, navigation }) {
    return function (dispatch) {
        navigation.navigate("Decks");
        return removeDeck(deckId)
            .then(() => {
                dispatch(deleteDeck(deckId));
            })
    }
}

export function addCard({ deckId, card }) {
    return ({
        type: ADD_CARD,
        card,
        deckId
    });
}

export function addCardAsync({ deck, card, navigation }) {
    //let modDeck = { ...deck };
    let modDeck = Object.assign({}, deck);
    modDeck.cards = deck.cards.concat(card);

    return function (dispatch) {
        return updateDeck(modDeck)
            .then((deck) => {
                const deckId = deck.id
                dispatch(addCard({ deckId, card }));
            })
            .then(() => navigation.goBack())
    }
}

