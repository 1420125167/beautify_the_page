import React, { Component, PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Row, Col, Progress, Popconfirm } from 'antd'
import { actionCreators } from '../store'
import { History, HistoryHead, MyProblem, ProblemHead, ProblemItem } from '../style'
import { List } from 'antd'
import { Divider } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { MessageOutlined } from '@ant-design/icons'
import Modify from '../../modify'

const { Meta } = Card

class HomeCol extends Component {
	render() {
		const { history, problem, img, phone, name } = this.props
		const current = this.props.current
		if (current === '1') {
			return (
				<History>
					<HistoryHead>历史记录</HistoryHead>
					<List itemLayout='vertical'
								size='large'
								dataSource={history}
								renderItem={item => (
									<List.Item
										key={item.get('id')}
										actions={<span>{item.get('history_date')}</span>}
										extra={<Progress type='circle'
																		 percent={Math.ceil((
																			 parseInt(item.get('chapter_num')) /
																			 parseInt(item.get('chapter_sum'))
																		 ) * 100)} width={58} />}
									>
										<List.Item.Meta
											avatar={<Avatar src={item.get('lesson_img')} size={58} />}
											title={<span>{item.get('lesson_name')}</span>}
											description={item.get('chapter_name')}
										/>
										<Divider>{item.get('history_date')}</Divider>
									</List.Item>
								)}
					/>
				</History>
			)
		}
		if (current === '2') {
			return (
				<MyProblem>
					<ProblemHead>我的提问</ProblemHead>
					<ProblemItem>
						<List
							pagination={true}
							itemLayout='vertical'
							dataSource={problem}
							renderItem={item => (
								<List.Item
									actions={[
										// <IconText type="message" text={item.get("comment_num")}/>,
										<MessageOutlined style={{ marginRight: 8 }} type='message' text={item.get('comment_num')} />,
										<span>{item.get('problem_date')}</span>]}
									style={{ marginTop: 20 }}>
									<List.Item.Meta
										avatar={<Avatar src={item.getIn(['user', 'img'])} />}
										title={<a href='https://ant.design'>{item.getIn(['user', 'name'])} </a>}
										description={item.get('problem_title')}
									/>
									{item.get('problem_content')}
									<p
										style={{ float: 'right', cursor: 'pointer' }}
										// onClick={()=>this.props.deleteProblem(item.get('id'),this.props.id)}
									>
										<Popconfirm
											title='确定删除吗?'
											onConfirm={() => this.confirm(item.get('id'), this.props.id)}
											onCancel={this.cancel}
											okText='Yes'
											cancelText='No'
										>
											删除
										</Popconfirm>
									
									</p>
								</List.Item>
							)}
						/>
					</ProblemItem>
				</MyProblem>
			)
		}
		if (current === '3') {
			return (
				<Modify />
			)
		}
	}
	
	componentDidMount() {
		this.props.loadHistoryData(this.props.id)
		this.props.loadProblemData(this.props.id)
	}
}

const mapState = (state) => ({
	classData: state.getIn(['home', 'classData']),
	img: state.getIn(['login', 'img']),
	name: state.getIn(['login', 'name']),
	history: state.getIn(['my', 'history']),
	problem: state.getIn(['my', 'problem']),
	id: state.getIn(['login', 'id']),
	phone: state.getIn(['login', 'phone']),
})
const mapDispatch = (dispatch) => ({
	loadHistoryData(id) {
		if (id)
			dispatch(actionCreators.loadHistoryData(id))
	},
	loadProblemData(id) {
		if (id)
			dispatch(actionCreators.loadProblemData(id))
	},
})
export default connect(mapState, mapDispatch)(HomeCol)

