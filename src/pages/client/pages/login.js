import Form from '~/components/form';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import { LoadingData } from '~/components/loading';
import { DataContext } from '~/contexts/DataContext';
import { useContext, useEffect, useState } from 'react';

function Login() {
  document.title = 'Đăng Nhập';
  const dataContext = useContext(DataContext);
  const handleReload = dataContext.handleReload;
  const handleGoToTop = dataContext.handleGoToTop;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginFalse, setLoginFalse] = useState(false);

  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const handleLogin = async () => {
    if (username !== '' && password !== '') {
      setLoading(true);
      await $.post(
        process.env.REACT_APP_URL_API + 'users/login',
        { username: username, password: password },
        (response) => {
          localStorage.setItem('access_token', response.access_token);
          handleReload();
          navigate('/');
        },
      ).catch(() => {
        setLoading(false);
        setLoginFalse(true);
        navigate('/dang-nhap');
      });
    }
  };

  useEffect(() => {
    if (access_token !== null) {
      navigate('/');
    }
    handleGoToTop();
  }, []);
  return (
    <div className="form-login">
      {loading && <LoadingData title="Đang Đăng Nhập" />}
      <Form>
        <div className="container__content--box">
          <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
          {loginFalse && (
            <h4 style={{ color: 'red', fontWeight: 'bold', fontSize: 14 }}>Tài khoản hoặc mật khẩu sai!</h4>
          )}
          <div className="content__box--input">
            <label htmlFor="">Tài Khoản</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Nhập tài khoản" />
          </div>
          <div className="content__box--input">
            <label htmlFor="">Mật Khẩu</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Nhập mật khẩu" />
          </div>
          <div className="content__box--btn d-flex justify-content-center">
            <button onClick={handleLogin}>ĐĂNG NHẬP</button>
            {/* <button id="register">ĐĂNG KÍ</button> */}
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
