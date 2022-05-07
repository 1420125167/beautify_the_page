import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	title: "",
	content: "",
	date: "",
	img: ""
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_NEW:
			return state.merge({
				title: action.title,
				content: action.content,
				date: action.date,
				img: action.img
			});
		default:
			return state;
	}
}