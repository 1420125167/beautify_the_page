import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Menu, Icon} from 'antd';
import {actionCreators} from './store';

const SubMenu = Menu.SubMenu;

class LeftMenu extends PureComponent {
	
	render() {
		const {classList, chapterList, onOpenChange, openKey} = this.props;
		return (
			<div>
				<Menu
					mode="inline"
					onOpenChange={onOpenChange}
					style={{width: "100%"}}
					// defaultOpenKeys={[openKey]}
				>
					{
						classList.map((item1) => (
							<SubMenu
								key={item1.get('id')}
								title={<span><Icon type="mail"/><span>{item1.get('lesson_name')}</span></span>}
							>
								{
									chapterList.map((item) => (
										item.get('lesson_id') === item1.get('id') ?
											
											<Menu.Item key={item.get('id')}>
												<Link
													to={"/classdetail/" + item1.get('id') + "/" + item.get('id')}>{item.get('chapter_name')}</Link>
											</Menu.Item>
											
											:
											null
									))
								}
							</SubMenu>
						))
					}
				</Menu>
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
		dispatch(actionCreators.loadClassList());
	},
	onOpenChange(openKeys) {
		//if(openKeys.length>1)
		//console.log(openKeys);
		dispatch(actionCreators.changeOpen([openKeys[1]]));
		//else dispatch(actionCreators.changeOpen([]));
	}
});
export default connect(mapState, mapDispatch)(LeftMenu);