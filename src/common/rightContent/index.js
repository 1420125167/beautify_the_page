import React, {Component} from 'react';
import {List} from 'antd';

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
];

class RightContent extends Component {
	render() {
		return (
			<div style={{marginTop: 30}}>
				<List
					header={<div>课程推荐</div>}
					footer={<div>More</div>}
					dataSource={data}
					split={false}
					renderItem={item => (<List.Item> {item}</List.Item>)}
				/>
			</div>
		
		
		)
		
		
	}
}

export default RightContent;