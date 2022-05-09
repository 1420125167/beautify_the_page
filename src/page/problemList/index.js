import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import { fromJS } from 'immutable'
import { List, Avatar, Row, Col, Pagination } from 'antd'
import { connect } from 'react-redux'
import { ProblemWrapper, ProblemItem, BottomPageNav } from './style'
import { actionCreators } from './store'
import LeftMenu from '../../common/leftMenu'
import Header from '../../common/header'
import RightContent from '../../common/rightContent'
import { MessageOutlined } from '@ant-design/icons'

// const IconText = ({type, text}) => (
// 	<span>
//     <Icon type={type} style={{marginRight: 8}}/>
// 		{text}
//   </span>
// );

class ProblemList extends PureComponent {
	
	render() {
		const { data, page } = this.props
		const newData = data.toJS(data)
		const list = []
		if (newData.length) {
			if (newData.length >= page * 6) {
				for (let i = (page - 1) * 6; i < page * 6; i++) {
					list.push(newData[i]);
				}
			} else {
				for (let i = (page - 1) * 6; i < newData.length; i++) {
					list.push(newData[i]);
				}
			}
		}
		console.log(list);
		const problem = fromJS(list);
		return (
			<div>
				<Row>
					<Header/>
				</Row>
				<Row>
					<Col span={4}>
						<LeftMenu/>
					</Col>
					<Col span={12} offset={2}>
						<ProblemWrapper>
							<ProblemItem>
								<List
									itemLayout="vertical"
									dataSource={problem}
									renderItem={item => (
										<Link to={'/problemdetail/' + item.get('id')}>
											<List.Item
												actions={[
													// <IconText type='message' text={item.get('comment_num')} />,
													<MessageOutlined style={{ marginRight: 8 }} type={'message'}
																					 text={item.get('comment_num')} />,
													<span>{item.get('problem_date')}</span>]}
												style={{ marginTop: 20 }}>
												<List.Item.Meta
													avatar={<Avatar src={item.getIn(['user', 'user_img'])} />}
													title={<a href='https://ant.design'>{item.getIn(['user', 'user_nickname'])} </a>}
													description={item.get('problem_title')}
												/>
												{item.get('problem_content')}
											</List.Item>
										</Link>
									
									)}
								/>
							</ProblemItem>
						</ProblemWrapper>
						<BottomPageNav>
							<Pagination current={page} pageSize={6} total={newData.length}
													onChange={(page) => this.props.changePage(page)}/>
						</BottomPageNav>
					</Col>
					<Col span={6}>
						<RightContent/>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		const searchValue = this.props.match.params.search;
		if (searchValue)
			this.props.loadSearchData(searchValue);
		else
			this.props.loadProblemData()
	}
}

const mapState = (state) => ({
	data: state.getIn(['problemList', 'problem']),
	page: state.getIn(['problemList', 'page']),
	totalPage: state.getIn(['problemList', 'totalPage'])
});
const mapDispatch = (dispatch) => ({
	loadProblemData() {
		dispatch(actionCreators.loadProblemData());
	},
	changePage(page) {
		dispatch(actionCreators.changePage(page));
	},
	loadSearchData(searchValue) {
		dispatch(actionCreators.loadSearchData(searchValue));
	}
});
export default connect(mapState, mapDispatch)(ProblemList);