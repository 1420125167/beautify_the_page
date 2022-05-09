import React, { Component } from 'react'
import { Menu, Dropdown, message, Tooltip, Avatar, Space } from 'antd'
import Link from 'react-router-dom/es/Link'
import { MyHome } from '../style'
import MyPic from '../../../statics/my.jpg'
import { DownOutlined } from '@ant-design/icons'

const menu = (
	<Menu
		items={[
			{
				// label: <a href={'/my'}>个人空间</a>,
				label: <Link to={'/my'}>个人空间</Link>,
				key: '1',
			},
		]}
	/>
)


class AvatarMenu extends Component {
	render() {
		const { img, name } = this.props
		return (
				<Dropdown overlay={menu}
									placement='bottom'
									arrow={{ pointAtCenter: true }}>
					<a onClick={e => e.preventDefault()}>
						<Avatar style={{ marginTop: 5 }} size='large' src={img ? img : MyPic} />
					</a>
				</Dropdown>
		)
	}
}

export default AvatarMenu