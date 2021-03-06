import axios from 'axios'
import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

export const changePage = (page) => ({
	type: actionTypes.CHANGE_PAGE,
	page,
})
export const changeOpen = (openKey) => ({
	type: actionTypes.CHANGE_OPEN,
	openKey,
	
})
const getHomeData = (data) => ({
	type: actionTypes.LOAD_HOME_DATA,
	problemData: fromJS(data.problem),
	classData: fromJS(data.class),
	newsData: fromJS(data.news),
	newsTotalPage: Math.ceil(data.news.length / 5),
})

export const loadHomeData = () => {
	return (dispatch) => {
		axios.get('http://localhost:8000/home/')
			.then((res) => {
				const result = res.data.data
				dispatch(getHomeData(result))
			})
	}
}

const getClassList = (data, rootKeys) => ({
	type: actionTypes.LOAD_CLASS_LIST,
	classList: fromJS(data.classlist),
	chapterList: fromJS(data.chapterlist),
})
export const loadClassList = () => {
	return (dispatch) => {
		axios.get('http://localhost:8000/leftmenu/').then((res) => {
			const result = res.data.data
			dispatch(getClassList(result))
		})
	}
}