import React, {PureComponent} from 'react';
import {Carousel, Popover, Card, Button} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { Banner, LeftButton } from '../style'
import img1 from './default.png'
import { actionCreators } from '../store'
import './home.css'

class Autoplay extends PureComponent {
	render() {
		const {classData}=this.props;
		return (
			<div>
				<Button
					className='carouselLeftButton'
					style={{ height: '60vh', position: 'absolute' }}
					onClick={() => {
						this.card.prev()
					}}>
					<i className='iconfont'>&#xe901;</i>
				</Button>
				<Button
					className={'carouselRightButton'}
					style={{ float: 'right', right: 30, height: '60vh', position: 'absolute' }}
					onClick={() => {
						this.card.next()
					}}>
					<i className='iconfont'>&#xe900;</i>
				</Button>
				<Carousel
					style={{ height: '60vh' }}
					autoplay ref={e => {
					this.card = e
				}}>
					{
						classData.map((item) => (
							<Link to={'/classdetail/' + item.get('id') + '/' + item.get('lesson_chapter')}>
								<Banner imgSrc={item.get('lesson_img') ? item.get('lesson_img') : img1}>
									{
										item.get('lesson_img')
											? <h3></h3>
											: <h3 className={'homecarousel'}
														style={{ lineHeight: '61vh', color: '#00E5FF' }}>{item.get('lesson_name')}</h3>
									}
								</Banner>
							</Link>
						))
					}
				</Carousel>
			</div>
		)
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
export default connect(mapState, mapDispatch)(Autoplay);