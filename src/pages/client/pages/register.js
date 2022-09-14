import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '~/components/form';
import { DataContext } from '~/contexts/DataContext';
function Register() {
    document.title = 'Đăng Kí';
    let navigate = useNavigate();
    const handleGoToTop = useContext(DataContext).handleGoToTop;
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            navigate('/');
        }
        handleGoToTop();
    }, []);
    return (
        <div className="form-register">
            <Form>
                <div className="container__content--box">
                    <h3>ĐĂNG KÍ TÀI KHOẢN</h3>
                    <div className="content__box--input">
                        <label htmlFor="">Tài Khoản</label>
                        <input type="text" placeholder="Nhập tài khoản" />
                    </div>
                    <div className="content__box--input">
                        <label htmlFor="">Mật Khẩu</label>
                        <input type="password" placeholder="Nhập mật khẩu" />
                    </div>
                    <div className="content__box--input">
                        <label htmlFor="">Xác Nhận Mật Khẩu</label>
                        <input type="password" placeholder="Xác nhận mật khẩu" />
                    </div>
                    <div className="content__box--btn d-flex justify-content-center">
                        <Link to="/login">
                            <button id="login">ĐĂNG NHẬP</button>
                        </Link>
                        <button id="register">ĐĂNG KÍ</button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Register;
