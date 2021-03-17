import {useState} from 'react';
import './App.css';
import axios from 'axios';



function App() {
  axios.defaults.baseURL = "http://localhost:8080";
  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <div className="title">타아이틀</div>
    </div>
  );
}
 
function Content() {
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

  function fnSearch() {
    axios.post('board/list',{}).then(function(data) {
      setList(data.data);
    });
  }

  return (
    <div className="content">
      <div className="list">
        <button className="btn" onClick={fnSearch}>조회</button>
        <BoardList list={list}/>
      </div>
    </div>
  );
}

function BoardList({list}) {
  return (
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

export default App;
