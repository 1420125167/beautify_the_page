import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Card, Row, Col} from 'antd';
import {actionCreators} from '../store';

const {Meta} = Card;

class Class extends PureComponent {
	render() {
		const {classData} = this.props;
		return (
			<Row>{
				classData.map((item) => {
					return (
						<Col span={11} offset={1} key={item.get('id')}>
							<Link to="/">
								<Card
									style={{width: 300, marginTop: 10}}
									cover={<img alt="example" src={item.get('lesson_img')}/>}
								>
									<Meta
										title={item.get('lesson_name')}
										description={item.get('lesson_intro')}
									/>
								</Card>
							</Link>
						</Col>
					)
				})
			}
			</Row>
		)
	}
}

const mapState = (state) => ({
	classData: state.getIn(['home', 'classData'])
});
const mapDispatch = (dispatch) => ({
	loadClassData() {
		dispatch(actionCreators.loadClassData())
	}
});
export default connect(mapState, mapDispatch)(Class);
