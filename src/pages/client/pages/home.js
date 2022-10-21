import '~/asset/client/css/home.css';
import btn from '~/asset/client/images/home/quayngay.png';
import btnBuy from '~/asset/client/images/nick/btn-buy.png';
import Notification from '~/components/notification';
import $ from 'jquery';
import API from '~/services/rest-client';
import parse from 'html-react-parser';
import sale from '~/asset/client/images/home/sale.gif';
import { useContext, useEffect, useState } from 'react';
import { Loading } from '~/components/loading';
import { DataContext } from '~/contexts/DataContext';
import { Link } from 'react-router-dom';

function Home() {
  document.title = 'Trang Chủ';

  const dataContext = useContext(DataContext);
  const handleGoToTop = dataContext.handleGoToTop;
  const handleGetValueSetting = dataContext.handleGetValueSetting;
  const handleReload = dataContext.handleReload;
  const loadingSystem = dataContext.loading;

  const [notification, setNotification] = useState('');
  const [categoryGameList, setCategoryGame] = useState([]);
  const [luckyList, setLuckyList] = useState([]);
  const [dataTopMonth, setDataTopMonth] = useState([]);

  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingLuky, setLoadingLuky] = useState(true);
  const [loadingTopMonth, setLoadingTopMonth] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    handleGoToTop();
  }, []);

  const handleCategoryGame = () => {
    API.get(process.env.REACT_APP_URL_API + 'categories/get-client')
      .then((res) => {
        setCategoryGame(res.data.data);
        setLoadingCategory(false);
      })
      .catch(() => {
        handleCategoryGame();
      });
  };

  const handleLucky = () => {
    API.get(process.env.REACT_APP_URL_API + 'rotation-luck/get-client')
      .then((res) => {
        setLuckyList(res.data.data);
        setLoadingLuky(false);
      })
      .catch(() => {
        handleLucky();
      });
  };
  const handleTopMonth = () => {
    API.get(process.env.REACT_APP_URL_API + 'trans-history/get-top-month')
      .then((res) => {
        setDataTopMonth(res.data.data);
        setLoadingTopMonth(false);
      })
      .catch(() => {
        handleTopMonth();
      });
  };
  useEffect(() => {
    if (loadingSystem === false) {
      handleCategoryGame();
    }
  }, [loadingSystem]);

  useEffect(() => {
    if (loadingCategory === false) {
      handleLucky();
    }
  }, [loadingCategory]);

  useEffect(() => {
    if (loadingLuky === false) {
      handleTopMonth();
    }
  }, [loadingLuky]);

  useEffect(() => {
    if (loadingTopMonth === false) {
      setLoadingPage(false);
    }
  }, [loadingTopMonth]);

  useEffect(() => {
    if (loadingPage === false) {
      setNotification(handleGetValueSetting('notification'));
      $('.notification').css({ opacity: 1, 'pointer-events': 'unset' });
      $('#notification').css({ transform: 'unset', transition: 'all 0.25s linear' });
    }
  }, [loadingPage]);

  return loadingPage ? (
    <Loading />
  ) : (
    <div className="content container">
      <div className="content__banner--container">
        <div className="content__banner row">
          <div className="content__banner--left col-lg-4">
            <div className="content__banner--left-box">
              <h3>TOP NẠP THÁNG</h3>
              <ul className="banner__left--top">
                {dataTopMonth.map((user, index) => (
                  <li key={index}>
                    <i>{index + 1}</i>
                    <span>{user.username}</span>
                    <label htmlFor="">
                      {new Intl.NumberFormat().format(user.tong)}
                      <sup>đ</sup>
                    </label>
                  </li>
                ))}
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

      <div>
        <div className="category__container">
          <div className="category__content row">
            <div className="category-lucky__content--title col-sm-12">
              <h2 className="text-center">DANH MỤC VÒNG QUAY</h2>
              <span></span>
            </div>
            {luckyList
              ? luckyList.map((item, index) => (
                  <div key={index} className="category-lucky__content--box col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <div className="content__box--container">
                      <img src={process.env.REACT_APP_URL_PUBLIC + 'thumb/' + item.img} alt="" />
                      <div className="content__box--info">
                        <h4>
                          <Link to="/">{item.rotation_name}</Link>
                        </h4>
                        <p>Đã quay: {item.sum}</p>
                        <div className="content__box--info-price">
                          <span className="text-decoration-line-through">
                            {new Intl.NumberFormat().format(item.price + item.price * 0.5)}đ
                          </span>
                          <span>{new Intl.NumberFormat().format(item.price)}đ</span>
                        </div>
                        <div className="content__box--info-btn">
                          <Link to={`/vong-quay-may-man/${item.slug}`} onClick={handleReload}>
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
                  <div key={index} className="category-lucky__content--box col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <div className="content__box--container">
                      <img src={process.env.REACT_APP_URL_PUBLIC + 'categories/' + item.img} alt="" />
                      <div className="content__box--info">
                        <h4>
                          <Link to="/">{item.name}</Link>
                        </h4>
                        <p>Số lượng: {new Intl.NumberFormat().format(item.quantity_account)}</p>
                        <p style={{ margin: 'unset' }}>
                          Đã bán: {new Intl.NumberFormat().format(item.quantity_sold_account)}
                        </p>
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
