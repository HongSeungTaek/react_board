import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Editor({ data, history }) {
  console.log(data);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fnAdd = async () => {
    let param = {
      'title': title,
      'content': content.replace(/(?:\r\n|\r|\n)/g, '<br/>')
    };
    const res = await axios.post('board/add', param);
    if(res.data.resCode == 1) {
      alert('등록완료');
      history.push('/');
    }

  }

  return(
    <div>
      <Link to="/">뒤로가기</Link>
      <div>
        <div>
          제목: <input type="text" value={title} onChange={({ target: { value }}) => setTitle(value) }/>
        </div>
        <div>
          내용: <textarea value={content} onChange={({ target: { value }}) => setContent(value) }/>
        </div>
        <button onClick={fnAdd}>등록</button>
      </div>
    </div>
  );
}


export default Editor;