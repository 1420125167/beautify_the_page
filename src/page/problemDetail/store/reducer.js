import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	publisher: {},
	comment: [],
	problem: {}
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_PROBLEM:
			return state.merge({
				publisher: action.publisher,
				comment: action.comment,
				problem: action.problem
			});
		default:
			return state;
	}
}