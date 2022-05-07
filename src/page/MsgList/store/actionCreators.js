import axios from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

export const changePage = (page) => ({
	type: actionTypes.CHANGE_PAGE,
	page
});
const loadMsg = (data) => ({
	type: actionTypes.LOAD_MSG,
	msg: fromJS(data),
	totalPage: Math.ceil(data.length / 6)
});
export const changeLoad = (page) => ({
	type: actionTypes.CHANGE_LOAD,
	loading: true
	
});
export const deleteMsgData = (id, userid) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/msgdelete/?msgid=' + id + "&userid=" + userid)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(loadMsg(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};

export const loadMsgData = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/msg/?userid=' + id).then((res) => {
			const result = res.data.data;
			if (res.data.success) {
				dispatch(loadMsg(result))
			} else {
				console.log("登录失败");
			}
		})
	}
};