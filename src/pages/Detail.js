import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Reply from '../component/Reply';

function Detail({ location, history }) {
  let { boardId } = useParams();
  const [pageType, setPageType] = useState('D');
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  let detail = {};

  const [reply, setReply] = useState();
  const [replyList, setReplyList] = useState([]);

  const getOne = () => {
    axios.get('board/'+boardId).then(function(res) {
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
      setReplyList(res.data.data.replyList);
      detail = {
        'title': title,
        'content': content
      }
    });
  }

  if(title == undefined && content == undefined) {
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
  const fnAddReply = () => {
    if(window.confirm('댓글을 등록하시겠습니까?')) {
      axios.post('reply/add', {
        'board_id': boardId,
        'content': reply
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
        {/* {pageType == 'D' && <button onClick={() => { setPageType('M'); }}>수정</button>} */}
        {pageType == 'D' && <button onClick={() => { setPageType('M'); }}>수정</button>}
        {pageType == 'D' && <button onClick={fnDelete}>삭제</button>}
        {/*pageType == 'M' && <button onClick={() => { setPageType('D'); }}>취소</button>}
        {pageType == 'M' && <button onClick={fnSave}>저장</button>} */}
      </div>
      {pageType == 'D' && 
      <div>
        <textarea value={reply} onChange={({ target: { value }}) => setReply(value) }/>
        <button onClick={fnAddReply}>댓글달기</button>
      </div>
      }
      <div>
        {replyList.map(item => (
          <Reply data={item}></Reply>
        ))}
      </div>
    </div>
  );
}


export default Detail;