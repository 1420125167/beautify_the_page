import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	chapter: {},
	block: [],
	link: [],
	extraData: [],
	classId: -1,
	note: {}
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_CLASS_DETAIL:
			return state.merge({
				chapter: action.chapter,
				block: action.block,
				link: action.link,
				extraData: action.extraData,
				classId: action.classId
			});
		case actionTypes.LOAD_CLASS_NOTE:
			return state.set("note", action.note);
		default:
			return state;
	}
}