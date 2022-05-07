import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Row, Col, List, Button, PageHeader, Card, Divider} from 'antd';
import {actionCreators} from './store';
import LeftMenu from '../../common/leftMenu';
import Header from '../../common/header/index';

class Resource extends PureComponent {
	render() {
		const {resource} = this.props;
		return (
			<div>
				<Header/>
				<Row type="flex">
					<Col span={3}>
						<LeftMenu/>
					</Col>
					<Col span={16} offset={1}>
						<PageHeader onBack={() => window.history.back()} title="资源下载"/>
						<Divider orientation="left">安装包下载</Divider>
						<List
							grid={{
								gutter: 16,
								xs: 1,
								sm: 2,
								md: 4,
								lg: 4,
								xl: 4,
								xxl: 3,
							}}
							dataSource={resource.get('resource1')}
							renderItem={item => (
								<List.Item>
									<Card>
										{item.get('resource_name')}
										<a href={item.get('resource_link')}>
											<Button type="primary" icon="download" size="small">
												下载
											</Button>
										</a>
									
									</Card>
								</List.Item>
							)}
						/>
						<Divider orientation="left">书籍资料</Divider>
						<List
							grid={{
								gutter: 16,
								xs: 1,
								sm: 2,
								md: 4,
								lg: 4,
								xl: 4,
								xxl: 3,
							}}
							dataSource={resource.get('resource2')}
							renderItem={item => (
								<List.Item>
									<Card>
										{item.get('resource_name')}
										<a href={item.get('resource_link')}>
											<Button type="primary" icon="download" size="small">
												下载
											</Button>
										</a>
									
									</Card>
								</List.Item>
							)}
						/>
						<Divider orientation="left">课件资料</Divider>
						<List
							grid={{
								gutter: 16,
								xs: 1,
								sm: 2,
								md: 4,
								lg: 4,
								xl: 4,
								xxl: 3,
							}}
							dataSource={resource.get('resource3')}
							renderItem={item => (
								<List.Item>
									<Card>
										{item.get('resource_name')}
										<a href={item.get('resource_link')}>
											<Button type="primary" icon="download" size="small">
												下载
											</Button>
										</a>
									
									</Card>
								</List.Item>
							)}
						/>
					</Col>
				</Row>
			</div>
		)
	}
	
	componentDidMount() {
		this.props.loadResourceData()
	}
}

const mapState = (state) => ({
	resource: state.getIn(['resource', 'resource'])
});
const mapDispatch = (dispatch) => ({
	loadResourceData() {
		dispatch(actionCreators.loadResourceData());
	}
});
export default connect(mapState, mapDispatch)(Resource);