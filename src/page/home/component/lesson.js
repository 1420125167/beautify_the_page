import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Card, Row, Col, List, Avatar } from 'antd'
import { actionCreators } from '../store'
import './home.css'
import problem from './problem'
import { MailOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu

// const IconText = ({ type, text }) => (
// 	<span>
//     <Icon type={type} style={{ marginRight: 8 }} />
// 		{text}
//   </span>
// )

class Lesson extends PureComponent {
	render() {
		const { problemData, classList, chapterList, onOpenChange, openKey } = this.props
		return (
			<div>
				<Menu
					mode='inline'
					onOpenChange={onOpenChange}
					style={{ width: '100%' }}
					// defaultOpenKeys={[openKey]}
				>
					{
						classList.map((item1) => (
							<SubMenu
								key={item1.get('id')}
								title={<span><MailOutlined /><span>{item1.get('lesson_name')}</span></span>}
							>
								{
									chapterList.map((item) => (
										item.get('lesson_id') === item1.get('id')
											? <Menu.Item key={item.get('id')}>
												<Link
													to={'/classdetail/' + item1.get('id') + '/' + item.get('id')}>{item.get('chapter_name')}</Link>
											</Menu.Item>
											: null
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
		this.props.loadClassList()
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
export default connect(mapState, mapDispatch)(Lesson)