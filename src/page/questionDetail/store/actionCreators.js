import axios from 'axios';
import * as actionTypes from './actionTypes';

const loadQuestion = (data) => ({
	type: actionTypes.LOAD_QUESTION,
	title: data.answer_title,
	date: data.answer_date,
	img: data.answer_img,
	content: data.answer_content
});

export const loadQuestionData = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/question/?id=' + id)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					dispatch(loadQuestion(result))
				} else {
					console.log("登录失败");
				}
			})
	}
};