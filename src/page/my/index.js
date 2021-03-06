import React, { PureComponent } from 'react'
import { Row, Col, Avatar, Tag, List, Progress, Divider, Modal, Upload, message, Popconfirm } from 'antd'
import { MyImg, MyType, MyProblem, MyWrapper, ProblemItem, ProblemHead, HistoryHead, History } from './style'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../login/store'
import axios from 'axios'
import { connect } from 'react-redux'
import LeftMenu from '../../common/leftMenu'
import Header from '../../common/header/index'
import MyPic from '../../statics/my.jpg'
import { MessageOutlined, PlusOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import HomeCol from './component/HomeCol'

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type,
	}
}

const items = [
	// getItem('', 'sub1', <MailOutlined />, [
	getItem('历史记录', '1'),
	getItem('我的提问', '2'),
	getItem('修改密码', '3'),
	// ]),
]


class My extends PureComponent {
	state = {
		visible: false,
		previewVisible: false,
		previewImage: '',
		fileList: [],
		currentSelect: '1',
	}
	handleCancel = () => this.setState({ previewVisible: false })
	
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		})
	}
	
	onClick = (e) => {
		this.setState({
			currentSelect: e.key,
		})
		console.log()
	}
	
	
	handleChange = ({ fileList }) => {
		this.setState({ fileList })
	}
	
	showModal = () => {
		this.setState({
			visible: true,
		})
	}
	
	hideModal = () => {
		this.setState({
			visible: false,
		});
	};
	
	confirm(id, userId) {
		this.props.deleteProblem(id, userId);
		message.success('删除成功');
	}
	
	cancel(e) {
		message.error('删除失败');
	}
	
	render() {
		const {history, problem, img, phone, name} = this.props;
		const {previewVisible, previewImage, fileList} = this.state;
		return (
			<div>
				<Header />
				<Row>
					<Col span={2}>
						<LeftMenu />
					</Col>
					<Col offset={10}>
						<MyWrapper>
							<MyImg onClick={this.showModal}>
								<Avatar size={72} src={img ? img : MyPic} />
							</MyImg>
							<MyType>
								{
									name ? <Tag color='magenta'>{name}</Tag> :
										<Tag color='magenta'>未登录</Tag>
								}
								{
									phone ? <Tag color='orange'>{phone}</Tag> :
										<Tag color='orange'>未登录</Tag>
								}
							</MyType>
						</MyWrapper>
					</Col>
				</Row>
				<Row type='flex'>
					<Col offset={3}>
						<Menu
							onClick={this.onClick}
							style={{
								width: 256,
							}}
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							mode='inline'
							items={items}
						/>
					</Col>
					<Col span={15} offset={1}>
						<HomeCol current={this.state.currentSelect} />
					</Col>
					<Col span={3}>
					</Col>
				</Row>
				<Modal
					title='修改头像'
					visible={this.state.visible}
					onOk={() => this.props.updateImg(this.props.id, fileList)}
					onCancel={this.hideModal}
					okText='确认'
					cancelText="取消"
				>
					<div className="clearfix">
						<Upload
							action="/pic"
							listType="picture-card"
							onPreview={this.handlePreview}
							onChange={this.handleChange}
						>
							{
								fileList.length >= 1 ?
									null :
									<div>
										{/*<Icon type="plus"/>*/}
										<PlusOutlined />
										<div className='ant-upload-text'>Upload</div>
									</div>
							}
						
						</Upload>
						<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
							<img alt="example" style={{width: '100%'}} src={previewImage}/>
						</Modal>
					</div>
				</Modal>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadHistoryData(this.props.id);
		this.props.loadProblemData(this.props.id);
	}
}

const mapState = (state) => ({
	img: state.getIn(['login', 'img']),
	name: state.getIn(['login', 'name']),
	history: state.getIn(['my', 'history']),
	problem: state.getIn(['my', 'problem']),
	id: state.getIn(['login', 'id']),
	phone: state.getIn(['login', 'phone'])
});
const mapDispatch = (dispatch) => ({
	loadHistoryData(id) {
		if (id)
			dispatch(actionCreators.loadHistoryData(id))
	},
	loadProblemData(id) {
		if (id)
			dispatch(actionCreators.loadProblemData(id))
	},
	updateImg(id, imgUrl) {
		if (id && imgUrl) {
			const img = imgUrl[0].thumbUrl;
			axios.post('http://localhost:8000/modifyuserimg/', {
				userid: id,
				img
			})
				.then((res) => {
					if (res.data.success) {
						message.success("修改成功");
						dispatch(loginActionCreators.changeImg(img))
					} else {
						message.error("修改失败");
					}
				})
		}
	}
	, deleteProblem(id, userid) {
		if (id && userid) {
			axios.get('http://localhost:8000/deleteproblem/?problemid=' + id)
				.then((res) => {
					const result = res.data.data;
					if (res.data.success) {
						console.log(result);
						dispatch(actionCreators.loadProblemData(userid));
						dispatch(actionCreators.loadHistoryData(userid));
					} else {
						console.log("登录失败");
					}
				})
		}
		
	}
});
export default connect(mapState, mapDispatch)(My);