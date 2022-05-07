import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionCreators} from '../store';
import {SearchWrapper} from '../style';
import {Icon, Button, Input, AutoComplete} from 'antd';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

function renderOption(item) {
	return (
		<OptGroup label={<span>{item.get('type')}</span>}>
			<Option value={item.get('keyword')}>
				<Link to={"/searchlist/" + item.get('type_e') + "/" + item.get('keyword')}>
					<span className="certain-search-item-count">{item.get('msgNum')} 条搜索记录</span>
				</Link>
			</Option>
		</OptGroup>
	)
}

class SearchInput extends PureComponent {
	state = {
		input: ""
	};
	handleSearch = (value) => {
		this.setState({
			input: value
		})
		this.props.search(value)
	};
	
	render() {
		const searchData = this.props.searchData ? this.props.searchData : [];
		return (
			<SearchWrapper>
				<div className="global-search-wrapper" style={{width: 300}}>
					<AutoComplete
						className="global-search"
						size="large"
						style={{width: '100%'}}
						dataSource={searchData.map(renderOption)}
						onSearch={this.handleSearch}
						placeholder="搜索内容"
						optionLabelProp="text"
						ref={(input) => this.input = input}
					>
						<Input
							suffix={(
								<Link to={"/problemlist/" + this.state.input}>
									<Button className="search-btn" size="large" type="primary">
										<Icon type="search"/>
									</Button>
								</Link>
							)}
						/>
					</AutoComplete>
				</div>
			</SearchWrapper>
		);
	}
}

const mapState = (state) => ({
	searchData: state.getIn(['header', 'searchData']),
});
const mapDispatch = (dispatch) => ({
	search(value) {
		dispatch(actionCreators.searchInfo(value))
	},
	handleSubmit(input) {
		console.log(input);
		dispatch(actionCreators.searchSubmit())
	}
	
});
export default connect(mapState, mapDispatch)(SearchInput);