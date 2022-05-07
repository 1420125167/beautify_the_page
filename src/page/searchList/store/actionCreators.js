import axios from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

export const changePage = (page) => ({
	type: actionTypes.CHANGE_PAGE,
	page: page
});
const LoadSearchList = (data) => ({
	type: actionTypes.LOAD_SEARCH_LIST,
	search: fromJS(data),
	totalPage: Math.ceil(data.length / 6)
});

export const loadSearchListData = (type, keyword) => {
	return (dispatch) => {
		axios.post('http://localhost:8000/searchsubmit/', {
			type,
			keyword
		}).then((res) => {
			const result = res.data.data;
			if (res.data.success) {
				dispatch(LoadSearchList(result))
			} else {
				console.log("登录失败");
			}
		})
	}
};