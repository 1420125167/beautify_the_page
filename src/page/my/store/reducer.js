import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	history: [],
	problem: []
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_HISTORY:
			return state.set('history', action.history);
		case actionTypes.LOAD_PROBLEM:
			return state.set('problem', action.problem);
		default:
			return state;
	}
}