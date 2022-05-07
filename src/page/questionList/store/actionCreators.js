import axios from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

export const changePage = (page) => ({
	type: actionTypes.CHANGE_PAGE,
	page: page
});
const LoadQuestion = (data) => ({
	type: actionTypes.LOAD_QUESTION_LIST,
	question: fromJS(data),
	totalPage: Math.ceil(data.length / 6)
});

export const loadQuestionData = () => {
	return (dispatch) => {
		axios.get('http://localhost:8000/questionlist')
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(LoadQuestion(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};