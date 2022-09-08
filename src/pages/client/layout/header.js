import '~/asset/client/css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '~/asset/fontawesome-free-5.15.3/css/all.min.css';
import { Link } from 'react-router-dom';
import logo from '~/asset/client/images/logo/logo.png';
import sale from '~/asset/client/images/home/sale.gif';
import $ from 'jquery';
function Header() {
    const handleScroll = () => {
        if (window.scrollY > 10) {
            $('.header').addClass('stick');
            $('.header-content').css('padding', '15px 30px');
        } else {
            $('.header').removeClass('stick');
            $('.header-content').css('padding', '30px 15px');
        }
    };

    window.addEventListener('scroll', handleScroll);
    return (
        <header className="header container-fluid">
            <div className="header-content container d-flex justify-content-between">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <nav className="nav-menu d-none d-lg-block d-xl-block">
                    <ul className="nav-menu__content d-flex justify-content-between">
                        <li>
                            <Link className="left" to="/">
                                Trang Chủ
                            </Link>
                        </li>
                        <li>
                            <Link className="left" to="/">
                                Nạp Tiền
                            </Link>
                        </li>
                        <li>
                            <Link className="right" to="/login">
                                <i className="far fa-user"></i> Đăng Nhập
                            </Link>
                        </li>
                        <li>
                            <Link className="right" to="/register">
                                <i className="fas fa-plus"></i>
                                <i className="far fa-user"></i> Đăng Kí
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="nav-mobile  d-flex align-items-center">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <Link className="bonus d-none d-lg-block d-xl-block d-md-block" to="/">
                <img src={sale} alt="" />
            </Link>
        </header>
    );
}

export default Header;
