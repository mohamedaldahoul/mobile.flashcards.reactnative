import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {  createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { Ionicons, FontAwesome} from '@expo/vector-icons'



import DeckList from './components/deck-list'
import AddDeck from './components/add-deck'
import DeckInfo from './components/deck-info'
import AddCard from './components/add-card'
import Quiz from './components/quiz'
import reducer from './reducers'
import { purple, white } from './utils/colors'

const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Deck list view',
      tabBarLabel: 'View decks',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add deck',
      tabBarLabel: 'Add new deck',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='plus-square' size={30} color={tintColor} />
      )
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
        width: 0,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const Tabs = Platform.OS === 'ios'
? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createStackNavigator({
  home: {
    screen: TabsContainer,
    navigationOptions: {
      title: 'Decks',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  DeckInfo: {
    screen: DeckInfo,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({ navigation }) => ({
      title: 'Add new card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }),
  },
})

const MainContainer = createAppContainer(MainNavigator)

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <MainContainer />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
