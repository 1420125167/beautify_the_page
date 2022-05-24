import axios from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes'
import { loadNote } from '../../../common/header/store/actionCreators'

const loadClassDetail = (data, classId) => ({
	type: actionTypes.LOAD_CLASS_DETAIL,
	chapter: fromJS(data.chapter),
	block: fromJS(data.block),
	link: fromJS(data.link),
	extraData: fromJS(data.extraData),
	classId
});
const loadClassNote = (data) => ({
	type: actionTypes.LOAD_CLASS_NOTE,
	note: fromJS(data)
});
export const loadClassDetailData = (classid, chapterid) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/class/?classid=' + classid + "&chapterid=" + chapterid)
			.then((res) => {
				const result = res.data.data;
				dispatch(loadClassDetail(result, classid))
			})
	}
};
export const loadClassNoteData = (userid, classid) => {
	return (dispatch) => {
		axios.get('http://localhost:8000/notebook/?userid=' + userid + '&classid=' + classid).then((res) => {
			const result = res.data.data
			dispatch(loadClassNote(result))
		})
	}
}

export const submitNote = (id, classId, content) => {
	return (dispatch) => {
		axios.defaults.headers = {
			// "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			'Content-Type': 'application/json;charset=UTF-8',
		}
		axios.post('http://localhost:8000/notebook/', {
			user_id: id,
			lesson_id: classId,
			notebook_content: content,
		}).then((res) => {
			if (res.data.success)
				loadNote(id, classId)
		})
	}
}
