import axios from 'axios';
import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const loadHistory = (data) => ({
	type: actionTypes.LOAD_HISTORY,
	history: fromJS(data)
});
const loadProblem = (data) => ({
	type: actionTypes.LOAD_PROBLEM,
	problem: fromJS(data)
});
export const loadHistoryData = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/my/?userid=' + id)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(loadHistory(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};
export const loadProblemData = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/myproblem/?userid=' + id)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(loadProblem(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};

