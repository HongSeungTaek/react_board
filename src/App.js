import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Login, Board, Editor, Detail } from './pages';
import MenuList from './Menu';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "http://localhost:8080";

  return (
    <div className="App">
      <Login/>
      {/* <SideBar/>
      <Nav/>
      <Content/> */}
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
        <Route exact path="/" component={Board}/>
        <Route path="/editor" component={Editor}/>
        <Route path="/detail/:boardId" component={Detail}/>
      </div>
    </div>
  );
}

export default App;
