import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	classList: [],
	chapterList: [],
	openKey: []
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_CLASS_LIST:
			return state.merge({
				classList: action.classList,
				chapterList: action.chapterList
			});
		case actionTypes.CHANGE_OPEN:
			return state.set('openKey', action.openKey);
		default:
			return state;
	}
}