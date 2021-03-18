import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import BoardList from './Board';
import MenuList from './Menu';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "http://localhost:8080";

  return (
    <div className="App">
      <SideBar/>
      <Nav/>
      <Content/>
    </div>
  );
}

function SideBar() {
  return (
    <div className="sidebar">
      <div className="header">게시판</div>
      <MenuList/>
    </div>
  );
}

function Nav() {
  return (
    <div className="top-nav">
      <div className="title">타아이틀</div>
    </div>
  );
}

function Content() {

  return (
    <div className="content">
      <div className="list">
        <BoardList/>
      </div>
    </div>
  );
}

export default App;
