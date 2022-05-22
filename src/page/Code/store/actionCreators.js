import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

export const changePage = (page) => ({
	type: actionTypes.CHANGE_PAGE,
	page,
})
export const changeLoad = (page) => ({
	type: actionTypes.CHANGE_LOAD,
	loading: true,
	
})


