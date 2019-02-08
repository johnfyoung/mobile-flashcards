import {
    RECEIVE_DECKS,
    ADD_DECK,
    DELETE_DECK,
    ADD_CARD
} from '../actions';

export function decks(state, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return action.decks;
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };
        case DELETE_DECK:
            return Object.keys(state).reduce((accum, curr) => (curr === accum.deckId ? accum[curr] = state[curr] : null), {});
        case ADD_CARD:
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: state[deckId].cards.concat(card)
                }
            };
    }
}