import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Steps, Button, Form, Input, Upload, Checkbox, Progress, message } from 'antd'
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { RegisterTitle } from './style'

const Step = Steps.Step

class Register extends PureComponent {
	render() {
		let imgUrl
		const {
			handleNextStep,
			handleBackStep,
			checkCode,
			registerState,
			step,
			phone,
			pwd,
			img,
			code,
			like,
			count,
			nikeName
		} = this.props;
		if (!registerState)
			message.warning("账号已存在");
		return (
			<div>
				<Row type="flex" justify="center" style={{marginTop: 100}}>
					<Col span={10}>
						<RegisterTitle> 用户注册</RegisterTitle>
						<Steps current={step}>
							<Step title="进行" description="基本信息"/>
							<Step title="等待" description="手机验证"/>
							<Step title="等待" description="注册完成"/>
						</Steps>
						{
							(step === 0) ?
								
								<Form>
									<Input
										placeholder='手机号'
										// prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
										prefix={<UserOutlined />}
										ref={input => {
											this.account = input
										}}
										style={{ marginTop: 20 }}
									/>
									<Input
										placeholder='密码'
										type='password'
										// prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
										prefix={<LockOutlined />}
										ref={input => {
											this.password = input
										}}
										style={{ marginTop: 20 }}
									/>
									<Input
										placeholder='确认密码'
										type='password'
										// prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
										prefix={<LockOutlined />}
										style={{ marginTop: 20 }}
										ref={input => {
											this.afPassword = input
										}}
									/>
									<Input
										placeholder='昵称'
										// prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
										prefix={<UserOutlined />}
										style={{ marginTop: 20 }}
										ref={input => {
											this.nickname = input
										}}
									/>
									<Form.Item
										label='上传头像'>
										<Upload
											action='/pic'
											listType='picture'
											onChange={(file, fileList) => {
												imgUrl = file.file.thumbUrl;
												if (file.status !== 'uploading') {
												}
											}}
										>
											<Button>
												<UploadOutlined /> Upload
											</Button>
										</Upload>
									</Form.Item>
									<Checkbox>I have read the agreement</Checkbox>
									<div>
										<Button
											type="primary"
											onClick={() => handleNextStep(step, this.account, this.password, this.afPassword, this.nickname, imgUrl)}
											style={{marginLeft: 20}}
										>
											下一步
										</Button>
									</div>
								</Form> : null
						}
						{
							(step === 1) ?
								<Form style={{marginTop: 20}}>
									<Input
										style={{ marginTop: 20, width: '50%' }}
										// prefix={<Icon type="lock" style={{color: '#5eb2ff'}}/>}
										prefix={<UploadOutlined />}
										placeholder='验证码'
										ref={input => {
											this.code = input
										}}
									/>
									{
										like ?
											<Button type="primary" onClick={() => this.props.getCode(phone)}>
												获取密码
											</Button>
											:
											<Button type="primary" disabled>
												{count}
											</Button>
									}
									<div>
										<Button type="primary" onClick={() => handleBackStep(step)}>
											上一步
										</Button>
										<Button
											type="primary"
											onClick={() => checkCode(this.code, code, phone, pwd, img, nikeName)}
											style={{marginLeft: 20}}
										>
											下一步
										</Button>
									</div>
								</Form> : null
						}
						{
							(step === 2) ?
								<div>
									<Progress type="circle" percent={100}/>
									<div>
										<Link to="/login">
											<Button
												type="primary"
												style={{marginLeft: 20}}
											>
												完成
											</Button>
										</Link>
									</div>
								
								</div> : null
						}
					</Col>
				</Row>
			</div>
		);
	}
}

const mapState = (state) => ({
	step: state.getIn(['register', 'step']),
	registerState: state.getIn(['register', 'registerState']),
	count: state.getIn(['register', 'count']),
	like: state.getIn(['register', 'like']),
	phone: state.getIn(['register', 'phone']),
	img: state.getIn(['register', 'img']),
	nikeName: state.getIn(['register', 'nikeName']),
	pwd: state.getIn(['register', 'pwd']),
	code: state.getIn(['register', 'code']),
});
const mapDispatch = (dispatch) => ({
	handleNextStep(step, accountElem, pwdElem, afPwdElem, nickNameElem, img) {
		console.log(accountElem.input.value)
		const account = accountElem.input.value
		const pwd = pwdElem.input.value
		const afPwd = afPwdElem.input.value
		const nickName = nickNameElem.input.value
		console.log()
		if (pwd !== afPwd)
			message.warning('两次密码不一致')
		else if (!account || !pwd || !afPwd || !nickName)
			message.error('内容不能为空')
		else if (!/^[0-9]+$/.test(account) && account.length !== 11)
			message.error('账号格式错误')
		else if (nickName.length > 12)
			message.warning('昵称长度超出限制')
		else if (pwd.length >= 8 && pwd.length <= 24) {
			dispatch(actionCreators.postUserData(step + 1, account, pwd, nickName, img))
		} else
			message.warning('密码必须大于8位且小于24位')
	},
	handleBackStep(step) {
		dispatch(actionCreators.backStep(step - 1))
	},
	checkCode(codeElem, code, phone, pwd, img, nikeName) {
		const afCode = codeElem.input.value
		console.log(afCode, code);
		if (afCode === code)
			dispatch(actionCreators.register(phone, pwd, img, nikeName));
		else
			message.error("验证码错误");
	},
	getCode(phone) {
		let count = 60;
		const timer = setInterval(
			() => {
				if (count > 0)
					dispatch(actionCreators.changeCount(count--, false));
				else {
					clearInterval(timer);
					dispatch(actionCreators.changeCount(60, true));
				}
				
			}
			, 1000);
		dispatch(actionCreators.getCode(phone));
	},
	register(phone, pwd, img) {
		dispatch(actionCreators.register(phone, pwd, img))
	}
	
});
export default connect(mapState, mapDispatch)(Register);