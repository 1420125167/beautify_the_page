import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
	initLoading: false,
	loading: false,
	msg: [],
	page: 1,
	totalPage: 1,
})
export default (state = defaultState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_MSG:
			return state.merge({
				msg: action.msg,
				totalPage: action.totalPage,
			})
		case actionTypes.CHANGE_PAGE:
			return state.set('page', action.page)
		case actionTypes.CHANGE_LOAD:
			return state.set('loading', action.loading)
		default:
			return state
	}
}