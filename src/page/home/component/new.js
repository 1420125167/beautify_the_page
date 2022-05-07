import React, {PureComponent} from 'react';
import {List} from 'antd';
import {connect} from 'react-redux';
import {fromJS} from 'immutable'
import {NewsTitle, NewsIcon, NewsWrapper} from '../style';
import {actionCreators} from '../store';

class New extends PureComponent {
	render() {
		const {newsData, newsPage, newsTotalPage} = this.props;
		const news = newsData.toJS(newsData);
		const list = [];
		if (news.length) {
			if (newsPage * 5 <= news.length) {
				for (let i = (newsPage - 1) * 5; i < newsPage * 5; i++) {
					list.push(news[i]);
				}
			} else {
				for (let i = (newsPage - 1) * 5; i < news.length; i++) {
					list.push(news[i]);
				}
			}
		}
		const newsList = fromJS(list);
		return (
			<NewsWrapper>
				<NewsTitle>新闻列表</NewsTitle>
				<NewsIcon onClick={() => this.props.handleChangePage(newsPage, newsTotalPage, this.spinIcon)}>
					<i className="iconfont spin" ref={(icon) => {
						this.spinIcon = icon
					}}>&#xe851;</i>
				</NewsIcon>
				<List
					style={{marginTop: 10}}
					itemLayout="horizontal"
					dataSource={newsList}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								title={
									<a href={item.get('news_link')}
										 target="_blank"
										 rel="noopener noreferrer"
										 key={item.get('id')}
									>
										<span>{item.get('news_title')}</span>
										<span style={{fontSize: 12, color: 'gray'}}>
                                        {item.get('news_date')}</span>
									</a>
								}
							/>
						</List.Item>
					)}
				/>
			</NewsWrapper>
		)
	}
}

const mapState = (state) => ({
	newsData: state.getIn(['home', 'newsData']),
	newsPage: state.getIn(['home', 'newsPage']),
	newsTotalPage: state.getIn(['home', 'newsTotalPage']),
});
const mapDispatch = (dispatch) => ({
	loadNewsData() {
		dispatch(actionCreators.loadNewsData())
	},
	handleChangePage(page, totalPage, spin) {
		let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
		if (originAngle) {
			originAngle = parseInt(originAngle, 10);
		} else {
			originAngle = 0;
		}
		spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
		if (page < totalPage)
			dispatch(actionCreators.changePage(page + 1));
		else dispatch(actionCreators.changePage(1));
	}
});
export default connect(mapState, mapDispatch)(New);

