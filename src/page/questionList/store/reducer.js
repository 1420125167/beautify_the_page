import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	question: [],
	page: 1,
	totalPage: 1
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_QUESTION_LIST:
			return state.merge({
				question: action.question,
				totalPage: action.totalPage
			});
		case actionTypes.CHANGE_PAGE:
			return state.set('page', action.page);
		default:
			return state;
	}
}