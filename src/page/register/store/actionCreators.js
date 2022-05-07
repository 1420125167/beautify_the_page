import axios from 'axios';
import * as actionTypes from './actionTypes';

export const changeCount = (count, like) => ({
	type: actionTypes.CHANGE_COUNT,
	count,
	like,
});
export const backStep = (step) => ({
	type: actionTypes.BACK_STEP,
	step
});
const registerError = (value) => ({
	type: actionTypes.REGISTER_ERROR,
	registerState: value
});
const getCodeAction = (code) => ({
	type: actionTypes.GET_CODE,
	code
});
const registerSuccess = (step) => ({
	type: actionTypes.CHANGE_SUCCESS,
	step
});
const postUser = (step, phone, pwd, img, nikeName, register) => ({
	type: actionTypes.POST_USER_DATA,
	step,
	phone,
	pwd,
	img,
	nikeName,
	registerState: register
});

export const postUserData = (step, account, pwd, nickname, img) => {
	return (dispatch) => {
		axios.get("http://localhost:8000/register1/?phone=" + account)
			.then((res) => {
					const result = res.data.data;
					if (res.data.success) {
						if (result.register)
							dispatch(postUser(step, account, pwd, img, nickname, result.register));
						else
							dispatch(registerError(result.register))
					}
					
				}
			)
	}
};
export const getCode = (phone) => {
	return (dispatch) => {
		axios.get("http://localhost:8000/register2/?phone=" + phone)
			.then((res) => {
				const result = res.data.data;
				dispatch(getCodeAction(result))
			})
	}
};
export const register = (phone, pwd, img, nickname) => {
	return (dispatch) => {
		axios.post("http://localhost:8000/register3/", {
			user_account: phone,
			user_password: pwd,
			user_img: img,
			user_nickname: nickname
		}).then((res) => {
			console.log(res);
			if (res.data.success)
				dispatch(registerSuccess(2));
		})
	}
};
