import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '~/components/form';
import { DataContext } from '~/contexts/DataContext';
import $ from 'jquery';
import { LoadingData } from '~/components/loading';
import Swal from 'sweetalert2';
function Register() {
    document.title = 'Đăng Kí';
    const dataContext = useContext(DataContext);
    const handleGoToTop = dataContext.handleGoToTop;
    const baseUrl = dataContext.baseUrl;
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const data = {
        username: username,
        password: password,
        name: fullName,
        email: email,
    };
    const [error, setError] = useState(data);
    //gửi dữ liệu lên server
    const handleRegister = async () => {
        console.log(error);
        if (
            error.username === '' &&
            error.password === '' &&
            error.confirmPassword === '' &&
            error.fullName === '' &&
            error.email === ''
        ) {
            setLoading(true);
            await $.post(baseUrl + 'users/create', data, (response) => {
                if (response.status === true) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Đăng Kí Thành Công',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setTimeout(() => {
                        navigate('/dang-nhap');
                    }, 1500);
                } else {
                    if (response.status === false) {
                        response.errors.email && setError((pre) => ({ ...pre, email: response.errors.email[0] }));
                        response.errors.username &&
                            setError((pre) => ({ ...pre, username: response.errors.username[0] }));
                    }
                }
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }
    };
    //kiểm tra username
    const handleValidationUsername = () => {
        if (username.length >= 6 && username.length <= 50 && username.match(/[^a-zA-Z0-9]/) === null) {
            setError((pre) => ({ ...pre, username: '' }));
        } else {
            setError((pre) => ({ ...pre, username: 'Tài khoản phải từ 6 - 50 kí tự và không chứa kí tự đặc biệt' }));
        }
    };
    //kiểm tra password
    const handleValidationPassword = () => {
        if (password.length >= 6 && password.length <= 50 && password.match(/[^a-zA-Z0-9]/) === null) {
            setError((pre) => ({ ...pre, password: '' }));
        } else {
            setError((pre) => ({ ...pre, password: 'Mật khẩu phải từ 6 - 50 kí tự và không chứa kí tự đặc biệt' }));
        }
    };
    //kiểm tra xác nhận mật Khẩu
    const handleValidationConfirmPass = () => {
        if (confirmPassword === password) {
            setError((pre) => ({ ...pre, confirmPassword: '' }));
        } else {
            setError((pre) => ({ ...pre, confirmPassword: 'Xác nhận mật khẩu không khớp' }));
        }
    };
    //kiểm tra họ và tên
    const handleValidationFullName = () => {
        if (fullName.length >= 1 && fullName.length <= 50) {
            setError((pre) => ({ ...pre, fullName: '' }));
        } else {
            setError((pre) => ({ ...pre, fullName: 'Tên phải từ 1 - 50 kí tự' }));
        }
    };
    //kiểm tra email
    const handleValidationEmail = () => {
        if (email.search('@') >= 0) {
            setError((pre) => ({ ...pre, email: '' }));
        } else {
            setError((pre) => ({ ...pre, email: 'Email không đúng định dạng' }));
        }
    };
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            navigate('/');
        }
        handleGoToTop();
    }, []);
    return (
        <div className="form-register">
            {loading && <LoadingData title="Chờ xử lý" />}
            <Form>
                <div className="container__content--box">
                    <h3>ĐĂNG KÍ TÀI KHOẢN</h3>
                    <div className="content__box--input">
                        <label htmlFor="">Tài Khoản</label>
                        {error.username !== '' && <span style={{ color: 'red' }}>{error.username}</span>}
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={handleValidationUsername}
                            type="text"
                            placeholder="Nhập tài khoản"
                        />
                    </div>
                    <div className="content__box--input">
                        <label htmlFor="">Mật Khẩu</label>
                        {error.password !== '' && <span style={{ color: 'red' }}>{error.password}</span>}
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleValidationPassword}
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <div className="content__box--input">
                        <label htmlFor="">Xác Nhận Mật Khẩu</label>
                        {error.confirmPassword !== '' && <span style={{ color: 'red' }}>{error.confirmPassword}</span>}
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            onBlur={handleValidationConfirmPass}
                        />
                    </div>
                    <div className="content__box--input">
                        {error.fullName !== '' && <span style={{ color: 'red' }}>{error.fullName}</span>}
                        <label htmlFor="">Họ Tên</label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            type="text"
                            placeholder="Nhập họ và tên"
                            onBlur={handleValidationFullName}
                        />
                    </div>
                    <div className="content__box--input">
                        {error.email !== '' && <span style={{ color: 'red' }}>{error.email}</span>}
                        <label htmlFor="">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Nhập email"
                            onBlur={handleValidationEmail}
                        />
                    </div>
                    <div className="content__box--btn d-flex justify-content-center">
                        <button onClick={handleRegister}>ĐĂNG KÍ</button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Register;
