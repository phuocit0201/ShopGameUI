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
        } else {
            $('.header').removeClass('stick');
        }
    };

    window.addEventListener('scroll', handleScroll);
    return (
        <header className="header container-fluid">
            <div className="header-content container d-flex justify-content-between">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <nav className="nav-menu">
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
                                <i class="far fa-user"></i> Đăng Nhập
                            </Link>
                        </li>
                        <li>
                            <Link className="right" to="/">
                                <i class="fas fa-plus"></i>
                                <i class="far fa-user"></i> Đăng Kí
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Link className="bonus" to="/">
                <img src={sale} alt="" />
            </Link>
        </header>
    );
}

export default Header;
