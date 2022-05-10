import React, { PureComponent } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Row, Col, Input, Divider, List, Affix, Drawer, Button, PageHeader, Card, BackTop, Empty } from 'antd'
import { DollarCircleOutlined, BookTwoTone } from '@ant-design/icons'
import { Player } from 'video-react'
import axios from 'axios'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../login/store'
import { actionCreators as headerActionCreators } from '../../common/header/store'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
	ClassDetailWrapper,
	ImgBlock,
	VideoBlock,
	WordBlock,
	CodeBlock,
	CodeInput,
	CodePrint,
	ChapterTitle,
	ChapterDesc,
	BlockWrapper,
	BlockTitle,
	Experiment,
	ExtraData,
} from './style';
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header/index';
import SyntaxHighlighter from 'react-syntax-highlighter';

const {TextArea} = Input;

class ClassDetail extends PureComponent {
	constructor(props) {
		super(props);
		this.formSubmit = this.formSubmit.bind(this);
	}
	
	state = {
		visible: false,
		content: '',
		editorState: ""
	};
	
	start(note) {
		const blocksFromHtml = note.get('notebook_content') ? htmlToDraft(note.get('notebook_content')) : htmlToDraft('');
		const {contentBlocks, entityMap} = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		const editorState = EditorState.createWithContent(contentState);
		this.setState({
			editorState
		})
	}
	
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};
	onClose = () => {
		this.setState({
			visible: false,
		});
	};
	onEditorStateChang = (editorState) => {
		this.setState({
			editorState
		})
	};
	handleClearContent = () => {
		this.setState({
			editorState: ''
		})
	};
	
	formSubmit(userId, note) {
		// 转换成HTML格式
		console.log(this.state.editorState)
		// const editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
		// this.props.submitNote(note.get('id'), userId, this.props.match.params.classid, editorContent);
	}
	
	render() {
		const {block, chapter, link, extraData, score, userId, note} = this.props;
		const {editorState} = this.state;
		const blocksFromHtml = note.get('notebook_content') ? htmlToDraft(note.get('notebook_content')) : htmlToDraft('');
		const {contentBlocks, entityMap} = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		const editorState1 = EditorState.createWithContent(contentState);
		const editor = editorState ? editorState : editorState1;
		return (
			<div key={this.props.match.params.chapterid}>
				<Header/>
				<PageHeader onBack={() => window.history.back()} title="上一页"/>
				<Row type="flex">
					<Col span={4}>
						<LeftMenu/>
					</Col>
					<Col span={14} offset={1}>
						{
							chapter.get("chapter_num") ?
								<ClassDetailWrapper>
									<ChapterTitle>
										{chapter.get("chapter_num") + "." + chapter.get("chapter_name")}
									</ChapterTitle>
									<ChapterDesc dangerouslySetInnerHTML={{__html: chapter.get("chapter_intro")}}>
										{/*{chapter.get("chapter_intro")}*/}
									</ChapterDesc>
									{
										block.map((item, index) => {
											return (
												<BlockWrapper key={index}>
													<Divider orientation="left">
													</Divider>
													<BlockTitle>
														
														{chapter.get("chapter_num") + "." + item.get("block_num") + " " + item.get('block_intro')}
													</BlockTitle>
													
													{item.get("block_video") ?
														<VideoBlock>
															<Player>
																<source src={item.get("block_video")}/>
															</Player>
														</VideoBlock> : null
													}
													{item.get("block_img") ?
														<ImgBlock>
															<img src={item.get("block_img")} alt=""/>
														</ImgBlock> : null
													}
													
													{item.get("block_experiment") ?
														<Experiment>
															<Row type="flex" gutter={20}>
																<Col span={12}>
																	<CodeInput>
																		<TextArea rows={12}/>
																	</CodeInput>
																</Col>
																<Col span={12}>
																	<CodePrint>
																		<TextArea rows={12}/>
																	</CodePrint>
																</Col>
															</Row>
														</Experiment> : null
													}
													{item.get("block_word") ?
														<WordBlock dangerouslySetInnerHTML={{__html: item.get("block_word")}}>
														</WordBlock> : null
													}
													{item.get("block_code") ?
														<CodeBlock>
															<SyntaxHighlighter language='python' style={tomorrowNightEighties} showLineNumbers>
																{item.get("block_code")}
															</SyntaxHighlighter>
														</CodeBlock> : null
													}
												</BlockWrapper>
											)
										})
									}
								</ClassDetailWrapper>
								: <Empty/>
						}
						<ExtraData>
							<Card
								title="相关链接"
								bordered={false}
							>
								<p style={{margin: "10px 0"}}>
									<a href="https://ant.design/components/list-cn/" target="_blank" rel="noopener noreferrer">
										<span>antd:&nbsp;&nbsp;</span>
										<span>https://ant.design/components/list-cn/</span>
									</a>
								</p>
								{
									link.map((item) => {
										return (
											<p key={item.get('id')} onClick={() => this.props.download(score)}>
												
												<Link to={item.get('link_path')}>{item.get('link_name')}</Link>
											</p>
										)
									})
								}
							</Card>
						</ExtraData>
					</Col>
					{
						extraData ? <Col span={4}>
							<ExtraData>
								<Card title="资源下载" style={{width: 300}}>
									<List
										dataSource={extraData}
										renderItem={item => (
											<List.Item
												key={item.get('id')}
												actions={[<span style={{ color: 'yellow' }}><DollarCircleOutlined />10</span>]}
											>
												{
													score >= 10 ?
														<p onClick={() => this.props.download(userId, score)}><a href={item.get('data_path')}
																																										 download>{item.get('data_name')}</a>
														</p>
														: <span style={{cursor: "default", opacity: .4}}>{item.get('data_name')}</span>
												}
											
											</List.Item>)}
									/>
								</Card>
							</ExtraData>
						</Col> : null
					}
				</Row>
				
				<Affix style={{position: 'absolute', top: "50%", right: 50}}>
					<div onClick={this.showDrawer} style={{ cursor: 'pointer' }}>
						{/*<Icon type="book" theme="twoTone" style={{fontSize: '32px', color: '#08c'}}/>*/}
						<BookTwoTone />
						<p style={{ fontSize: '10px', textAlign: 'center' }}>笔记</p>
					</div>
				</Affix>
				<Drawer
					title={note.get('lesson_name') ? note.get('lesson_name') + "笔记" : "笔记"}
					placement="right"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
					width={500}
				>
					{userId ?
						<div>
							<Editor
								editorState={editor}
								onEditorStateChange={this.onEditorStateChang}
							/>
							<Button
								style={{marginRight: 8,}}
								onClick={this.handleClearContent}
							>
								清空
							</Button>
							<Button
								onClick={() => this.formSubmit(userId, note)} type="primary">
								完成
							</Button>
						</div> : null
					}
				
				
				</Drawer>
				<BackTop/>
			</div>)
		
		
	}
	
	componentDidMount() {
		this.props.loadClassDetailData(this.props.match.params.classid, this.props.match.params.chapterid);
		if (this.props.userId) {
			this.props.loadClassNoteData(this.props.userId, this.props.match.params.classid);
			this.props.submitHistory(this.props.userId, this.props.match.params.classid, this.props.match.params.chapterid)
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.chapterid !== this.props.match.params.chapterid) {
			this.props.loadClassDetailData(nextProps.match.params.classid, nextProps.match.params.chapterid);
			if (this.props.userId)
				this.props.loadClassNoteData(nextProps.userId, nextProps.match.params.classid);
			this.props.submitHistory(nextProps.userId, nextProps.match.params.classid, nextProps.match.params.chapterid)
		}
	}
	
}

