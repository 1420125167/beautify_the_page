import React, {Component} from 'react';
import {List, Row, Col, Pagination} from 'antd';
import {Link} from 'react-router-dom';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {ProblemWrapper, ProblemItem} from './style';
import {actionCreators} from './store';
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header';
import RightContent from '../../common/rightContent';

class QuestionList extends Component {
	render() {
		const {data, page} = this.props;
		const newData = data.toJS(data);
		const list = [];
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
		const question = fromJS(list);
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
									dataSource={question}
									renderItem={item => (
										<Link to={"/questiondetail/" + item.get("id")}>
											<List.Item
												key={item.get("id")}
												style={{marginTop: 20}}
												actions={[<span>{item.get("answer_date")}</span>]}
											>
												<List.Item.Meta
													title={<span>{item.get("answer_title")}</span>}
													description={item.get("answer_content")}
												/>
											</List.Item>
										</Link>
									)}
								/>
							</ProblemItem>
						</ProblemWrapper>
						<div style={{textAlign: 'center', margin: "20 auto"}}>
							<Pagination current={page} pageSize={6} total={newData.length}
													onChange={(page) => this.props.changePage(page)}/>
						</div>
					</Col>
					<Col span={6}>
						<RightContent/>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadQuestionData()
		
	}
}

const mapState = (state) => ({
	data: state.getIn(['questionList', 'question']),
	page: state.getIn(['questionList', 'page']),
	totalPage: state.getIn(['questionList', 'totalPage'])
});
const mapDispatch = (dispatch) => ({
	loadQuestionData() {
		dispatch(actionCreators.loadQuestionData())
	},
	changePage(page) {
		dispatch(actionCreators.changePage(page))
	}
});
export default connect(mapState, mapDispatch)(QuestionList);