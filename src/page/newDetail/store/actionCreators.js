import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeNew = (data) => ({
	type: actionTypes.CHANGE_NEW,
	title: data.news_title,
	content: data.news_content,
	date: data.news_date,
	img: data.news_img
});

export const changeNewsData = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/news?id=' + id)
			.then((res) => {
				const result = res.data.data;
				console.log(result);
				if (res.data.success) {
					dispatch(changeNew(result));
				} else {
					console.log("登录失败");
				}
			})
	}
};