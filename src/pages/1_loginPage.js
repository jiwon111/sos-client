import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import '../assets/styles/1_loginPage.css';
import { useMediaQuery } from 'react-responsive';
const Login = () => {
  const isPc = useMediaQuery({
    query: '(min-width:768px)',
  });
  const isMobile = useMediaQuery({ query: '(max-width:767px)' });
  const [loading, setLoading] = useState(0);
  const [name, setName] = useState('');
  const history = useHistory();
  const [cookie, setCookie] = useCookies(['access_token']);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const getAuth = async () => {
    setLoading(1);
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${cookie.access_token}`,
        },
        method: 'GET',
      },
    );

    const data = await response.json();
    setName(data.name);

    if (data.role === 0) history.push('/seat-reservation');
    else if (data.role === 1) history.push('/user-management');
  };

  useEffect(() => {
    if (cookie.access_token !== 'undefined') getAuth();
  }, [cookie]);

  const loginClickHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_BASE_URL}/auth`,
      {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(login),
      },
    );

    const data = await response.json();

    if (response.status === 200) {
      setCookie('access_token', data.access_token);
    } else {
      alert(data.message);
    }
  };

  const inputEmail = e => {
    setLogin({ ...login, email: e.target.value });
  };

  const inputPw = e => {
    setLogin({ ...login, password: e.target.value });
  };

  return (
    <>
      {isPc && (
        <div className="container login">
          <div className="left">
            <img src={Logo} alt="Logo" style={{ width: '80%' }} />
          </div>
          <div className="line"> </div>
          <div className="right">
            <div className="login-form" style={{ marginBottom: '17px' }}>
              <input
                type="text"
                className="form-control-login"
                placeholder="이메일"
                onChange={inputEmail}
                value={login.email}
              />
              <input
                type="password"
                className="form-control-login"
                placeholder="비밀번호"
                onChange={inputPw}
                value={login.password}
              />
            </div>

            <button className="Button Login" onClick={loginClickHandler}>
              로그인
            </button>
            <p className="or">계정이 없으신가요?</p>
            <Link to="/sign-up">
              <button className="Button Register">회원가입</button>
            </Link>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="m_login">
          <div className="m_left">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: '80%', marginLeft: '10%' }}
            />
          </div>
          <div className="m_line"> </div>
          <div className="m_right">
            <div className="m_login-form" style={{ marginBottom: '15px' }}>
              <input
                type="text"
                className="m_form-control-login"
                placeholder="이메일"
                onChange={inputEmail}
                value={login.email}
              />
              <input
                type="password"
                className="m_form-control-login"
                placeholder="비밀번호"
                onChange={inputPw}
                value={login.password}
              />
            </div>

            <button className="m_Button Login" onClick={loginClickHandler}>
              로그인
            </button>
            <p className="or">계정이 없으신가요?</p>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
              {' '}
              <p
                style={{
                  textDecoration: 'underline #c00000',
                  color: '#c00000',
                  cursor: 'pointer',
                  fontSize: '0.9em',
                  marginTop: '4%',
                }}
              >
                회원가입
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
