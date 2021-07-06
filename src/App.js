import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Login, Board, Editor, Detail } from './common/Router';

import axios from 'axios';

function App() {
  axios.defaults.baseURL = "http://localhost:8080";

  return (
    <div className="App">
      <Route exact path="/" component={Login}/>
      <Route path="/board" component={Board}/>
      <Route path="/board/editor" component={Editor}/>
      <Route path="/board/detail/:boardId" component={Detail}/>
    </div>
  );
}

export default App;
