import { AsyncStorage } from 'react-native';
import { generateUID } from './helpers';

const DECK_STORAGE_KEY = "MobileFlashCards:decks";

export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function submitDeck(deck) {
    const key = generateUID();
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [key]: deck
    }));
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