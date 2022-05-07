import React, {PureComponent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Icon, Input, Button, Checkbox, Alert} from 'antd';
import {LoginWrapper, LoginLogo, LoginTitle, LoginBottom, LoginItem, Wrapper} from './style';
import {actionCreators} from './store';
import LogoPic from '../../statics/logo.png';

class Login extends PureComponent {
	render() {
		const {loginStatue, login} = this.props;
		if (!loginStatue) {
			return (
				<div>
					<Wrapper> </Wrapper>
					<Row type="flex" justify="center">
						<Col span={8}>
							<LoginWrapper>
								<LoginLogo src={LogoPic}/>
								<LoginTitle>登录</LoginTitle>
								<Input
									style={{marginTop: 20}}
									prefix={<Icon type="user" style={{color: '#5eb2ff'}}/>}
									placeholder="账号"
									ref={input => {
										this.account = input
									}}
								/>
								<Input
									style={{marginTop: 20}}
									prefix={<Icon type="lock" style={{color: '#5eb2ff'}}/>}
									type="password"
									placeholder="密码"
									ref={input => {
										this.password = input
									}}
								/>
								{
									this.props.alert ? (
										<Alert
											message="账号密码错误"
											type="error"
											closable
											afterClose={this.props.handleClose}
										/>
									) : null
								}
								<LoginItem>
									<Checkbox>记住我</Checkbox>
									<Link to="/modify"><span className="forget">忘记密码</span></Link>
								</LoginItem>
								<LoginBottom>
									<Button type="primary" htmlType="submit" className="login-form-button"
													onClick={() => login(this.account, this.password)}>
										登录
									</Button>
									<Link to="/register">
										<Button type="primary" htmlType="submit" className="register-form-button ">
											注册
										</Button>
									</Link>
								</LoginBottom>
							</LoginWrapper>
						</Col>
					</Row>
				</div>
			)
		} else {
			return <Redirect to='/'/>
		}
	}
}

const mapState = (state) => ({
	loginStatue: state.getIn(['login', 'login']),
	alert: state.getIn(['login', 'alert'])
});
const mapDispatch = (dispatch) => ({
	login(accountElement, passwordElem) {
		dispatch(actionCreators.login(accountElement.state.value, passwordElem.state.value))
	},
	handleClose() {
		dispatch(actionCreators.closeAlert())
	}
});
export default connect(mapState, mapDispatch)(Login);