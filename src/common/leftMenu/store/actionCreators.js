import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

// export const changeOpen = (openKey) => ({
// 	type: actionTypes.CHANGE_OPEN,
// 	openKey
//
// });
// const getClassList = (data, rootKeys) => ({
// 	type: actionTypes.LOAD_CLASS_LIST,
// 	classList: fromJS(data.classlist),
// 	chapterList: fromJS(data.chapterlist)
// });
// export const loadClassList = () => {
// 	return (dispatch) => {
// 		axios.get('http://localhost:8000/leftmenu/').then((res) => {
// 			const result = res.data.data;
// 			dispatch(getClassList(result))
// 		})
// 	}
// };
