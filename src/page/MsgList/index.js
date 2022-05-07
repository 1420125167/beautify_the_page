import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fromJS} from 'immutable'
import {List, Avatar, Button, Row, Col} from 'antd';
import {actionCreators} from './store';
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header/index';

class MsgList extends PureComponent {
	render() {
		const {initLoading, loading, data, page, totalPage} = this.props;
		const newData = data.toJS(data);
		const list = [];
		if (newData.length) {
			if (newData.length > page * 6) {
				for (let i = 0; i < page * 6; i++) {
					list.push(newData[i]);
				}
			} else {
				for (let i = 0; i < newData.length; i++) {
					list.push(newData[i]);
				}
				
			}
		}
		const msg = fromJS(list);
		const loadMore = !initLoading && !loading ? (
			<div style={{
				textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
			}}
			>
				<Button onClick={() => this.props.onLoadMore(page, totalPage)}>loading more</Button>
			</div>
		) : null;
		return (
			<div>
				<Header/>
				<Row type="flex">
					<Col span={4}>
						<LeftMenu/>
					</Col>
					<Col span={14} offset={1}>
						<List
							className="demo-loadmore-list"
							loading={initLoading}
							itemLayout="horizontal"
							loadMore={loadMore}
							dataSource={msg}
							style={{marginTop: 20}}
							renderItem={item => (
								<List.Item
									actions={[<span onClick={() => this.props.deleteMsg(item.get('id'), this.props.id)}>delete</span>]}>
									<List.Item.Meta
										avatar={<Avatar icon="message"/>}
										title={<a href="https://ant.design">{item.get('message_title')}</a>}
										description={item.get('message_content')}/>
								</List.Item>
							)}
						/>
					</Col>
					<Col span={5}>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		if (this.props.id)
			this.props.loadMsgData(this.props.id);
	}
	
}

const mapState = (state) => ({
	initLoading: state.getIn(['msgList', 'initLoading']),
	loading: state.getIn(['msgList', 'loading']),
	data: state.getIn(['msgList', 'msg']),
	id: state.getIn(['login', 'id']),
	page: state.getIn(['msgList', 'page']),
	totalPage: state.getIn(['msgList', 'totalPage'])
	
});
const mapDispatch = (dispatch) => ({
	loadMsgData(id) {
		dispatch(actionCreators.loadMsgData(id))
	},
	onLoadMore(page, totalPage) {
		if (page < totalPage) {
			dispatch(actionCreators.changePage(page + 1));
		}
		if (page + 1 === totalPage) {
			dispatch(actionCreators.changeLoad())
		}
		
	},
	deleteMsg(id, userid) {
		dispatch(actionCreators.deleteMsgData(id, userid))
	}
});
export default connect(mapState, mapDispatch)(MsgList);