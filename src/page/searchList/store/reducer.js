import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	search: [],
	page: 1,
	totalPage: 1
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_SEARCH_LIST:
			return state.merge({
				search: action.search,
				totalPage: action.totalPage
			});
		case actionTypes.CHANGE_PAGE:
			return state.set('page', action.page);
		default:
			return state;
	}
}