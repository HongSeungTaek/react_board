import { useSelector, useDispatch } from "react-redux";
import { increseCount } from "../reducers/counter";

function Login({ location, history }) {
  
  // dispatch를 사용하기 위한 준비
  const dispatch = useDispatch();
  
  // store에 접근하여 state 가져오기
  const { count } = useSelector(state => state.counter);
  
  const increse = () => {
    // store에 있는 state 바꾸는 함수 실행
    dispatch(increseCount(1));
  };

  return(
    <div className="login-container">
      <div className="login-box">
        <div>
          {count}
          <input type="text" className="input-control"onClick={increse/*()=>{history.push('/board')}*/}/>
        </div>
        <div>
          <input type="password" className="input-control"/>
        </div>
      </div>
    </div>
  );
}


export default Login;