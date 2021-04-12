import {useState, useEffect} from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Detail({ location, history }) {
  let { boardId } = useParams();
  const [pageType, setPageType] = useState('D');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  let detail = {};

  const getOne = () => {
    axios.get('board/'+boardId).then(function(res) {
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
      detail = {
        'title': title,
        'content': content
      }
    });
  }

  if(pageType == 'D') {
    getOne(); 
  }

  const fnSave = () => {
    axios.post('board/mod', {
      'boardId': boardId,
      'title': title,
      'content': content
    }).then(function(res) {
      setPageType('D');
    });
  }
  const fnDelete = () => {
    if(window.confirm('삭제하시겠습니까?')) {
      axios.post('board/del', {
        'boardId': boardId
      }).then(function(res) {
        history.push('/');
      });
    }
  }

  return(
    <div>
      <Link to="/">뒤로가기</Link>
      <div>
        <div>
          제목:
          {pageType == 'D'
          ?title
          :<input type="text" value={title} onChange={({ target: { value }}) => setTitle(value) }/>
          }
        </div>
        <div>
          내용:
          {pageType == 'D'
          ?content
          :<textarea value={content} onChange={({ target: { value }}) => setContent(value) }/>}
        </div>
        {pageType == 'D' && <button onClick={() => { setPageType('M'); }}>수정</button>}
        {pageType == 'D' && <button onClick={fnDelete}>삭제</button>}
        {pageType == 'M' && <button onClick={() => { setPageType('D'); }}>취소</button>}
        {pageType == 'M' && <button onClick={fnSave}>저장</button>}
      </div>
    </div>
  );
}


export default Detail;