import axios from 'axios';
import * as actionTypes from './actionTypes';

export const changeCount = (count, like) => ({
	type: actionTypes.CHANGE_COUNT,
	count,
	like,
});
const getCode = (value) => ({
	type: actionTypes.GET_CODE,
	code: value
});
const changeModify = (value) => ({
	type: actionTypes.CHANGE_MODIFY,
	value
});
const changeAlert = (value) => ({
	type: actionTypes.CHANGE_ALERT,
	value
});
export const closeAlert = () => {
	return (dispatch) => {
		dispatch(changeAlert(false))
	}
};
export const modify = (account, password) => {
	return (dispatch) => {
		axios.post('http://localhost:8000/modifypassword/', {
			account,
			password
		}).then((res) => {
			if (res.data.success) {
				if (res.data.modify)
					dispatch(changeModify(res.data.modify));
				else
					dispatch(changeAlert(!res.data.modify));
			} else {
				console.log("登录失败");
			}
		})
	}
};

export const checkCode = (account) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/modifypassword/?phone=' + account)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(getCode(result));
				} else {
					console.log("登录失败");
				}
			})
	}
};