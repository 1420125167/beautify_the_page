import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	step: 0,
	code: "",
	phone: "",
	pwd: "",
	img: "",
	nikeName: "",
	count: 60,
	like: true,
	registerState: true
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.BACK_STEP:
			return state.set('step', action.step);
		case actionTypes.GET_CODE:
			return state.set('code', action.code);
		case actionTypes.REGISTER_ERROR:
			return state.set('registerState', action.registerState);
		case actionTypes.CHANGE_SUCCESS:
			return state.set('step', action.step);
		case actionTypes.POST_USER_DATA:
			return state.merge({
				step: action.step,
				phone: action.phone,
				nikeName: action.nikeName,
				pwd: action.pwd,
				img: action.img,
				registerState: action.registerState
			});
		case actionTypes.CHANGE_COUNT:
			return state.merge({
				count: action.count,
				like: action.like
			});
		default:
			return state;
	}
}