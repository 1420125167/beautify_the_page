import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'
import { actionCreators } from '../store'
import img1 from './default.png'
import { RightOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Banner } from '../style'

const { Meta } = Card

class Class extends PureComponent {
	render() {
		const { classData } = this.props
		return (
			<Row>{
				classData.map((item) => {
					return (
						<Col span={11} offset={1} key={item.get('id')}>
							<Link to={'/searchlist/class/' + item.get('lesson_name')}>
								<Card
									hoverable
									style={{ width: 300, marginTop: 10 }}
									cover={item.get('lesson_img')
										? <img alt={item.get('lesson_name')} src={item.get('lesson_img')} />
										: <Banner imgSrc={item.get('lesson_img') ? item.get('lesson_img') : img1}>
											<h3 className={'homecarousel'} style={{
												lineHeight: '95px',
												color: '#00E5FF',
												textAlign: 'center',
												fontSize: '30px',
											}}>{item.get('lesson_name')}</h3>
										</Banner>
									}
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

