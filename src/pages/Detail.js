import {useState, useEffect} from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Detail() {
  let { boardId } = useParams();
  const [pageType, setPageType] = useState('D');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  let detail = {};

  axios.get('board/'+boardId).then(function(res) {
    setTitle(res.data.data.title);
    setContent(res.data.data.content);
    detail = {
      'title': title,
      'content': content
    }
  });

  const fnMod = () => {
    setPageType('M');
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
        {pageType == 'D'
        ?<button onClick={fnMod}>수정</button>
        :<button>취소</button>
        }
      </div>
    </div>
  );
}


export default Detail;