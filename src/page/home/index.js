import React, {PureComponent} from 'react';
import {Carousel, Row, Col, BackTop, Popover, Card} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import img1 from '../../statics/home/bg1.jpg';
import {Content, RightContent, CenterContent, Banner} from './style'
import {actionCreators} from './store';
import Bottom from '../../common/bottom';
import New from './component/new';
import Problem from './component/problem';
import History from './component/rightnav';
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header';

class Home extends PureComponent {
	render() {
		const {classData} = this.props;
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
								<Carousel autoplay>
									{
										classData.map((item) => (
											<Popover
												placement="right"
												content={
													<Card title={item.get('lesson_name')} style={{width: 300}}>
														<div dangerouslySetInnerHTML={{__html: item.get('lesson_intro')}}/>
													</Card>
												}
												key={item.get('id')}>
												<Link to={"/classdetail/" + item.get('id') + "/" + item.get('lesson_chapter')}>
													<Banner imgSrc={img1}>
														<h3>{item.get('lesson_name')}</h3>
													</Banner>
												</Link>
											</Popover>
										))
									}
								</Carousel>
								{/*<Problem/>*/}
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