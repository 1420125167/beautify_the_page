import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { Row, Col, Drawer, Avatar, Badge, Tooltip, Button, Divider } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import MyPic from '../../statics/my.jpg'
import SearchInput from './component/search'
import { Logo, HeadItem, InputWrapper, Note, Msg, MyHome, NextNote } from './style'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../page/login/store'
import AvatarMenu from './component/avatarMenu'
import { MailTwoTone } from '@ant-design/icons'

class Header extends PureComponent {
	state = {
		visible: false,
		childrenDrawer: false,
		editorState: '',
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
	
	showChildrenDrawer = (userId, id) => {
		this.props.loadNote(userId, id);
		this.setState({
			childrenDrawer: true,
		});
		
	};
	
	onChildrenDrawerClose = () => {
		this.setState({
			childrenDrawer: false,
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
	
	formSubmit(lesson_id, userId, note) {
		// 转换成HTML格式
		const editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
		this.props.submitNote(note.get('id'), userId, lesson_id, editorContent);
	}
	
	render() {
		const {IsLogin, classState, note, userId, name, score, messageNum, img} = this.props;
		const {editorState} = this.state;
		const blocksFromHtml = note.get('notebook_content') ? htmlToDraft(note.get('notebook_content')) : htmlToDraft('');
		const {contentBlocks, entityMap} = blocksFromHtml;
		const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
		const editorState1 = EditorState.createWithContent(contentState);
		const editor = editorState ? editorState : editorState1;
		return (
			<div>
				<Row className='header' gutter={4} style={{ marginTop: 5, width: window.innerWidth - 17 }}>
					<Col span={1}>
						<Link to='/'>
							<Logo />
						</Link>
					</Col>
					<Col span={8}>
						<InputWrapper>
							<SearchInput />
						</InputWrapper>
					</Col>
					<Col span={2}>
						<Link to='/problemlist'><HeadItem>问题</HeadItem></Link>
					</Col>
					<Col span={2}>
						<Link to='/term'><HeadItem>AI术语</HeadItem></Link>
					</Col>
					<Col span={2}>
						<Link to='/questionlist'><HeadItem>官方手册</HeadItem></Link>
					</Col>
					<Col span={2}>
						<Link to='/resource'><HeadItem>资源下载</HeadItem></Link>
					</Col>
					<Col span={2}>
						<Link to='/publish'><HeadItem>发布</HeadItem></Link>
					</Col>
					<Col span={1}>
						<HeadItem>
							<i className='iconfont' style={{ fontSize: 28, color: 'rgb(255,215,0)' }}>&#xe619;</i>
							{/*<Icon type="dollar" theme="twoTone"/>*/}
							<span>{score ? score : 0}</span>
						</HeadItem>
					</Col>
					<Col span={1}>
						<Note onClick={this.showDrawer}>
							<i className="iconfont" style={{fontSize: 28}}>&#xe896;</i>
							{/*<Icon type="book" />*/}
						</Note>
					</Col>
					<Col span={1}>
						<Badge count={messageNum ? messageNum : 0} style={{ marginTop: 10 }}>
							<Msg>
								<Link to='/msg'>
									{/*<Icon type="mail" theme="twoTone"/>*/}
									<MailTwoTone />
								</Link>
							</Msg>
						</Badge>
					</Col>
					<Col span={1} offset={1}>
						<AvatarMenu />
					</Col>
				</Row>
				<Drawer
					title="笔记板"
					width={400}
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					{
						classState.map((item) => (
							<NextNote key={item.get('id')}>
								<Button type="primary" onClick={() => this.showChildrenDrawer(userId, item.get('id'))}>
									{item.get("lesson_name")}
								</Button>
							</NextNote>
						))
					}
					{
						note.get('lesson_name') ?
							<Drawer
								title={note.get('lesson_name') + "笔记"}
								width={320}
								closable={false}
								onClose={this.onChildrenDrawerClose}
								visible={this.state.childrenDrawer}
							>
								{/*<div dangerouslySetInnerHTML={{__html:!content?note.get('notebook_content'):content}}>*/}
								
								{/*</div>*/}
								<Editor
									editorState={editor}
									onEditorStateChange={this.onEditorStateChang}
								/>
								
								<div
									style={{
										position: 'absolute',
										bottom: 0,
										width: '100%',
										borderTop: '1px solid #e8e8e8',
										padding: '10px 16px',
										textAlign: 'right',
										left: 0,
										background: '#fff',
										borderRadius: '0 0 4px 4px',
									}}
								>
									<Button
										style={{ marginRight: 8 }}
										onClick={this.handleClearContent}
									>
										清空
									</Button>
									<Button
										onClick={() => this.formSubmit(note.get('lesson_id'), userId, note)} type='primary'>
										完成
									</Button>
								</div>
							</Drawer> :
							null
					}
				</Drawer>
				<Divider style={{ marginTop: 5, width: window.innerWidth - 17 }} />
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadHeader(this.props.userId);
	}
}

const mapState = (state) => ({
	IsLogin: state.getIn(['login', 'login']),
	userId: state.getIn(['login', 'id']),
	img: state.getIn(['login', 'img']),
	name: state.getIn(['login', 'name']),
	score: state.getIn(['login', 'score']),
	messageNum: state.getIn(['header', 'messageNum']),
	classState: state.getIn(['header', 'class']),
	visible: state.getIn(['header', 'visible']),
	childrenDrawer: state.getIn(['header', 'childrenDrawer']),
	note: state.getIn(['header', 'note']),
	noteNum: state.getIn(['header', 'noteNum'])
});
const mapDispatch = (dispatch) => ({
	logout() {
		dispatch(loginActionCreators.logout());
	},
	loadNote(userId, id) {
		if (userId && id) {
			dispatch(actionCreators.changeNoteNum(id));
			dispatch(actionCreators.loadNote(userId, id));
		}
	},
	submitNote(userId, classId, content) {
		if (content)
			dispatch(actionCreators.submitNote(userId, classId, content));
	},
	loadHeader(id) {
		if (id)
			dispatch(actionCreators.loadHeader(id));
	}
});
export default connect(mapState, mapDispatch)(Header);