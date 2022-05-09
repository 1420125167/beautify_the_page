import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Row, Col, Input, Button, Alert, message } from 'antd'
import { LoginWrapper, LoginTitle, LoginBottom, Wrapper } from './style'
import { actionCreators } from './store'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

class Modify extends PureComponent {
	render() {
		const {count, like, code, alert, modifyStatus} = this.props;
		if (!modifyStatus) {
			return (
				<div>
					<Wrapper> </Wrapper>
					<Row type="flex" justify="center">
						<Col span={8}>
							<LoginWrapper>
								<LoginTitle>修改密码</LoginTitle>
								<Input
									style={{ marginTop: 20 }}
									// prefix={<Icon type="user" style={{color: '#5eb2ff'}}/>}
									prefix={<UserOutlined />}
									placeholder='账号'
									disabled={!like}
									ref={input => {
										this.account = input
									}}
								/>
								{
									alert ? (
										<Alert
											message="账号不存在"
											type="error"
											closable
											afterClose={this.props.handleClose}
										/>
									) : null
								}
								<Input
									style={{ marginTop: 20 }}
									// prefix={<Icon type="user" style={{color: '#5eb2ff'}}/>}
									prefix={<UserOutlined />}
									placeholder='密码'
									type='password'
									ref={input => {
										this.password = input
									}}
								/>
								<Input
									style={{ marginTop: 20 }}
									// prefix={<Icon type="user" style={{color: '#5eb2ff'}}/>}
									prefix={<UserOutlined />}
									placeholder='确认密码'
									type='password'
									ref={input => {
										this.afPassword = input
									}}
								/>
								<Input
									style={{ marginTop: 20, width: '50%' }}
									// prefix={<Icon type="lock" style={{color: '#5eb2ff'}}/>}
									prefix={<LockOutlined />}
									placeholder='密码'
									ref={input => {
										this.code = input
									}}
								/>
								{
									like ?
										<Button type="primary" onClick={() => this.props.changeCount(this.account)}>
											验证码
										</Button>
										:
										<Button type="primary" disabled>
											{count}
										</Button>
								}
								
								
								<LoginBottom>
									<Button
										type="primary" htmlType="submit" className="login-form-button"
										onClick={() => this.props.modify(this.account, this.password, this.afPassword, this.code, code)}
									>
										完成
									</Button>
								</LoginBottom>
							</LoginWrapper>
						</Col>
					</Row>
				</div>
			)
		} else
			return <Redirect to='/login'/>
		
	}
}

const mapState = (state) => ({
	count: state.getIn(['modify', 'count']),
	like: state.getIn(['modify', 'like']),
	code: state.getIn(['modify', 'code']),
	alert: state.getIn(['modify', 'alert']),
	modifyStatus: state.getIn(['modify', 'modify'])
});
const mapDispatch = (dispatch) => ({
	modify(accountElement, passwordElem, afPasswordElem, codeElem, passCode) {
		const phone = accountElement.state.value;
		const pwd = passwordElem.state.value;
		const afPwd = afPasswordElem.state.value;
		const code = codeElem.state.value;
		if (code !== passCode && code.length)
			message.error("验证码错误");
		else if (pwd !== afPwd)
			message.error("两次密码不一致");
		else if (pwd.length < 8 || pwd.length > 24)
			message.warning("密码必须大于8位且小于24位");
		else {
			dispatch(actionCreators.modify(phone, pwd))
		}
	},
	changeCount(accountElement) {
		const phone = accountElement.state.value;
		let count = 60;
		dispatch(actionCreators.checkCode(phone));
		const timer = setInterval(
			() => {
				if (count > 0)
					dispatch(actionCreators.changeCount(count--, false));
				else {
					clearInterval(timer);
					dispatch(actionCreators.changeCount(60, true));
				}
			}
			, 1000)
	},
	handleClose() {
		dispatch(actionCreators.closeAlert());
	}
});
export default connect(mapState, mapDispatch)(Modify);