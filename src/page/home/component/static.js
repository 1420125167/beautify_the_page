import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Card, Row, Col, List, Avatar } from 'antd'
import { actionCreators } from '../store'
import './home.css'
import problem from './problem'
import { MailOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu

class HomeSta extends PureComponent {
	render() {
		return (
			<Row gutter={16}>
				<Col className='gutter-row' span={6} offset={1}>
					<img style={{ width: 229, height: 108 }}
							 src={'https://storagecdn.xuetangx.com/public_assets/xuetangx/xuetangX2018/3f4f4e65069d59c139736f07295e2df7.15580847143191.png'}
							 alt={'清华大学'} />
				</Col>
				<Col className='gutter-row' span={6}>
					<img style={{ width: 229, height: 108 }} src={'https://qn-next.xuetangx.com/15740725373067.png?imageslim'}
							 alt={'北京大学'} />
				</Col>
				<Col className='gutter-row' span={6}>
					<img style={{ width: 229, height: 108 }} src={'https://qn-next.xuetangx.com/15735507062765.png?imageslim'}
							 alt={'北京师范大学'} />
				</Col>
				<Col className='gutter-row' span={5}>
					<img style={{ width: 229, height: 108 }} src={'https://qn-next.xuetangx.com/16418109871903.png?imageslim'}
							 alt={'康奈尔大学'} />
				</Col>
			</Row>
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
		dispatch(actionCreators.changeOpen([openKeys[1]]))
	},
})
export default connect(mapState, mapDispatch)(HomeSta)