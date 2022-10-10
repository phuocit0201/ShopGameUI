import '~/asset/client/css/home.css';
import { Link } from 'react-router-dom';
import team from '~/asset/client/images/home/team.gif';
import btn from '~/asset/client/images/home/quayngay.png';
import btnBuy from '~/asset/client/images/nick/btn-buy.png';
import Notification from '~/components/notification';
import sale from '~/asset/client/images/home/sale.gif';
import { useContext, useEffect, useState } from 'react';
import API from '~/services/rest-client';
import $ from 'jquery';
import { AwaitData } from '~/components/loading';
import { DataContext } from '~/contexts/DataContext';
import parse from 'html-react-parser';

function Home() {
  document.title = 'Trang Chủ';
  const dataContext = useContext(DataContext);
  const handleGoToTop = dataContext.handleGoToTop;
  const baseUrl = dataContext.baseUrl;
  const handleGetValueSetting = dataContext.handleGetValueSetting;
  const handleReload = dataContext.handleReload;
  const [notification, setNotification] = useState('');
  const loadingSystem = dataContext.loading;
  const [categoryGameList, setCategoryGame] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    handleGoToTop();
  }, []);

  useEffect(() => {
    if (loadingSystem === false) {
      API.get(baseUrl + 'categories/index?page=1&per_page=10').then((res) => {
        setCategoryGame(res.data.data);
        setLoadingData(false);
      });
    }
  }, [loadingSystem]);

  useEffect(() => {
    if (loadingData === false) {
      setNotification(handleGetValueSetting('notification'));
      $('.notification').css({ opacity: 1, 'pointer-events': 'unset' });
      $('#notification').css({ transform: 'unset', transition: 'all 0.25s linear' });
    }
  }, [loadingData]);

  return (
    <div className="content container">
      <div className="content__banner--container">
        <div className="content__banner row">
          <div className="content__banner--left col-lg-4">
            <div className="content__banner--left-box">
              <h3>TOP NẠP THÁNG 9</h3>
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
              </ul>
            </div>
          </div>
          <div className="content__banner--right col-lg-8">
            <div className="banner__right--img">
              <img
                src="https://shopnsocan.com/storage/main/images/image%20giao%20di%E1%BB%87n/rfRHFeBEOV_7466060662.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {loadingData ? (
        <AwaitData />
      ) : (
        <div>
          <div className="category__container">
            <div className="category__content row">
              <div className="category-lucky__content--title col-sm-12">
                <h2 className="text-center">DANH MỤC VÒNG QUAY</h2>
                <span></span>
              </div>
              {categoryGameList
                ? categoryGameList.map((item, index) => (
                    <div key={index} className="category-lucky__content--box col-sm-6 col-md-4 col-lg-3 col-xl-3">
                      <div className="content__box--container">
                        <img src={item.img} alt="" />
                        <div className="content__box--info">
                          <h4>
                            <Link to="/">{item.name}</Link>
                          </h4>
                          {/* <p>Đã quay: {item.number}</p> */}
                          <p>Đã quay: 300</p>
                          <div className="content__box--info-price">
                            {/* <span className="text-decoration-line-through">{item.price}đ</span> */}
                            <span className="text-decoration-line-through">30.000đ</span>
                            {/* <span>{item.priceSale}đ</span> */}
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
                  ))
                : ''}
            </div>
          </div>
          <div className="category__container">
            <div className="category__content row">
              <div className="category-lucky__content--title col-sm-12">
                <h2 className="text-center">DANH MỤC NICK GAME</h2>
                <span></span>
              </div>
              {categoryGameList
                ? categoryGameList.map((item, index) => (
                    <div key={index} className="category-lucky__content--box col-lg-3">
                      <div className="content__box--container">
                        <img src={item.img} alt="" />
                        <div className="content__box--info">
                          <h4>
                            <Link to="/">{item.name}</Link>
                          </h4>
                          <p>Số lượng: 20.999</p>
                          <p>Đã bán: 10.999</p>
                          <div className="content__box--info-btn">
                            <Link to={'/danh-muc-game/' + item.slug} onClick={handleReload}>
                              <img src={btnBuy} alt="" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      )}

      <Notification title={'Thông Báo'}>
        <div>{notification !== '' && parse(notification)}</div>
      </Notification>
      <Link className="bonus d-none d-lg-block d-xl-block d-md-block" to="/">
        <img src={sale} alt="" />
      </Link>
    </div>
  );
}

export default Home;
