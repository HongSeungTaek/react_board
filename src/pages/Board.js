import {useState, useEffect} from 'react';
import axios from 'axios';

import Const from '../Const';
import CommonUtil from '../CommonUtil';

function Board() {
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
      'offset': (page-1) * pageCnt
    };
    const response = await axios.post('board/list', param);
    console.log(response);
    setList(response.data.list);
    setTotalCnt(response.data.totalCnt);
    
    let _pagination = CommonUtil.createPagination(page, response.data.totalCnt, pageCnt);
    setPagiNation(_pagination);
  };

  useEffect(()=>{
    fnSearch();
  }, [page]);


  console.log("render=>"+page);
  return (
    <>
    page: {page} / totalCnt: {totalCnt} / pageCnt: {pageCnt} / pagiNation: ({pagiNation.prev?1:-1}){pagiNation.list}({pagiNation.next?1:-1})
    <br/>
    <button className="btn" onClick={fnSearch}>조회</button>
    {/* 아래 select 따로 빼기 예정 */}
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
          <BoardItem data={item} key={item.boardId}/>
        ))}
      </tbody>
    </table>
    <PagiNation pagiNation={pagiNation} setPage={setPage}/>
    </>
  );
}

function BoardItem({data}) {
  return (
    <tr>
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