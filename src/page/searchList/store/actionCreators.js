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
	axios.defaults.headers = {
		// "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
		'Content-Type': 'application/json;charset=UTF-8',
	}
	return (dispatch) => {
		axios.post('http://localhost:8000/searchsubmit/', JSON.stringify({
			type,
			keyword,
		})).then((res) => {
			const result = res.data.data
			if (res.data.success) {
				dispatch(LoadSearchList(result))
			} else {
				console.log('登录失败')
			}
		})
	}
};