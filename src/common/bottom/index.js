import React, {Component} from 'react';
import {BottomWrapper, BottomContent} from './style.js';
import {Row, Col, Card} from 'antd';

class Bottom extends Component {
	
	render() {
		return (
			<BottomWrapper>
				<Row type="flex" justify="center">
					<Col span={16}>
						<BottomContent>
							<Card
								style={{width: 300, background: "#3F3F3F", marginTop: 20, marginLeft: 20}}
								hoverable={true}
								bordered={false}
							>
								<p>
									<a href="https://ant.design/components/list-cn/" target="_blank" rel="noopener noreferrer"
										 style={{color: "#FFFAFA"}}>antd</a>
								</p>
							</Card>
							<Card
								style={{width: 300, background: "#3F3F3F", marginTop: 20, marginLeft: 20}}
								hoverable={true}
								bordered={false}
							>
								<p>
									<a href="https://ant.design/components/list-cn/" target="_blank" rel="noopener noreferrer"
										 style={{color: "#FFFAFA"}}>antd</a>
								</p>
							</Card>
							<Card
								style={{width: 300, background: "#3F3F3F", marginTop: 20, marginLeft: 20}}
								hoverable={true}
								bordered={false}
							>
								<p>
									<a href="https://ant.design/components/list-cn/" target="_blank" rel="noopener noreferrer"
										 style={{color: "#FFFAFA"}}>antd</a>
								</p>
							</Card>
						</BottomContent>
					</Col>
				</Row>
			</BottomWrapper>
		)
	}
	
	
}

export default Bottom;