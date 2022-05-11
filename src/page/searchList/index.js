import React, { Component } from 'react'
import { List, Row, Col, Pagination, Button } from 'antd'
import { Link } from 'react-router-dom'
import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { ProblemWrapper, ProblemItem } from './style'
import { actionCreators } from './store'
import LeftMenu from '../../common/leftMenu'
import Header from '../../common/header'
import RightContent from '../../common/rightContent'
import search from '../../common/header/component/search'
import MainCol from './component/mainCol'

class SearchList extends Component {
	
	render() {
		const { data, page } = this.props
		const newData = data.toJS(data)
		const list = []
		if (newData.length) {
			if (newData.length >= page * 6) {
				for (let i = (page - 1) * 6; i < page * 6; i++) {
					list.push(newData[i]);
				}
			} else {
				for (let i = (page - 1) * 6; i < newData.length; i++) {
					list.push(newData[i]);
				}
			}
		}
		const search = fromJS(list);
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
						<MainCol name={this.props.match.params.type} />
						<div style={{ textAlign: 'center', margin: '20 auto' }}>
							<Pagination current={page} pageSize={6} total={newData.length}
													onChange={(page) => this.props.changePage(page)} />
						</div>
					</Col>
					<Col span={6}>
						<RightContent/>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		// this.setState({searchType: this.props.match.params.type})
		this.props.loadSearchListData(this.props.match.params.type, this.props.match.params.search)
	}
}

const mapState = (state) => ({
	data: state.getIn(['searchList', 'search']),
	page: state.getIn(['searchList', 'page']),
	totalPage: state.getIn(['searchList', 'totalPage']),
});
const mapDispatch = (dispatch) => ({
	loadSearchListData(type, search) {
		console.log(type)
		dispatch(actionCreators.loadSearchListData(type, search))
	},
	changePage(page) {
		dispatch(actionCreators.changePage(page))
	}
});
export default connect(mapState, mapDispatch)(SearchList);