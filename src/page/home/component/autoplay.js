import React, {PureComponent} from 'react';
import {Carousel, Popover, Card, Button} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Banner} from "../style";
import img1 from '../../../statics/home/bg1.jpg';
import {actionCreators} from "../store";

class Autoplay extends PureComponent {
	render() {
		const {classData}=this.props;
		return (
			<div>
				<Button
					// classname={styles.leftbutton}
					style={{left:26}}
					onClick={()=>{
						this.card.prev()
					}}>
					<i className="iconfont">&#xe901;</i>
				</Button>
				<Button
					// classname={styles.leftbutton}
					style={{float:'right', right: 26}}
					onClick={()=>{
						this.card.next()
					}}>
					<i className="iconfont">&#xe900;</i>
				</Button>
				<Carousel autoplay ref={e=>{
					this.card=e
				}}>
					{
						classData.map((item)=>(
							<Popover
								placement="right"
								content={
									<Card title={item.get('lesson_name')} style={{width: 300}}>
										<div dangerouslySetInnerHTML={{__html: item.get('lesson_intro')}}/>
									</Card>
								}
								key={item.get('id')}>
								<Link to={"/classdetail/"+item.get('id')+"/"+item.get('lesson_chapter')}>
									<Banner imgSrc={img1}>
										<h3>{item.get('lesson_name')}</h3>
									</Banner>
								</Link>
							</Popover>
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