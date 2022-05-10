import React, { PureComponent } from 'react'
import { Input, Upload, Modal, Row, Col, Button, message } from 'antd'
import { actionCreators } from './store'
import {connect} from 'react-redux';
import {PublishWrapper} from './style';
import {actionCreators as loginActionCreators} from '../login/store';
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header'
import { PlusOutlined } from '@ant-design/icons'

const TextArea = Input.TextArea;

class Publish extends PureComponent {
	state = {
		previewVisible: false,
		previewImage: '',
		fileList: [],
		inputValue: '',
		content: ''
	};
	
	handleCancel = () => this.setState({previewVisible: false});
	
	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	};
	
	handleChange = ({fileList}) => {
		console.log({ fileList })
		this.setState({ fileList })
	};
	
	handleInputChange = (e) => {
		this.setState({
			inputValue: e.target.value
		})
	};
	
	
	handleContentChange = (e) => {
		this.setState({
			content: e.target.value
		});
	};
	
	render() {
		const {previewVisible, previewImage, fileList, inputValue, content} = this.state;
		const {id, score} = this.props;
		const uploadButton = (
			<div>
				{/*<Icon type="plus"/>*/}
				<PlusOutlined />
				<div className='ant-upload-text'>Upload</div>
			</div>
		);
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
						<PublishWrapper>
							<Input
								style={{marginTop: 20}}
								placeholder="标题"
								onChange={(e) => this.handleInputChange(e)}
							/>
							<TextArea
								rows={6}
								style={{marginTop: 20}}
								placeholder="问题描述"
								onChange={(e) => this.handleContentChange(e)}
							/>
							<div className="clearfix" style={{marginTop: 20}}>
								<Upload
									listType="picture-card"
									fileList={fileList}
									onPreview={this.handlePreview}
									onChange={this.handleChange}
								>
									{fileList.length >= 3 ? null : uploadButton}
								</Upload>
								<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
									<img alt="example" style={{width: '100%'}} src={previewImage}/>
								</Modal>
							</div>
							<Button type="primary" size="large"
											onClick={() => this.props.publish(fileList, inputValue, content, id, score)}>发布</Button>
						</PublishWrapper>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapState = (state) => ({
	id: state.getIn(['login', 'id']),
	publish: state.getIn(['publish', 'publish']),
	score: state.getIn(['login', 'score'])
});
const mapDispatch = (dispatch) => ({
	publish(file, input, content, id, score) {
		console.log(score);
		let fileImg = [];
		for (let i = 0; i < file.length; i++)
			fileImg.push(file[i].thumbUrl);
		console.log(fileImg, input, content, id);
		if (!id)
			message.info('请先登录');
		else if (!input || !content)
			message.warning('问题内容不能为空');
		else {
			dispatch(actionCreators.publish(fileImg, input, content, id, score));
			dispatch(loginActionCreators.changeScore(id, score + 10));
			message.success("发布成功");
		}
		
	}
});
export default connect(mapState, mapDispatch)(Publish);