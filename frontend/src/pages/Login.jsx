import React, { useEffect, useRef } from 'react';
import { login } from '../utils/http';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/tests');
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="login">
        <h1 className="login__title">Login</h1>
        <input
          ref={usernameRef}
          value="admin"
          type="text"
          placeholder="Username"
          className="login__input"
        />
        <input ref={passwordRef} type="password" placeholder="Password" className="login__input" />
        <button
          onClick={() => {
            login({
              username: usernameRef.current?.value,
              password: passwordRef.current?.value,
            })
              .then((response) => {
                Cookies.set('token', response.token);
                navigate('/tests');
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          }}
          className="login__button">
          Login
        </button>
        {errorMessage && <div className="login__error">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default Login;
