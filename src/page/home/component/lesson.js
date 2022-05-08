import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon, Card } from 'antd'
import { actionCreators } from '../store'

const SubMenu = Menu.SubMenu

class Lesson extends PureComponent {
	render() {
		const { classList, chapterList, classId, classDetail } = this.props
		const { Meta } = Card
		return (
			// <div>fuck</div>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
			>
				<Meta title='Europe Street beat' description='www.instagram.com' />
			</Card>
		)
	}
}

const mapState = (state) => ({
	classList: state.getIn(['home', 'classList']),
	chapterList: state.getIn(['home', 'chapterList']),
	nowClass: state.getIn(['classDetail', 'classId']),
	openKey: state.getIn(['home', 'openKey']),
})
const mapDispatch = (dispatch) => ({
	loadClassList() {
		dispatch(actionCreators.loadClassList())
	},
	onOpenChange(openKeys) {
		//if(openKeys.length>1)
		//console.log(openKeys);
		dispatch(actionCreators.changeOpen([openKeys[1]]))
		//else dispatch(actionCreators.changeOpen([]));
	},
})
export default connect(mapState, mapDispatch)(Lesson)