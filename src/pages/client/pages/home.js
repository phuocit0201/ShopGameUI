import '~/asset/client/css/home.css';
import { Link } from 'react-router-dom';
import team from '~/asset/client/images/home/team.gif';
import lucky from '~/asset/client/images/lucky/lucky.png';
import categoryGame from '~/asset/client/images/nick/category-game.png';
import btn from '~/asset/client/images/home/quayngay.png';
import btnBuy from '~/asset/client/images/nick/btn-buy.png';
import Notification from '~/components/notification';
import { useEffect } from 'react';
import $ from 'jquery';
function Home() {
    useEffect(() => {
        setTimeout(() => {
            $('.notification').css({ opacity: 1, 'pointer-events': 'unset' });
            $('#notification').css({ transform: 'unset', transition: 'all 0.25s linear' });
        }, 200);
    }, []);
    return (
        <div className="content container">
            <div className="content__banner--container">
                <div className="content__banner row">
                    <div className="content__banner--left col-lg-4">
                        <h3>TOP NẠP THẺ THÁNG 9</h3>
                        <ul className="banner__left--top">
                            <li>
                                <i>1</i>
                                <span>phuoc***</span>
                                <label htmlFor="">
                                    9.550.000<sup>đ</sup>
                                </label>
                            </li>
                            <li>
                                <i>2</i>
                                <span>phuoc***</span>
                                <label htmlFor="">
                                    9.550.000<sup>đ</sup>
                                </label>
                            </li>
                            <li>
                                <i>3</i>
                                <span>phuoc***</span>
                                <label htmlFor="">
                                    9.550.000<sup>đ</sup>
                                </label>
                            </li>
                            <li>
                                <i>4</i>
                                <span>phuoc***</span>
                                <label htmlFor="">
                                    9.550.000<sup>đ</sup>
                                </label>
                            </li>
                            <li>
                                <i>5</i>
                                <span>phuoc***</span>
                                <label htmlFor="">
                                    9.550.000<sup>đ</sup>
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="content__banner--right col-lg-8">
                        <div className="banner__right--img">
                            <img src={team} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="category__container">
                <div className="category__content row">
                    <div className="category-lucky__content--title col-sm-12">
                        <h2 className="text-center">DANH MỤC VÒNG QUAY</h2>
                        <span></span>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={lucky} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">GIẢI KHÁT MÙA HÈ</Link>
                                </h4>
                                <p>Đã quay: 10.999</p>
                                <div className="content__box--info-price">
                                    <span className="text-decoration-line-through">30.000đ</span>
                                    <span>20.000đ</span>
                                </div>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btn} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={lucky} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">GIẢI KHÁT MÙA HÈ</Link>
                                </h4>
                                <p>Đã quay: 10.999</p>
                                <div className="content__box--info-price">
                                    <span className="text-decoration-line-through">30.000đ</span>
                                    <span>20.000đ</span>
                                </div>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btn} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={lucky} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">GIẢI KHÁT MÙA HÈ</Link>
                                </h4>
                                <p>Đã quay: 10.999</p>
                                <div className="content__box--info-price">
                                    <span className="text-decoration-line-through">30.000đ</span>
                                    <span>20.000đ</span>
                                </div>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btn} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={lucky} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">GIẢI KHÁT MÙA HÈ</Link>
                                </h4>
                                <p>Đã quay: 10.999</p>
                                <div className="content__box--info-price">
                                    <span className="text-decoration-line-through">30.000đ</span>
                                    <span>20.000đ</span>
                                </div>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btn} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category__container">
                <div className="category__content row">
                    <div className="category-lucky__content--title col-sm-12">
                        <h2 className="text-center">DANH MỤC NICK GAME</h2>
                        <span></span>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={categoryGame} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">NICK GAME LIÊN QUÂN</Link>
                                </h4>
                                <p>Số lượng: 20.999</p>
                                <p>Đã bán: 10.999</p>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btnBuy} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={categoryGame} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">NICK GAME LIÊN QUÂN</Link>
                                </h4>
                                <p>Số lượng: 20.999</p>
                                <p>Đã bán: 10.999</p>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btnBuy} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={categoryGame} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">NICK GAME LIÊN QUÂN</Link>
                                </h4>
                                <p>Số lượng: 20.999</p>
                                <p>Đã bán: 10.999</p>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btnBuy} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <div className="content__box--container">
                            <img src={categoryGame} alt="" />
                            <div className="content__box--info">
                                <h4>
                                    <Link to="/">NICK GAME LIÊN QUÂN</Link>
                                </h4>
                                <p>Số lượng: 20.999</p>
                                <p>Đã bán: 10.999</p>
                                <div className="content__box--info-btn">
                                    <Link to="/">
                                        <img src={btnBuy} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification
                title="THÔNG BÁO"
                content="<h2 style='color:red;font-size:20px;'>Chào mừng ae đến với SHOPNICKNSO.COM</h2><p style='font-size:18px;'>Ae chú ý mua xu nick và dịch vụ trên shop thì hãy gạch thẻ tự động nhé auto nhanh chiết khấu tốt chỉ dùng thẻ viettel nhé </p>"
            />
        </div>
    );
}

export default Home;
