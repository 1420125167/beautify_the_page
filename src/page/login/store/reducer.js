import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	login: false,
	alert: false,
	id: '',
	name: '',
	img: '',
	score: '',
	phone: ''
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_LOGIN:
			return state.merge({
				login: action.value,
				id: action.id,
				name: action.name,
				img: action.img,
				score: action.score,
				phone: action.phone
			});
		case actionTypes.CHANGE_LOGOUT:
			return state.merge({
				login: action.value,
				id: action.id,
				name: action.name,
				img: action.img,
				score: action.score,
				phone: action.phone
			});
		case actionTypes.CHANGE_ALERT:
			return state.set('alert', action.value);
		case actionTypes.CHANGE_SCORE:
			return state.set('score', action.score);
		case actionTypes.CHANGE_IMG:
			return state.set('img', action.img);
		default:
			return state;
	}
}