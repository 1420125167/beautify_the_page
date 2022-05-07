import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	publish: true
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.PUBLISH_PROBLEM:
			return state.set('publish', action.publish);
		default:
			return state;
	}
}