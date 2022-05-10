import axios from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

export const changePage = (page) => ({
	type: actionTypes.CHANGE_PAGE,
	page: page
});

const loadProblem = (data) => ({
	type: actionTypes.LOAD_PROBLEM_LIST,
	problem: fromJS(data),
	totalPage: Math.ceil(data.length / 6)
});
export const loadProblemData = () => {
	return (dispatch) => {
		axios.get('http://localhost:8000/problem/')
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					// console.log(result);
					dispatch(loadProblem(result))
				}
			})
	}
};
export const loadSearchData = (searchValue) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/searchsubmit/?searchinput=' + searchValue)
			.then((res) => {
				const result = res.data.data;
				if (res.data.success) {
					// console.log(result);
					dispatch(loadProblem(result))
				}
			})
	}
};