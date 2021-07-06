
function Login({ location, history }) {

  return(
    <div className="login-container">
      <div className="login-box">
        <div>
          <input type="text" className="input-control"onClick={()=>{history.push('/board')}}/>
        </div>
        <div>
          <input type="password" className="input-control"/>
        </div>
      </div>
    </div>
  );
}


export default Login;