import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Icon} from 'antd';
import { actionCreators } from './store'
import App from './component/leftmenu'

const SubMenu = Menu.SubMenu;

class LeftMenu extends PureComponent {
	
	render() {
		return (
			<div>
				<App />
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadClassList();
	}
	
}

const mapState = (state) => ({
	classList: state.getIn(['leftMenu', 'classList']),
	chapterList: state.getIn(['leftMenu', 'chapterList']),
	nowClass: state.getIn(['classDetail', 'classId']),
	openKey: state.getIn(['leftMenu', 'openKey']),
});
const mapDispatch = (dispatch) => ({
	loadClassList() {
		// dispatch(actionCreators.loadClassList());
	},
	onOpenChange(openKeys) {
		//if(openKeys.length>1)
		//console.log(openKeys);
		// dispatch(actionCreators.changeOpen([openKeys[1]]));
		//else dispatch(actionCreators.changeOpen([]));
	}
});
export default connect(mapState, mapDispatch)(LeftMenu);