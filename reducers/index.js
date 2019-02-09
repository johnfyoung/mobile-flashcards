import {
    RECEIVE_DECKS,
    ADD_DECK,
    DELETE_DECK,
    ADD_CARD
} from '../actions';

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck
            };
        case DELETE_DECK:
            return Object.keys(state).reduce((accum, curr) => (curr === accum.deckId ? accum[curr] = state[curr] : null), {});
        case ADD_CARD:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    cards: state[action.deckId].cards.concat(action.card)
                }
            };
        default:
            return state;
    }
}