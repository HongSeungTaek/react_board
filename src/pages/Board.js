import {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Board({history}) {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [pageCnt, setPageCnt] = useState(10);
  const [pagiNation, setPagiNation] = useState({
    'prev': false,
    'list': [],
    'next': false
  });
  const [list, setList] = useState([]);

  const fnSearch = async () => {
    let param = {
      'page': page,
      'pageCnt': pageCnt,
      'offset': (page-1) * pageCnt,
      'keyword': keyword
    };

    const response = await axios.post('board/list', param);

    setList(response.data.list);
    setTotalCnt(response.data.totalCnt);
    
    let _pagination = CommonUtil.createPagination(page, response.data.totalCnt, pageCnt);
    setPagiNation(_pagination);
  };

  const fnDetail = (boardId) => {
    history.push('/detail/'+boardId);
  }

  useEffect(()=>{
    fnSearch();
  }, [page]);

  return (
    <>
    <input type="text" value={keyword} onChange={({ target: { value }}) => setKeyword(value) }/>
    <button className="btn" onClick={fnSearch}>조회</button>
    <Link to="/editor">글쓰기</Link>
    <select onChange={(e) => setPageCnt(parseInt(e.target.value))}>
      {Const.PAGE_COUNT.map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>내용</th>
          <th>만든날짜</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <BoardItem data={item} fnDetail={fnDetail} key={item.boardId}/>
        ))}
      </tbody>
    </table>
    <PagiNation pagiNation={pagiNation} setPage={setPage}/>
    </>
  );
}

function BoardItem({data,fnDetail}) {
  return (
    <tr onClick={() => fnDetail(data.boardId)}>
      <td>{data.boardId}</td>
      <td>{data.title}</td>
      <td>{data.content}</td>
      <td>{data.insertDate}</td>
    </tr>
  );
}

function PagiNation({pagiNation, setPage}) {
  return (
    <ul>
      {pagiNation.prev && <li onClick={()=>setPage(pagiNation.prevValue)}><a href="#!">prev</a></li>}
      
      {pagiNation.list.map(item => (
        <li key={item} onClick={()=>setPage(item)}><a href="#!">{item}</a></li>
      ))}
      
      {pagiNation.next && <li onClick={()=>setPage(pagiNation.nextValue)}><a href="#!">next</a></li>}
    </ul>
  );
}

export default Board;