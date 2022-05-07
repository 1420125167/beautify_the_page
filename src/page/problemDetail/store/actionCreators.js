import axios from 'axios';
import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const getProblem = (data) => ({
	type: actionTypes.LOAD_PROBLEM,
	publisher: fromJS(data.publisher),
	comment: fromJS(data.comment),
	problem: fromJS(data.problem)
});
export const submitComment = (comment, userId, problemId) => {
	return (dispatch) => {
		axios.post('http://localhost:8000/submitcomment/', {
			comment_content: comment,
			comment_to: problemId,
			user_id: userId
		})
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(getProblem(result));
				} else {
					console.log("登录失败");
				}
			})
	}
};
export const loadProblem = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/problemdetail/?id=' + id)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(getProblem(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};
export const changePraise = (praise, commentId, userId) => {
	return (dispatch) => {
		axios.get('/api/problem?id=')
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(getProblem(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};