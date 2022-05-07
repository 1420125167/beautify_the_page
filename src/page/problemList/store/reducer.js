import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	problem: [],
	page: 1,
	totalPage: 1
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_PROBLEM_LIST:
			return state.merge({
				problem: action.problem,
				totalPage: action.totalPage
			});
		case actionTypes.CHANGE_PAGE:
			return state.set('page', action.page);
		default:
			return state;
	}
}