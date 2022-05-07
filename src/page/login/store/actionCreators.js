import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeLogin = (data, phone) => ({
	type: actionTypes.CHANGE_LOGIN,
	value: true,
	id: data.id,
	name: data.user_nickname,
	img: data.user_img,
	score: data.user_score,
	phone
});
const changeLogout = () => ({
	type: actionTypes.CHANGE_LOGOUT,
	value: false,
	id: '',
	name: '',
	img: '',
	score: '',
	phone: ''
});
const changeAlert = (value) => ({
	type: actionTypes.CHANGE_ALERT,
	value
});

const changeScoreData = (score) => ({
	type: actionTypes.CHANGE_SCORE,
	score
});
export const changeImg = (img) => ({
	type: actionTypes.CHANGE_IMG,
	img
});
export const changeScore = (userId, score) => {
	return (dispatch) => {
		axios.post("http://localhost:8000/changescore/", {
			userid: userId,
			score: score
		}).then((res) => {
			const result = res.data.data;
			if (res.data.success) {
				dispatch(changeScoreData(score))
			}
		})
	}
};
export const logout = () => {
	return (dispatch) => {
		dispatch(changeLogout())
	}
};
export const closeAlert = () => {
	return (dispatch) => {
		dispatch(changeAlert(false))
	}
};
export const login = (account, password) => {
	return (dispatch) => {
		axios.post('http://localhost:8000/login/', {
			account,
			password
		}).then((res) => {
			const result = res.data.data;
			if (res.data.success) {
				if (res.data.login)
					dispatch(changeLogin(result, account));
				else
					dispatch(changeAlert(!res.data.login));
			} else {
				console.log("登录失败");
			}
		})
	}
};