import { AsyncStorage } from 'react-native';
import { generateUID } from './helpers';

const DECK_STORAGE_KEY = "MobileFlashCards:decks";

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(results => JSON.parse(results));
}

export function storeDeck(deckName) {
    const key = generateUID();
    const deck = {
        id: key,
        timestamp: Date.now(),
        name: deckName,
        cards: []
    };

    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [key]: deck
    })).then(() => {
        return deck;
    });
}

export function removeDeck(key) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        });
}