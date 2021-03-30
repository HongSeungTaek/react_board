import {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Editor() {
  return(
    <div>
      <Link to="/">뒤로가기</Link>
    </div>
  );
}


export default Editor;