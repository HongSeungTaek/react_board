import {useState, useEffect} from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Detail() {
  let { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  axios.get('board/'+boardId).then(function(res) {
    setTitle(res.data.data.title);
    setContent(res.data.data.content);
  });

  const fnMod = () => {
    //history.push('/editor');
  }

  return(
    <div>
      <Link to="/">뒤로가기</Link>
      <div>
        <div>
          제목:{title}
        </div>
        <div>
          내용:{content}
        </div>
        <button onClick={fnMod}>수정</button>
      </div>
    </div>
  );
}


export default Detail;