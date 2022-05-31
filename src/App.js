import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store';
import 'video-react/dist/video-react.css';
import 'antd/dist/antd.css';
import Home from './page/home';
import Login from './page/login';
import Register from './page/register';
import NewsDetail from './page/newDetail';
import ProblemDetail from './page/problemDetail';
import QuestionDetail from './page/questionDetail/index';
import ProblemList from './page/problemList';
import QuestionList from './page/questionList';
import ClassDetail from './page/classDetail';
import Term from './page/term/index';
import Publish from './page/publish';
import Resource from './page/resource';
import My from './page/my';
import MsgList from './page/MsgList';
import Modify from './page/modify';
import SearchList from './page/searchList'
import Code from './page/Code'
import Course from './page/course'
import './statics/iconfont/iconfont.css'


class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Home}/>
            <Route path="/term" exact component={Term}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/newsdetail/:id" exact component={NewsDetail}/>
            <Route path="/problemdetail/:id" exact component={ProblemDetail}/>
            <Route path="/problemlist" exact component={ProblemList}/>
            <Route path="/questionlist" exact component={QuestionList}/>
            <Route path="/questiondetail/:id" exact component={QuestionDetail}/>
            <Route path="/classdetail/:classid/:chapterid" exact component={ClassDetail}/>
            <Route path="/searchlist/:type/:search" exact component={SearchList}/>
            <Route path="/my" exact component={My}/>
            <Route path="/msg" exact component={MsgList}/>
            <Route path="/publish" exact component={Publish}/>
            <Route path="/modify" exact component={Modify}/>
						<Route path='/resource' exact component={Resource} />
            <Route path='/code' exact component={Code} />
            <Route path='/course' exact component={Course} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
  
}

export default App;