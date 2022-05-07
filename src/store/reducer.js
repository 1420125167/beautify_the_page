import {combineReducers} from 'redux-immutable';
import {reducer as loginReducer} from '../page/login/store';
import {reducer as registerReducer} from '../page/register/store';
import {reducer as homeReducer} from '../page/home/store';
import {reducer as headerReducer} from '../common/header/store';
import {reducer as newDetailReducer} from '../page/newDetail/store';
import {reducer as msgListReducer} from '../page/MsgList/store';
import {reducer as leftMenuReducer} from '../common/leftMenu/store';
import {reducer as myReducer} from '../page/my/store';
import {reducer as problemListReducer} from '../page/problemList/store';
import {reducer as problemDetailReducer} from '../page/problemDetail/store';
import {reducer as questionDetailReducer} from '../page/questionDetail/store';
import {reducer as questionListReducer} from '../page/questionList/store';
import {reducer as classDetailReducer} from '../page/classDetail/store';
import {reducer as modifyReducer} from '../page/modify/store';
import {reducer as resourceReducer} from '../page/resource/store';
import {reducer as searchListReducer} from '../page/searchList/store';

const reducer = combineReducers({
	home: homeReducer,
	header: headerReducer,
	login: loginReducer,
	register: registerReducer,
	newsDetail: newDetailReducer,
	msgList: msgListReducer,
	my: myReducer,
	modify: modifyReducer,
	problemList: problemListReducer,
	problemDetail: problemDetailReducer,
	questionDetail: questionDetailReducer,
	classDetail: classDetailReducer,
	questionList: questionListReducer,
	leftMenu: leftMenuReducer,
	resource: resourceReducer,
	searchList: searchListReducer
});
export default reducer;