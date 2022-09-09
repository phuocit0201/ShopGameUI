import '~/asset/client/css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '~/asset/fontawesome-free-5.15.3/css/all.min.css';
import { Link } from 'react-router-dom';
import logo from '~/asset/client/images/logo/logo.png';
import sale from '~/asset/client/images/home/sale.gif';
import $ from 'jquery';
import { useEffect } from 'react';
function Header() {
    const handleScroll = () => {
        if (window.scrollY > 10 && $(window).width() > 991) {
            $('.header').addClass('stick');
            $('.header-content').css('padding', '15px 30px');
        } else if (window.scrollY < 10 && $(window).width() > 991) {
            $('.header').removeClass('stick');
            $('.header-content').css('padding', '30px 15px');
        }
    };

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
            </div>
            <Link className="bonus d-none d-lg-block d-xl-block d-md-block" to="/">
                <img src={sale} alt="" />
            </Link>
        </header>
    );
}

export default Header;
