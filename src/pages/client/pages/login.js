import { useEffect, useState } from 'react';
import Form from '~/components/form';
import $ from 'jquery';
import API from '~/services/rest-client';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        if (username !== '' && password !== '') {
            API.post('api/v1/users/login', { username: username, password: password })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access_token);
                })
                .catch((response) => {
                    console.log(response.response.data.status);
                });
        }
    };
    useEffect(() => {
        $('html, body').animate({ scrollTop: 0 }, 0);
    }, []);
    return (
        <div className="form-login">
            <Form>
                <div className="container__content--box">
                    <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
                    <div className="content__box--input">
                        <label htmlFor="">Tài Khoản</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Nhập tài khoản" />
                    </div>
                    <div className="content__box--input">
                        <label htmlFor="">Mật Khẩu</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <div className="content__box--btn d-flex justify-content-center">
                        <button onClick={handleLogin}>ĐĂNG NHẬP</button>
                        <button id="register">ĐĂNG KÍ</button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Login;
