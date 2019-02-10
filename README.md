# Mobile Flashcards
A flash card app for iOS and Android buit with React Native.

This app allowed users to create decks of flash cards that can be presented in a self-graded quiz. A study reminder notification will pop up at 5pm every day.

All data is stored locally on the phone.

## Testing

This app was tested on:

* Samsung Galaxy S7, Android 8.0.0 (actual device)  
  All features are working.
* Google Pixel 2, Android 8.0.0 (emulation, Android Studio)  
  All features are working.
* iPhone XR, (emulation, iPhone simulator)
  Can't get notification to work. The emulator returns permissions back as 'undetermined'. [This is a known issue with expo](https://github.com/expo/expo/issues/516).
  
## Specs

* Use create-react-native-app
* Allow users to create a deck which can hold an unlimited number of cards.
* Allow users to add a card to a specific deck.
* The front of the card should display the question.
* The back of the card should display the answer.
* Users should be able to quiz themselves on a specific deck and receive a score once they're done.
* Users should receive a notification to remind themselves to study if they haven't already for that day.

## Views

* Deck List View (Default View)
  * displays the title of each Deck
  * displays the number of cards in each deck

* Individual Deck View
  * displays the title of the Deck
  * displays the number of cards in the deck
  * displays an option to start a quiz on this specific deck
  * An option to add a new question to the deck

* Quiz View
  * displays a card question
  * an option to view the answer (flips the card)
  * a "Correct" button
  * an "Incorrect" button
  * the number of cards left in the quiz
  * Displays the percentage correct once the quiz is complete

* New Deck View
  * An option to enter in the title for the new deck
  * An option to submit the new deck title

* New Question View
  * An option to enter in the question
  * An option to enter in the answer
  * An option to submit the new question