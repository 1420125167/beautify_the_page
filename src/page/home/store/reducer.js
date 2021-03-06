import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	// problemData: [],
	classData: [],
	newsData: [],
	newsPage: 1,
	newsTotalPage: 1,
	classList: [],
	chapterList: [],
	openKey: [],
});
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_CLASS:
			return state.set('classData', action.classData)
		case actionTypes.LOAD_NEWS:
			return state.merge({
				newsData: action.newsData,
				newsTotalPage: action.newsTotalPage,
			})
		// case actionTypes.LOAD_PROBLEM:
		// 	return state.set('problemData', action.problemData);
		case actionTypes.CHANGE_PAGE:
			return state.set('newsPage', action.page)
		case actionTypes.LOAD_HOME_DATA:
			return state.merge({
				newsData: action.newsData,
				classData: action.classData,
				problemData: action.problemData,
				newsTotalPage: action.newsTotalPage,
			})
		case actionTypes.LOAD_CLASS_LIST:
			return state.merge({
				classList: action.classList,
				chapterList: action.chapterList,
			})
		case actionTypes.CHANGE_OPEN:
			return state.set('openKey', action.openKey)
		default:
			return state
	}
}