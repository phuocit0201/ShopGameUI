import { useEffect } from 'react';
import Form from '~/components/form';
import $ from 'jquery';
function Login() {
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
                        <input type="text" placeholder="Nhập tài khoản" />
                    </div>
                    <div className="content__box--input">
                        <label htmlFor="">Mật Khẩu</label>
                        <input type="password" placeholder="Nhập mật khẩu" />
                    </div>
                    <div className="content__box--btn d-flex justify-content-center">
                        <button id="login">ĐĂNG NHẬP</button>
                        <button id="register">ĐĂNG KÍ</button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Login;
