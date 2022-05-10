import React, { Component } from 'react'
import { Menu, Dropdown, message, Tooltip, Avatar, Space } from 'antd'
import Link from 'react-router-dom/es/Link'
import { MyHome } from '../style'
import MyPic from '../../../statics/my.jpg'
import { DownOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { actionCreators as loginActionCreators } from '../../../page/login/store'
import { actionCreators } from '../store'

class AvatarMenu extends Component {
	render() {
		const { img, name, loginStatue } = this.props
		const loginmenu = (
			<Menu
				items={[
					{
						label: <Link to={'/login'}>登录</Link>,
						key: '1',
					},
					{
						label: <Link to={'/my'}>个人空间</Link>,
						key: '2',
					},
				]}
			/>
		)
		const logoutmenu = (
			<Menu
				items={[
					{
						label: <p onClick={this.props.logout}>退出</p>,
						key: '1',
					},
					{
						label: <Link to={'/my'}>个人空间</Link>,
						key: '2',
					},
				]}
			/>
		)
		return (
			!loginStatue ? (
					<Dropdown overlay={loginmenu}
										placement='bottom'
										arrow={{ pointAtCenter: true }}>
						<a onClick={e => e.preventDefault()}>
							<Avatar style={{ marginTop: 5 }} size='large' src={img ? img : MyPic} />
						</a>
					</Dropdown>) :
				(
					<Dropdown overlay={logoutmenu}
										placement='bottom'
										arrow={{ pointAtCenter: true }}>
						<a onClick={e => e.preventDefault()}>
							<Avatar style={{ marginTop: 5 }} size='large' src={img ? img : MyPic} />
						</a>
					</Dropdown>
				)
		)
	}
}

const mapState = (state) => ({
	loginStatue: state.getIn(['login', 'login']),
})
const mapDispatch = (dispatch) => ({
	logout() {
		dispatch(loginActionCreators.logout())
	},
})
export default connect(mapState, mapDispatch)(AvatarMenu)