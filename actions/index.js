import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD } from '../types'

export function receiveDecks (decks) {
	return {
		type: RECEIVE_DECKS,
		decks,
	}
}

export function addDeck (deck) {
	return {
		type: ADD_DECK,
		deck,
	}
}

export function receiveCards (cards) {
	return {
		type: RECEIVE_CARDS,
		cards,
	}
}

export function addCard (card) {
	return {
		type: ADD_CARD,
		card
	}
}
