import React, {PureComponent} from 'react';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import {ProblemWrapper, ProblemTitle, ProblemDesc, ProblemImg} from './style';
import {actionCreators} from './store';
import LeftMenu from '../../common/leftMenu/index';
import Header from '../../common/header/index';

class QuestionDetail extends PureComponent {
	render() {
		const {title, date, img, content} = this.props;
		return (
			<div>
				<Row>
					<Header/>
				</Row>
				<Row>
					<Col span={4}>
						<LeftMenu/>
					</Col>
					<Col span={12} offset={2}>
						<ProblemWrapper>
							<ProblemTitle>
								<h2>{title}</h2>
								<span>{date}</span>
							</ProblemTitle>
							<ProblemImg src={img}/>
							<ProblemDesc dangerouslySetInnerHTML={{__html: content}}/>
						</ProblemWrapper>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadQuestionData(this.props.match.params.id)
	}
}

const mapState = (state) => ({
	title: state.getIn(['questionDetail', 'title']),
	date: state.getIn(['questionDetail', 'date']),
	img: state.getIn(['questionDetail', 'img']),
	content: state.getIn(['questionDetail', 'content']),
});
const mapDispatch = (dispatch) => ({
	loadQuestionData(id) {
		dispatch(actionCreators.loadQuestionData(id));
	}
});
export default connect(mapState, mapDispatch)(QuestionDetail);