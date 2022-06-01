import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { fromJS } from 'immutable'
import { List, Avatar, Row, Col, Pagination, Menu } from 'antd'
import { connect } from 'react-redux'
import { ProblemWrapper, ProblemItem, BottomPageNav } from './style'
import { actionCreators } from './store'
import LeftMenu from '../../common/leftMenu'
import Header from '../../common/header'
import RightContent from '../../common/rightContent'
import { MailOutlined, MessageOutlined } from '@ant-design/icons'
import Bottom from '../../common/bottom'

// const IconText = ({type, text}) => (
// 	<span>
//     <Icon type={type} style={{marginRight: 8}}/>
// 		{text}
//   </span>
// );
const SubMenu = Menu.SubMenu

class Course extends PureComponent {
	render() {
		const { problemData, classList, chapterList, onOpenChange, openKey } = this.props
		return (
			<div>
				<Row>
					<Header />
				</Row>
				<Row>
					<Col span={4}>
						<LeftMenu />
					</Col>
					<Col span={12} offset={2}>
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
						{/*<ProblemWrapper>*/}
						{/*	<ProblemItem>*/}
						{/*		<List*/}
						{/*			itemLayout='vertical'*/}
						{/*			// dataSource={searchResults}*/}
						{/*			renderItem={item => (*/}
						{/*				<Link to={'/course' + item.get('lesson_id')}>*/}
						{/*					<List.Item*/}
						{/*						key={item.get('id')}*/}
						{/*						style={{ marginTop: 20 }}*/}
						{/*					>*/}
						{/*						<List.Item.Meta*/}
						{/*							title={<span>{item.get('chapter_name')}</span>}*/}
						{/*							description={item.get('chapter_intro')}*/}
						{/*						/>*/}
						{/*					</List.Item>*/}
						{/*				</Link>*/}
						{/*			)}*/}
						{/*		/>*/}
						{/*	</ProblemItem>*/}
						{/*</ProblemWrapper>*/}
					</Col>
					<Col span={6}>
						<RightContent />
					</Col>
				</Row>
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
export default connect(mapState, mapDispatch)(Course)