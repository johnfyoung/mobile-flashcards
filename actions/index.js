export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

import { storeDeck } from '../utils/api';

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
            })
            .then(() => navigation.navigate("Decks"))
    }
}


export function deleteDeck(deckId) {
    return ({
        type: DELETE_DECK,
        deckId
    });
}

export function addCard({ deckId, card }) {
    return ({
        type: ADD_CARD,
        card,
        deckId
    });
}