const mapState = (state) => ({
	userId: state.getIn(['login', 'id']),
	score: state.getIn(['login', 'score']),
	chapter: state.getIn(['classDetail', 'chapter']),
	block: state.getIn(['classDetail', 'block']),
	link: state.getIn(['classDetail', 'link']),
	extraData: state.getIn(['classDetail', 'extraData']),
	classId: state.getIn(['classDetail', 'classId']),
	note: state.getIn(['classDetail', 'note']),
});
const mapDispatch = (dispatch) => ({
	download(userId, score) {
		console.log(userId, score);
		dispatch(loginActionCreators.changeScore(userId, score - 10));
	},
	loadClassDetailData(classid, chapterid) {
		dispatch(actionCreators.loadClassDetailData(classid, chapterid));
	},
	loadClassNoteData(userid, classid) {
		if (userid && classid)
			dispatch(actionCreators.loadClassNoteData(userid, classid));
	},
	submitNote(noteId, userId, classId, content) {
		if (content) {
			dispatch(headerActionCreators.submitNote(userId, classId, content));
			dispatch(actionCreators.loadClassNoteData(userId, classId));
		}
	},
	submitHistory(userId, classId, chapterId) {
		if (userId) {
			axios.post("http://localhost:8000/class/", {
				user_id: userId,
				lesson_id: classId,
				chapter_id: chapterId
			}).then((res) => {
			
			})
		}
	}
	
});
export default withRouter(connect(mapState, mapDispatch)(ClassDetail));