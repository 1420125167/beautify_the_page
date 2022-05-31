import React, {Component} from 'react';
import {BottomWrapper, BottomContent} from './style.js';
import { Row, Col, Card } from 'antd'
import { Footer } from 'antd/es/layout/layout'

class Bottom extends Component {
	
	render() {
		return (
			<Footer
				style={{
					textAlign: 'center',
				}}
			>
				AI Web ©2022 Created by SDUST
			</Footer>
		)
	}
}

export default Bottom;