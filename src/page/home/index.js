import React, {PureComponent} from 'react';
import {Row, Col, BackTop} from 'antd';
import {connect} from 'react-redux';
import {Content, RightContent, CenterContent} from './style'
import {actionCreators} from './store';
import Bottom from '../../common/bottom';
import New from './component/new'
import Problem from './component/problem'
import History from './component/rightnav'
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header';
import Autoplay from './component/autoplay'
import Lesson from './component/lesson'

class Home extends PureComponent {
	render() {
		return (
			<div>
				<Header/>
				<Content>
					<Row type="flex" gutter={40}>
						<Col span={4}>
							<LeftMenu/>
						</Col>
						<Col span={12}>
							<CenterContent>
								<Autoplay/>
								{/*<Problem/>*/}
								<Lesson />
							</CenterContent>
						</Col>
						<Col span={6}>
							<RightContent>
								<History/>
								<New/>
							</RightContent>
						</Col>
					</Row>
				</Content>
				<BackTop/>
				<Bottom/>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadHomeData()
	}
}

const mapState = (state) => ({
	classData: state.getIn(['home', 'classData'])
});
const mapDispatch = (dispatch) => ({
	loadHomeData() {
		dispatch(actionCreators.loadHomeData())
	}
});
export default connect(mapState, mapDispatch)(Home);