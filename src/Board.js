import {useState} from 'react';
import axios from 'axios';

function BoardList() {
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
    const response = await axios.post('board/list',{});
    setList(response.data);
  }

  return (
    <>
    <button className="btn" onClick={fnSearch}>조회</button>
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

export default BoardList;