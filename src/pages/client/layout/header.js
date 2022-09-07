import '~/asset/client/css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '~/asset/fontawesome-free-5.15.3/css/all.min.css';
import { Link } from 'react-router-dom';
import logo from '~/asset/client/images/logo/logo.png';
function Header() {
    return (
        <header className="header container-fluid">
            <div className="container d-flex justify-content-between">
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
        </header>
    );
}

export default Header;
