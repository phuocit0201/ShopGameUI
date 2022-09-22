import '~/asset/client/css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '~/asset/fontawesome-free-5.15.3/css/all.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '~/asset/client/images/logo/logo.png';
import $ from 'jquery';
import { useEffect, useContext } from 'react';
import { DataContext } from '~/contexts/DataContext';
import { Logout } from '~/services/users';
import { LoadingData } from '~/components/loading';
function Header() {
  const dataContext = useContext(DataContext).data;
  const handleReload = useContext(DataContext).handleReload;
  const setDataContext = useContext(DataContext).setData;
  const [loading, isLogout, handleLogout, setIsLogout] = Logout();
  const navigate = useNavigate();
  const handleScroll = () => {
    if (window.scrollY > 10 && $(window).width() > 991) {
      $('.header').addClass('stick');
      $('.header-content').css('padding', '15px 30px');
    } else if (window.scrollY < 10 && $(window).width() > 991) {
      $('.header').removeClass('stick');
      $('.header-content').css('padding', '30px 15px');
    }
  };
  useEffect(() => {
    if (isLogout === true) {
      setDataContext(null);
      setIsLogout(false);
      navigate('/');
    }
  }, [isLogout]);
  const handelResize = () => {
    if ($(window).width() <= 991) {
      $('.header-content').css('padding', '10px 15px');
      $('.nav-menu__content li').click(() => {
        $('.nav-menu').hide();
      });
    } else {
      handleScroll();
    }
  };

  useEffect(() => {
    if ($(window).width() <= 991) {
      $('.nav-menu__content li').click(() => {
        $('.nav-menu').hide();
      });
    }
  }, []);

  const handleTogle = () => {
    $('.nav-menu').slideToggle();
  };
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handelResize);

  return (
    <header className="header container-fluid">
      {loading && <LoadingData title="Đang Đăng Xuất" />}
      <div className="header-content container">
        <div className="header-moible">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav__mobile--container d-lg-none d-xl-none">
            <div className="nav__mobile--content">
              <i onClick={handleTogle} id="toggle" className="fas fa-bars"></i>
            </div>
          </div>
        </div>
        <nav className="nav-menu">
          <ul className="nav-menu__content">
            <li>
              <NavLink onClick={handleReload} className="left" to="/">
                Trang Chủ
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleReload} className="left" to="/nap-the-cao">
                Nạp Tiền
              </NavLink>
            </li>
            <li>
              {dataContext ? (
                <NavLink onClick={handleReload} className="right" to="/thong-tin-tai-khoan">
                  <i className="far fa-user"></i> {dataContext.name}
                </NavLink>
              ) : (
                <NavLink className="right" to="/dang-nhap">
                  <i className="far fa-user"></i> Đăng Nhập
                </NavLink>
              )}
            </li>
            <li>
              {dataContext ? (
                <button onClick={handleLogout} className="right logout">
                  <i className="fas fa-sign-out-alt"></i>
                  <i className="fa-solid fa-right-from-bracket"></i> Đăng Xuất
                </button>
              ) : (
                <NavLink className="right" to="/dang-ki">
                  <i className="fas fa-plus"></i>
                  <i className="far fa-user"></i> Đăng Kí
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
