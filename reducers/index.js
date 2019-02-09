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
            const filtered = Object.keys(state).filter((key) => key !== action.deckId);
            const reduced = filtered.reduce((newState, key) => {
                newState[key] = state[key];
                return newState;
            }, {});
            return reduced;
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