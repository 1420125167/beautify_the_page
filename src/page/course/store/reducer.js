import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
	classData: [],
	classList: [],
	chapterList: [],
	openKey: [],
})
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_CLASS:
			return state.set('classData', action.classData)
		case actionTypes.CHANGE_PAGE:
			return state.set('newsPage', action.page)
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