import React, { Component } from 'react'
import { List } from 'antd'
import New from '../../page/home/component/new'
import { actionCreators } from '../../page/home/store'
import { connect } from 'react-redux'

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.',
	'Australian walks 100km after outback crash.',
	'Man charged over missing wedding girl.',
	'Los Angeles battles huge wildfires.',
]

class RightContent extends Component {
	render() {
		return (
			<New />
		)
	}
}

const mapState = (state) => ({
	newsData: state.getIn(['home', 'newsData']),
	newsPage: state.getIn(['home', 'newsPage']),
	newsTotalPage: state.getIn(['home', 'newsTotalPage']),
})
const mapDispatch = (dispatch) => ({
	loadNewsData() {
		dispatch(actionCreators.loadNewsData())
	},
	handleChangePage(page, totalPage, spin) {
		let originAngle = spin.style.transform.replace(/[^0-9]/ig, '')
		if (originAngle) {
			originAngle = parseInt(originAngle, 10)
		} else {
			originAngle = 0
		}
		spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)'
		if (page < totalPage)
			dispatch(actionCreators.changePage(page + 1))
		else dispatch(actionCreators.changePage(1))
	},
})
export default connect(mapState, mapDispatch)(RightContent)