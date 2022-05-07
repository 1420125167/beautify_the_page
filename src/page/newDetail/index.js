import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import Header from '../../common/header/index';
import {NewWrapper, NewTitle, NewImg, NewDesc} from './style';
import {actionCreators} from './store';

class NewsDetail extends PureComponent {
	render() {
		const {title, content, date, img} = this.props;
		return (
			<div>
				<Header/>
				<Row type="flex" gutter={10}>
					<Col span={16} offset={4}>
						<NewWrapper>
							<NewTitle>
								<h2>{title}</h2>
								<span>{date}</span>
							</NewTitle>
							<NewImg src={img}/>
							<NewDesc dangerouslySetInnerHTML={{__html: content}}/>
						</NewWrapper>
					</Col>
					<Col span={4}>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.changeNewsData(this.props.match.params.id)
	}
	
}

const mapState = (state) => ({
	title: state.getIn(['newsDetail', 'title']),
	content: state.getIn(['newsDetail', 'content']),
	date: state.getIn(['newsDetail', 'date']),
	img: state.getIn(['newsDetail', 'img']),
});
const mapDispatch = (dispatch) => ({
	changeNewsData(id) {
		dispatch(actionCreators.changeNewsData(id))
	}
});
export default connect(mapState, mapDispatch)(NewsDetail);