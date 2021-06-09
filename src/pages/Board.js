import {useState, useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

import { Form, FormControl, Button, Selection, Pagination } from 'react-bootstrap';
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';

import '../common.css';
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
  
  const columns = [
    {name: 'boardId', header: 'No'},
    {name: 'title', header: '제목'},
    {name: 'content', header: '내용'},
    {name: 'insertDate', header: '만든날짜'}
  ];

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

  const fnDetail = (rowKey) => {
    history.push('/detail/'+list[rowKey].boardId);
  }

  useEffect(()=>{
    fnSearch();
  }, [page]);

  return (
    <>
    <div>
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
    <Grid
      data={list}
      columns={columns}
      rowHeight={30}
      bodyHeight={500}
      rowHeaders={['rowNum']}
      onClick={(data) => fnDetail(data.rowKey)}
    />
    <div className="pagination-box">
      <BoardPagiNation pagiNation={pagiNation} setPage={setPage}/>
    </div>
    </>
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