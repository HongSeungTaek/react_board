import {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import { Form, FormControl, Button, Selection, Pagination } from 'react-bootstrap';
import MenuList from '../component/Menu';
import Const from '../common/Const';
import Util from '../common/Util';

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
    
    let _pagination = Util.createPagination(page, response.data.totalCnt, pageCnt);
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
    <div className="sidebar">
      <div className="header">게시판</div>
      <MenuList/>
    </div>
    <div className="top-nav">
      <div className="title">타아이틀</div>
    </div>
    <div className="content">
      <div className="list">
        <FormControl className="input-xl dib vt"
          placeholder="검색어를 입력하십시오"
          value={keyword} onChange={({ target: { value }}) => setKeyword(value) }
        />
        <Button variant="primary" onClick={fnSearch}>조회</Button>
        <select onChange={(e) => setPageCnt(parseInt(e.target.value))}>
          {Const.PAGE_COUNT.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <Link to="/editor">글쓰기</Link>

      <table className="data-grid">
        <colgroup width="100"/>
        <colgroup width="250"/>
        <colgroup/>
        <colgroup width="200"/>
        <thead>
          <tr>
            <th><div>No</div></th>
            <th><div>제목</div></th>
            <th><div>내용</div></th>
            <th><div>만든날짜</div></th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <BoardItem data={item} fnDetail={fnDetail} key={item.boardId}/>
          ))}
        </tbody>
      </table>

      <div className="pagination-box">
        <BoardPagiNation pagiNation={pagiNation} setPage={setPage}/>
      </div>
    </div>
    </>
  );
}

function BoardItem({data,fnDetail}) {
  return (
    <tr onClick={() => fnDetail(data.boardId)}>
      <td><div>{data.boardId}</div></td>
      <td><div>{data.title}</div></td>
      <td><div>{data.content}</div></td>
      <td><div>{data.insertDate}</div></td>
    </tr>
  );
}

function BoardPagiNation({pagiNation, setPage}) {
  return (
    <Pagination>
      {pagiNation.prev &&
        <Pagination.Prev onClick={()=>setPage(pagiNation.prevValue)}></Pagination.Prev>}
      
      {pagiNation.list.map(item => (
        <Pagination.Item key={item} onClick={()=>setPage(item)}
          active={item === pagiNation.currentPage}>
          {item}
        </Pagination.Item>
      ))}

      {pagiNation.next &&
        <Pagination.Next onClick={()=>setPage(pagiNation.nextValue)}></Pagination.Next>}
    </Pagination>
  );
}

export default Board;