import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { getDecks } from '../../utils/api'
import { receiveDecks, addDeck } from '../../actions'
import ListItems from '../list-items'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import DeckInfo from '../deck-info'
import { Constants } from 'expo'

const AppStatusBar = ({ backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class DeckList extends Component {
	constructor(props, context) {
    	super(props, context);
    	this.state = { 
        ready: false 
      }
  	}

	componentDidMount () {
	    const { dispatch } = this.props

	    getDecks()
	      .then((decks) => dispatch(receiveDecks(decks)))
	      .then(() => this.setState(() => ({ready: true})))
    }
    
    _onForward = (title, questions) => {
    	const {navigate} = this.props.navigation;
	    navigate( 'DeckInfo' ,{title, questions})
    }

	render() {
		const { decks } = this.props
		const { ready } = this.state

	    if (ready === false) {
	      return <AppLoading />
	    }

	    let arr = []
	    for(let key in decks){
	    	arr.push(decks[key])
	    }
      
		return ( 
			<ScrollView>
				 {arr.map(
           ({questions, title}) => {
             console.log('QWER', questions, title, 'something', `${title}${arr.length+1}`);
             
              return <TouchableOpacity key={`${title}+${arr.length}`} onPress={(e) => this._onForward(title,questions)}>
                <ListItems 
                  key={title} 
                  title={title} 
                  card_count={questions.length} 
                />
              </TouchableOpacity>}
              )}
      </ScrollView>
    )
	}
}

function mapStateToProps (decks) {
  return {
  	decks
  }
}

export default connect(mapStateToProps)(DeckList)