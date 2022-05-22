import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { List, Avatar, Button, Row, Col, BackTop } from 'antd'
import { actionCreators } from './store'
import LeftMenu from '../../common/leftMenu'
import Header from '../../common/header/index'
import Script from 'react-load-script'
import Bottom from '../../common/bottom'
import { Content, CenterContent } from '../home/style'
import Autoplay from '../home/component/autoplay'
import Lesson from '../home/component/lesson'

class Code extends PureComponent {
	render() {
		return (
			<div>
				<Header />
				<Content>
					<Row type='flex' gutter={40}>
						<Col span={4}>
							<LeftMenu />
						</Col>
						<Col span={12}>
							<py-repl auto-generate='true'></py-repl>
						</Col>
					</Row>
				</Content>
				<BackTop />
				<Bottom />
			</div>
		)
	}
	
	
	componentDidMount() {
		// if (this.props.id)
		// 	this.props.loadMsgData(this.props.id);
	}
	
}

const mapState = (state) => ({})
const mapDispatch = (dispatch) => ({})
export default connect(mapState, mapDispatch)(Code)