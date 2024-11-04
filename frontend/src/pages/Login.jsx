import React, { useRef } from 'react';
import Sidebar from '../components/Sidebar';
import { login } from '../http';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      <Sidebar />
      <div>
        <h1>Login</h1>
        <input ref={usernameRef} type="text" placeholder="Username" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button
          onClick={() => {
            login({
              username: usernameRef.current?.value,
              password: passwordRef.current?.value,
            }).then((response) => {
              Cookies.set('token', response.token);
              navigate('/tests');
            });
          }}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
