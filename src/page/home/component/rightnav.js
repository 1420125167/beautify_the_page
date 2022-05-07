import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {RightNavItem1, RightNavItem2, RightNavItem3, RightNav} from '../style';

class History extends Component {
  render() {
    return (
      <RightNav>
        <Link to="/problemlist"><RightNavItem1> 问题</RightNavItem1></Link>
        <Link to="/term"><RightNavItem2> AI术语</RightNavItem2></Link>
        <Link to="/questionlist"><RightNavItem3> 官方手册</RightNavItem3></Link>
        <Link to="/resource"><RightNavItem3> 资源下载</RightNavItem3></Link>
      </RightNav>
    )
  }
}

export default History;

