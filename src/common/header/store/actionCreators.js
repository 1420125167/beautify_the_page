import axios from 'axios';
import * as actionTypes from './actionTypes';
import {fromJS} from 'immutable';

const getSearchInfo = (data) => ({
	type: actionTypes.SEARCH_DATA,
	searchData: fromJS(data)
});
const getSearchSubmit = (data) => ({
	type: actionTypes.SEARCH_SUBMIT,
	searchData: fromJS(data)
});
const getNote = (data) => ({
	type: actionTypes.GET_NOTE,
	note: fromJS(data)
});
const getHeader = (data) => ({
	type: actionTypes.GET_HEADER,
	class: fromJS(data.class),
	messageNum: data.messageNum
});
export const changeNoteNum = (id) => ({
	type: actionTypes.CHANGE_NOTE_NUM,
	noteNum: id
});

export const searchInfo = (value) => {
	return (dispatch) => {
		axios.defaults.headers = {
			// "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			'Content-Type': 'application/json;charset=UTF-8',
		};
		axios.get('http://localhost:8000/searchinfo/?searchinfo=' + value).then((res) => {
			const result = res.data.data;
			dispatch(getSearchInfo(result))
		})
	}
};
export const searchSubmit = (value) => {
	return (dispatch) => {
		axios.defaults.headers = {
			// "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			'Content-Type': 'application/json;charset=UTF-8',
		}
		axios.get('http://localhost:8000/searchinfo/?searchinfo=' + value).then((res) => {
			const result = res.data.data
			dispatch(getSearchSubmit(result))
		})
	}
};
export const loadHeader = (id) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/header?userid=' + id).then((res) => {
			const result = res.data.data;
			dispatch(getHeader(result))
		})
	}
};
export const loadNote = (id, classId) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/notebook/?userid=' + id + "&classid=" + classId).then((res) => {
			const result = res.data.data;
			dispatch(getNote(result));
		})
	}
};

export const submitNote = (id, classId, content) => {
	return (dispatch) => {
		axios.post('http://localhost:8000/notebook/', {
			user_id: id,
			lesson_id: classId,
			notebook_content: content
		}).then((res) => {
			if (res.data.success)
				loadNote(id, classId)
		})
	}
};

