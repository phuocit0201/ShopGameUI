import '~/asset/client/css/home.css';
import team from '~/asset/client/images/home/team.gif';
import lucky from '~/asset/client/images/lucky/lucky.png';
function Home() {
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
            <div className="category-lucky__container">
                <div className="category-lucky__content row">
                    <div className="category-lucky__content--title col-sm-12">
                        <h2 className="text-center">DANH MỤC VÒNG QUAY</h2>
                        <span></span>
                    </div>
                    <div className="category-lucky__content--box col-lg-3">
                        <img src={lucky} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
