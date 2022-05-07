import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	title: "",
	date: "",
	img: "",
	content: ""
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_QUESTION:
			return state.merge({
				title: action.title,
				date: action.date,
				img: action.img,
				content: action.content
			});
		default:
			return state;
	}
}