import axios from 'axios';
import {fromJS} from 'immutable';
import * as actionTypes from './actionTypes';

const loadResource = (data) => ({
	type: actionTypes.LOAD_RESOURCE,
	resource: fromJS(data)
});
export const loadResourceData = () => {
	return (dispatch) => {
		axios.get('http://localhost:8000/resource/')
			.then((res) => {
				const result = res.data.data;
				dispatch(loadResource(result))
			})
	}
};
