import axios from 'axios';
import * as actionTypes from './actionTypes';

const changePublish = (value) => ({
	type: actionTypes.PUBLISH_PROBLEM,
	publish: value
});
export const publish = (img, title, desc, id, score) => {
	return (dispatch) => {
		axios.post('http://localhost:8000/publish/', {
			user_id: id,
			problem_title: title,
			problem_content: desc,
			problem_img1: img[0],
			problem_img2: img[1],
			problem_img3: img[2]
		}).then((res) => {
			const result = res.data;
			if (result.success) {
				console.log(result);
				if (result.publish) {
					dispatch(changePublish(result.publish));
				}
				
			} else {
				console.log("登录失败");
			}
		})
	}
};