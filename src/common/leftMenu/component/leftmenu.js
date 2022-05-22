import { Menu, Button } from 'antd'
import {
	CodeOutlined,
	MailOutlined,
	HomeOutlined,
} from '@ant-design/icons'
import React from 'react'
import Link from 'react-router-dom/es/Link'

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
	getItem(<Link to={'/'}>首页</Link>, '1', <HomeOutlined />),
	getItem(<Link to={'/msg'}>消息列表</Link>, '2', <MailOutlined />),
	getItem(<Link to={'/code'}>在线调试</Link>, '3', <CodeOutlined />),

]

const App = () => {
	
	return (
		<div>
			<Menu
				// defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode='inline'
				theme='light'
				inlineCollapsed={true}
				selectable={false}
				items={items}
			/>
		</div>
	)
}

export default App