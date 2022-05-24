import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	searchData: [],
	note: {},
	childrenDrawer: false,
	noteNum: 0,
	class: [],
	messageNum: 0
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.SEARCH_DATA:
			return state.set('searchData', action.searchData)
		case actionTypes.GET_NOTE:
			return state.set('note', action.note)
		case actionTypes.SUBMIT_NOTE:
			return state.set('note', action.note)
		case actionTypes.GET_HEADER:
			return state.merge({
				class: action.class,
				messageNum: action.messageNum,
			})
		case actionTypes.CHANGE_NOTE_NUM:
			return state.set('noteNum', action.noteNum)
		case actionTypes.CHANGE_NOTE_VISIBLE:
			return state.set('childrenDrawer', action.childrenDrawer)
		default:
			return state;
	}
}