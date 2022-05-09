import React, { Component } from 'react'
import { Menu, Dropdown, message, Tooltip, Avatar, Space } from 'antd'
import Link from 'react-router-dom/es/Link'
import { MyHome } from '../style'
import MyPic from '../../../statics/my.jpg'
import { DownOutlined } from '@ant-design/icons'

const onClick = ({ key }) => {
	message.info(`Click on item ${key}`)
}
const menu = (
	<Menu
		onClick={onClick}
		items={[
			{
				label: '1st menu item',
				key: '1',
			},
		]}
	/>
)


class AvatarMenu extends Component {
	render() {
		const { img, name } = this.props
		return (
			<Link to='/my'>
				<Dropdown overlay={menu}
									placement='bottom'
									arrow={{ pointAtCenter: true }}>
					<a onClick={e => e.preventDefault()}>
						<Avatar style={{ marginTop: 5 }} size='large' src={img ? img : MyPic} />
					</a>
				</Dropdown>
			</Link>
		)
	}
}

export default AvatarMenu