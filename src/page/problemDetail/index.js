import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Comment, Avatar, Row, Col, message, Card } from 'antd'
import { Form, Button, Input } from 'antd'
import { ProblemWrapper, CommentWrapper } from './style'
import LeftMenu from '../../common/leftMenu'
import Header from '../../common/header'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../login/store'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons'

const TextArea = Input.TextArea
// const IconText = ({type, text}) => (
// 	<span>
//     <Icon type={type} style={{marginRight: 8}}/>
// 		{text}
//   </span>
// );

class ProblemDetail extends PureComponent {
	render() {
		const { comment, userName, userImg, problem, publisher, id, score } = this.props
		return (
			<div>
				<Row>
					<Header />
				</Row>
				<Row>
					<Col span={4}>
						<LeftMenu/>
					</Col>
					<Col span={12} offset={2}>
						<ProblemWrapper>
							<div>
								{
									problem ?
										<Comment
											actions={[<span>回复</span>,
												// <IconText type="message" text={problem.get('comment_num')}/>
												<MessageOutlined style={{ marginRight: 8 }} type={'message'}
																				 text={problem.get('comment_num')} />,
											]
											}
											author={<span>{publisher.get('user_nickname')}</span>}
											datetime={problem.get('date')}
											avatar={(
												<Avatar
													src={publisher.get('user_img')}
													alt={publisher.get('user_nickname')}
												/>
											)}
											content={
												<div>
													<h2>{problem.get('problem_title')}</h2>
													<p>{problem.get('problem_content')}</p>
												</div>
											}
										>
											{
												problem.get('problem_img1') ?
													<Card
														hoverable
														style={{width: 240}}
														cover={<img src={problem.get('problem_img1')}/>}
													/> : ""
											}
											{
												problem.get('problem_img2') ?
													<Card
														hoverable
														style={{width: 240}}
														cover={<img src={problem.get('problem_img2')}/>}
													/> : ""
											}
											{
												problem.get('problem_img3') ?
													<Card
														hoverable
														style={{width: 240}}
														cover={<img src={problem.get('problem_img3')}/>}
													/> : ""
											}
											<CommentWrapper>
												{
													comment ?
														comment.map((item) => (
															<Comment
																actions={[<span
																	// onClick={() => this.props.changePraise(item.get('id'), this.props.match.params.id)}>
																	//                                           <Icon type="like-o"
																	// 																								style={{marginRight: 8}}/>{item.get('comment_agree')}</span>,
																	onClick={() => this.props.changePraise(item.get('id'), this.props.match.params.id)}>
                                                                            <LikeOutlined
																																							style={{ marginRight: 8 }} />{item.get('comment_agree')}</span>,
																	<span>{item.get('date')}</span>]}
																author={<span>{item.getIn(['user_name'])}</span>}
																avatar={(
																	<Avatar
																		src={item.getIn(['user_img'])}
																		alt={item.getIn(['user_name'])}
																	/>
																)}
																content={<p>{item.get('comment_content')}</p>}
																key={item.get('id')}
															>
															
															</Comment>
														)) : null
												}
											</CommentWrapper>
										
										</Comment> :
										null
								}
								
								{
									userName ?
										<Comment
											avatar={(
												<Avatar
													src={userName}
													alt={userImg}
												/>
											)}
											content={(
												<div>
													<Form.Item>
														<TextArea rows={4}
																			ref={input => {
																				this.comment = input
																			}}/>
													</Form.Item>
													<Form.Item>
														<Button
															htmlType="submit"
															type="primary"
															onClick={
																() => this.props.submitComment(this.comment, this.props.match.params.id, id, userName, problem.get('problem_title'), score)}
														>
															回复
														</Button>
													</Form.Item>
												</div>
											)}
										/> :
										null
								}
							
							</div>
						</ProblemWrapper>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadProblem(this.props.match.params.id)
	}
	
}

const mapState = (state) => ({
	id: state.getIn(['login', 'id']),
	problem: state.getIn(['problemDetail', 'problem']),
	comment: state.getIn(['problemDetail', 'comment']),
	publisher: state.getIn(['problemDetail', 'publisher']),
	userName: state.getIn(['login', 'name']),
	userImg: state.getIn(['login', 'img']),
	score: state.getIn(['login', 'score']),
});
const mapDispatch = (dispatch) => ({
	loadProblem(id) {
		dispatch(actionCreators.loadProblem(id))
	},
	handleChangePraise(praise, commentId, userId) {
		dispatch(actionCreators.changePraise(praise, commentId, userId))
	},
	submitComment(comment, problemId, userId, userName, problemTitle, score) {
		dispatch(actionCreators.submitComment(comment.resizableTextArea.textArea.value, userId, problemId))
		const content = userName + "回复了你的问题:" + problemTitle + ",快去看看吧";
		axios.post('http://localhost:8000/sendmessage/', {
			user_id: userId,
			message_title: "问题回复",
			message_content: content
		}).then((res) => {
			const result = res.data.data;
			if (res.data.success) {
				if (result.sendMsg) {
					message.success("发布成功");
					dispatch(actionCreators.loadProblem(problemId))
					dispatch(loginActionCreators.changeScore(userId, score + 10))
				} else {
					message.error("发布失败");
				}
			}
		})
	},
	changePraise(commentId, id) {
		console.log(commentId);
		axios.get('http://localhost:8000/praisecomment/?commentid=' + commentId).then((res) => {
			if (res.data.success) {
				message.success("点赞成功");
				dispatch(actionCreators.loadProblem(id));
			}
		})
	}
	
});
export default connect(mapState, mapDispatch)(ProblemDetail);