import { ProblemItem, ProblemWrapper } from '../style'
import { List } from 'antd'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { actionCreators } from '../store'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

class MainCol extends Component {
	render() {
		const { data, page } = this.props
		const searchType = this.props.name
		const newData = data.toJS(data)
		const list = []
		if (newData.length) {
			if (newData.length >= page * 6) {
				for (let i = (page - 1) * 6; i < page * 6; i++) {
					list.push(newData[i])
				}
			} else {
				for (let i = (page - 1) * 6; i < newData.length; i++) {
					list.push(newData[i])
				}
			}
		}
		const searchResults = fromJS(list)
		// const searchType=this.props.match.params.type
		if (searchType === 'problem') {
			return (
				<ProblemWrapper>
					<ProblemItem>
						<List
							itemLayout='vertical'
							dataSource={searchResults}
							renderItem={item => (
								<Link to={'/' + searchType + 'detail/' + item.get('id')}>
									<List.Item
										key={item.get('id')}
										style={{ marginTop: 20 }}
									>
										<List.Item.Meta
											title={<span>{item.get('problem_title')}</span>}
										/>
									</List.Item>
								</Link>
							)}
						/>
					</ProblemItem>
				</ProblemWrapper>
			)
		}
		if (searchType === 'class') {
			return (
				<ProblemWrapper>
					<ProblemItem>
						<List
							itemLayout='vertical'
							dataSource={searchResults}
							renderItem={item => (
								<Link to={'/' + searchType + 'detail/' + item.get('lesson_id_id') + '/' + +item.get('id')}>
									<List.Item
										key={item.get('id')}
										style={{ marginTop: 20 }}
									>
										<List.Item.Meta
											title={<span>{item.get('chapter_name')}</span>}
											description={item.get('chapter_intro')}
										/>
									</List.Item>
								</Link>
							)}
						/>
					</ProblemItem>
				</ProblemWrapper>
			)
		}
		// if(searchType==='news'){
		// 	return (
		// 		<ProblemWrapper>
		// 			<ProblemItem>
		// 				<List
		// 					itemLayout="vertical"
		// 					dataSource={searchResults}
		// 					renderItem={item => (
		// 						<Link to={"/" + searchType + "detail/" + item.get("id")}>
		// 							<List.Item
		// 								key={item.get("id")}
		// 								style={{marginTop: 20}}
		// 							>
		// 								<List.Item.Meta
		// 									title={<span>{item.get("problem_title")}</span>}
		// 								/>
		// 							</List.Item>
		// 						</Link>
		// 					)}
		// 				/>
		// 			</ProblemItem>
		// 		</ProblemWrapper>
		// 	)
		// }
		if (searchType === 'question') {
			return (
				<ProblemWrapper>
					<ProblemItem>
						<List
							itemLayout='vertical'
							dataSource={searchResults}
							renderItem={item => (
								<Link to={'/questiondetail/' + item.get('id')}>
									<List.Item
										key={item.get('id')}
										style={{ marginTop: 20 }}
										actions={[<span>{item.get('answer_date')}</span>]}
									>
										<List.Item.Meta
											title={<span>{item.get('answer_title')}</span>}
											description={item.get('answer_content')}
										/>
									</List.Item>
								</Link>
							)}
						/>
					</ProblemItem>
				</ProblemWrapper>
			)
		}
	}
}

const mapState = (state) => ({
	data: state.getIn(['searchList', 'search']),
	page: state.getIn(['searchList', 'page']),
	totalPage: state.getIn(['searchList', 'totalPage']),
})

const mapDispatch = (dispatch) => ({
	loadSearchListData(type, search) {
		dispatch(actionCreators.loadSearchListData(type, search))
	},
	changePage(page) {
		dispatch(actionCreators.changePage(page))
	},
})
export default connect(mapState, mapDispatch)(MainCol)