import React, { PureComponent } from 'react'
import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import { MessageOutlined } from '@ant-design/icons'

// const IconText = ({type, text}) => (
// 	<span>
//     <Icon type={type} style={{marginRight: 8}}/>
// 		{text}
//   </span>
// );

class Problem extends PureComponent {
	render() {
		const { problemData } = this.props
		return (
			<List
				style={{ marginTop: 10, borderTop: 1 }}
				itemLayout='vertical'
				size='large'
				dataSource={problemData}
				renderItem={item => (
					<Link to={"/problemdetail/" + item.get("id")}>
						<List.Item
							key={item.get('id')}
							actions={[
								// <IconText type="message" text={item.get("comment_num")}/>,
								<MessageOutlined style={{ marginRight: 8 }} type={'message'} text={item.get('comment_num')} />,
								<span>{item.get('problem_date')}</span>]}
							extra={<img width={272} alt='logo' src={item.get('problem_img')} />}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.getIn(['user', 'user_img'])} />}
								title={<span>{item.getIn(['user', 'user_name'])}</span>}
								description={item.get('problem_title')}
							/>
							{item.get('problem_content')}
						</List.Item>
					</Link>
				
				)}
			/>
		)
		
	}
}

const mapState = (state) => ({
	problemData: state.getIn(['home', 'problemData'])
});
const mapDispatch = (dispatch) => ({
	loadProblemData() {
		dispatch(actionCreators.loadProblemData())
	}
});
export default connect(mapState, mapDispatch)(Problem);

