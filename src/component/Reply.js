import {useState, useEffect} from 'react';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Reply({ data }) {
  console.log(data);
  return (
    <div>{data.content}</div>
  );
}

export default Reply;