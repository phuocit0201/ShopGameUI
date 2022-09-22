import LayoutSystem from '../components/layout-system';
import '~/components/form/form.css';
import '~/asset/client/css/change-password.css';
import { useContext, useState } from 'react';
import { DataContext } from '~/contexts/DataContext';
import { Loading } from '~/components/loading';
import $ from 'jquery';
function ChangePassword() {
  const title = 'ĐỔI MẬT KHẨU';
  document.title = title;
  const dataContext = useContext(DataContext);
  const baseUrl = dataContext.baseUrl;
  const handleReload = dataContext.handleReload;
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordOld, setPasswordOld] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState({
    password_old: '',
    password_new: '',
    password_confirm: '',
  });

  console.log(status);

  const handleValidationPasswordOld = (e) => {
    setPasswordOld(e.target.value);
    if (e.target.value.length >= 6 && e.target.value.length <= 50 && e.target.value.match(/[^a-zA-Z0-9]/) === null) {
      setError((pre) => ({ ...pre, password_old: '' }));
    } else {
      setError((pre) => ({ ...pre, password_old: 'Mật khẩu phải từ 6 - 50 kí tự và không chứa kí tự đặc biệt' }));
    }
  };
  const handleValidationPassword = (e) => {
    setPasswordNew(e.target.value);
    if (e.target.value.length >= 6 && e.target.value.length <= 50 && e.target.value.match(/[^a-zA-Z0-9]/) === null) {
      setError((pre) => ({ ...pre, password_new: '' }));
    } else {
      setError((pre) => ({ ...pre, password_new: 'Mật khẩu phải từ 6 - 50 kí tự và không chứa kí tự đặc biệt' }));
    }
    if (confirmPassword.length > 0 && confirmPassword !== e.target.value) {
      setError((pre) => ({ ...pre, password_confirm: 'Xác nhận mật khẩu không đúng' }));
    } else {
      setError((pre) => ({ ...pre, password_confirm: '' }));
    }
  };

  const handleValidationPasswordConfirm = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === passwordNew) {
      setError((pre) => ({ ...pre, password_confirm: '' }));
    } else {
      setError((pre) => ({ ...pre, password_confirm: 'Xác nhận mật khẩu không đúng' }));
    }
  };

  const handleChangePassword = () => {
    if (error.password_new === '' && error.password_confirm === '') {
      setLoading(true);
      $.ajax({
        url: baseUrl + 'users/change-password',
        type: 'PUT',
        data: {
          password_old: passwordOld,
          password_new: passwordNew,
          password_confirm: confirmPassword,
          token: localStorage.getItem('access_token'),
        },
      })
        .done((response) => {
          if (response.status === true) {
            localStorage.setItem('access_token', response.access_token);
            setLoading(false);
            setStatus(true);
            setPasswordOld('');
            setPasswordNew('');
            setConfirmPassword('');
          } else {
            setStatus(false);
            response.errors.password_confirm &&
              setError((pre) => ({ ...pre, password_confirm: response.errors.password_confirm[0] }));
            response.errors.password_new &&
              setError((pre) => ({ ...pre, password_new: response.errors.password_new[0] }));
            response.errors.password_old &&
              setError((pre) => ({ ...pre, password_old: response.errors.password_old[0] }));
          }
          setLoading(false);
        })
        .catch(() => {
          handleReload();
          setLoading(false);
        });
    }
  };
  return (
    <LayoutSystem title={title}>
      {loading && <Loading />}
      <div className="container__change-password">
        <div className="container__change-password--form">
          <div className="content__box--input">
            {status && <span className="message-successfully">Thay đổi mật khẩu thành công</span>}
            <label htmlFor="">Mật Khẩu Cũ</label>
            {error.password_old !== '' && <span className="message-error">{error.password_old}</span>}
            <input
              value={passwordOld}
              onChange={handleValidationPasswordOld}
              type="password"
              placeholder="Nhập mật khẩu cũ"
            />
          </div>
          <div className="content__box--input">
            <label htmlFor="">Mật Khẩu Mới</label>
            {error.password_new !== '' && <span className="message-error">{error.password_new}</span>}
            <input
              value={passwordNew}
              onChange={handleValidationPassword}
              type="password"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div className="content__box--input">
            <label htmlFor="">Xác Nhận Mật Khẩu Mới</label>
            {error.password_confirm !== '' && <span className="message-error">{error.password_confirm}</span>}
            <input
              value={confirmPassword}
              onChange={handleValidationPasswordConfirm}
              type="password"
              placeholder="Xác nhận mật khẩu cũ"
            />
          </div>
        </div>
        <div className="content__box--btn d-flex justify-content-center">
          <button onClick={handleChangePassword}>Đổi Mật Khẩu</button>
        </div>
      </div>
    </LayoutSystem>
  );
}

export default ChangePassword;
