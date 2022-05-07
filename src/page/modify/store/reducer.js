import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	modify: false,
	alert: false,
	count: 60,
	like: true,
	code: ""
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.GET_CODE:
			return state.set('code', action.code);
		case actionTypes.CHANGE_MODIFY:
			return state.set('modify', action.value);
		case actionTypes.CHANGE_ALERT:
			return state.set('alert', action.value);
		case actionTypes.CHANGE_COUNT:
			return state.merge({
				count: action.count,
				like: action.like
			});
		default:
			return state;
	}
}