import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	resource: []
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_RESOURCE:
			return state.set("resource", action.resource);
		default:
			return state;
	}
}