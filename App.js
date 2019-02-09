import React from 'react';
import { View, StatusBar, Platform, Text } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { composeWithDevTools } from 'redux-devtools-extension';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

import rootReducer from './reducers';
import middleware from './middleware';

import { blue, white, grey, lightGrey } from './utils/colors';
import ViewDeckList from './components/ViewDeckList';
import ViewAddDeck from './components/ViewAddDeck';
import ViewDeck from './components/ViewDeck';

//const store = createStore(rootReducer, {}, compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const store = createStore(rootReducer, {}, composeWithDevTools(middleware));

function CACStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: ViewDeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  ViewAddDeck: {
    screen: ViewAddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  },
}, {
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? blue : white,
      inactiveTintColor: Platform.OS === 'ios' ? grey : lightGrey,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : blue,
        shadowColor: 'rgba(0,0,0,.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  });

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  ViewDeck: {
    screen: ViewDeck,
    navigationOptions: ({ navigation }) => ({
      title: "View Deck",
      headerTintColor: white,
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
      },
      headerStyle: {
        backgroundColor: blue
      },
      headerRight: (<View></View>),
    })
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CACStatusBar backgroundColor={blue} barStyle={'light-content'} />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
