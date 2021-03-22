import {useState} from 'react';
import axios from 'axios';

import Const from './Const';

function BoardList() {
  const [page, setPage] = useState(1);
  const [pageCnt, setPageCnt] = useState(10);
  const [pagiNation, setPagiNation] = useState([1]);
  const [list, setList] = useState([
    {
      boardId: 11,
      content: "-",
      insertDate: "-",
      title: "-"
    },
    {
      boardId: 22,
      content: "-",
      insertDate: "-",
      title: "-"
    }
  ]);

  async function fnSearch() {
    let param = {
      'page': page,
      'pageCnt': pageCnt,
      'offset': (page-1) * pageCnt
    };
    const response = await axios.post('board/list', param);
    setList(response.data.list);

    let totalCnt = response.data.totalCnt;
    //setPagiNation();
  }

  function changePageCnt(e) {
    setPageCnt(parseInt(e.target.value));
  }

  return (
    <>
    <button className="btn" onClick={fnSearch}>조회</button>
    {/* 아래 select 따로 빼기 예정 */}
    <select onChange={changePageCnt}>
      {Const.PAGE_COUNT.map(item => (
        <option value={item}>{item}</option>
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
    {/* 페이지네이션 구현 예정 */}
    {/* <PagiNation pagiNation={pagiNation}/> */}
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

function PagiNation({pagiNation}) {
  return (
    <ul>
      {pagiNation.map(item => (
        <li key={item}><a>{item}</a></li>
      ))}
    </ul>
  );
}

export default BoardList;