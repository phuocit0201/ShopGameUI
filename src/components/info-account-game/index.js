import './info-account-game.css';
import $ from 'jquery';
import Notification from '~/components/notification';
import Swal from 'sweetalert2';
import ItemGame from '~/components/item-game';
import { useContext, useEffect, useState } from 'react';
import { LoadingData, Loading } from '~/components/loading';
import { DataContext } from '~/contexts/DataContext';
import { useNavigate, useParams } from 'react-router-dom';

function InfoAccountGame() {
  const { id } = useParams();
  const dataContext = useContext(DataContext);
  const loadingSystem = dataContext.loading;
  const handleReload = dataContext.handleReload;
  const isLogin = dataContext.isLogin;
  const infoUser = dataContext.data;
  const handleGoToTop = dataContext.handleGoToTop;
  const [indexSlider, setIndexSlider] = useState(0);
  const [loadingBuyAcc, setLoadingBuyAcc] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [infoAccount, setInfoAccount] = useState({});
  const navigate = useNavigate();

  const locationLogin = () => {
    navigate('/dang-nhap');
  };

  const locationReCharge = () => {
    navigate('/nap-the');
  };

  const handlePay = () => {
    setLoadingBuyAcc(true);
    $.ajax({
      url: process.env.REACT_APP_URL_API + `orders/create`,
      type: 'POST',
      data: {
        account_id: id,
        token: localStorage.getItem('access_token'),
      },
    })
      .done((responese) => {
        if (responese.status === true) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Mua Nick Thành Công',
            showConfirmButton: false,
            timer: 1500,
            backdrop: false,
          });
          setTimeout(() => {
            handleReload();
            navigate('/lich-su-mua-nick');
          }, 1500);
          setLoadingBuyAcc(false);
        }
      })
      .fail((err) => {
        if (err.status === 403) {
          handleReload();
          setLoadingBuyAcc(false);
        }
      });
  };
  const hanledNextSlider = () => {
    if (parseInt(indexSlider) === infoAccount.imgs.length - 1) {
      setIndexSlider(0);
    } else {
      setIndexSlider(parseInt(indexSlider + 1));
    }
  };
  const hanledPriveSlider = () => {
    if (indexSlider === 0) {
      setIndexSlider(parseInt(infoAccount.imgs.length - 1));
    } else {
      setIndexSlider(indexSlider - 1);
    }
  };

  const hanldBuyAccount = () => {
    setLoadingBuyAcc(true);
    handleReload();
  };

  const handleGetInfoAccount = () => {
    $.ajax({
      url: process.env.REACT_APP_URL_API + `accounts/show-account-client/${id}`,
      type: 'GET',
    }).done((responese) => {
      if (responese.status === true) {
        setInfoAccount(responese.data);
        setLoadingPage(false);
      }
    });
  };
  useEffect(() => {
    if (loadingSystem === false) {
      setLoadingBuyAcc(false);
      handleGetInfoAccount();
    }
  }, [loadingSystem]);

  useEffect(() => {
    if (loadingBuyAcc === false && loadingSystem === false) {
      $('.notification').css({ opacity: 1, 'pointer-events': 'unset' });
      $('#notification').css({ transform: 'unset', transition: 'all 0.25s linear' });
    }
  }, [loadingBuyAcc]);

  useEffect(() => {
    handleGoToTop();
    setLoadingPage(true);
  }, [id]);
  return loadingPage ? (
    <Loading />
  ) : (
    <div className="container__content-detail--account">
      <div className="content__detail-account--buy row">
        <div className="col-xl-3 col-lg-3">
          <div className="detail__acount-buy--left">
            <p className="name-game">NINJASCHOOL</p>
            <p className="id-account">MÃ SỐ {infoAccount.info.id}</p>
            <p className="price-account"> {new Intl.NumberFormat().format(infoAccount.info.sale_price)} ATM</p>
            <button className="btn btn-success" onClick={hanldBuyAccount}>
              MUA NGAY
            </button>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 detail__acount-buy--right row">
          <div className="col-6">
            <p>
              PHÁI: <span>{infoAccount.info.class}</span>
            </p>
            <p>
              CẤP ĐỘ: <span>{infoAccount.info.level}</span>
            </p>
            <p>
              TRẠNG THÁI: <span>CHƯA BÁN</span>
            </p>
          </div>
          <div className="col-6">
            <p>
              SERVER: <span>{infoAccount.info.server_game}</span>
            </p>
            <p>
              TTGT: <span>{infoAccount.info.family ? 'Có' : 'Không'}</span>
            </p>
            <p>
              NGÀY ĐĂNG: <span>{infoAccount.info.created_at}</span>
            </p>
          </div>
          <div className="col-12">
            <p>
              NỖI BẬT: <span>{infoAccount.info.description}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="content__detail-account--imgs row">
        <div className="detail__account-imgs--show col-12">
          <div className="account__imgs-box">
            <img src={process.env.REACT_APP_URL_PUBLIC + 'accounts/' + infoAccount.imgs[indexSlider]} alt="" />
            <div>
              <i className="fas fa-chevron-left" onClick={hanledPriveSlider}></i>
              <i className="fas fa-chevron-right" onClick={hanledNextSlider}></i>
            </div>
          </div>
          <div className="account__imgs-circle">
            {infoAccount.imgs.map((item, index) =>
              index === indexSlider ? (
                <i key={index} className="fas fa-circle" style={{ color: '#0ff' }}></i>
              ) : (
                <i key={index} className="far fa-circle" style={{ color: '#0ff' }}></i>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="category-lucky__content--title col-sm-12">
        <h2 className="text-center">NICK LIÊN QUAN</h2>
        <span></span>
      </div>
      <div className="related__account row">
        {infoAccount.related.map((item, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6 box__item--account">
            <ItemGame data={item} />
          </div>
        ))}
      </div>

      <Notification title={'Xác Nhận Thanh Toán'}>
        <table className="table show__detail--account">
          <thead>
            <tr>
              <th scope="col">Mã số:</th>
              <th scope="col">{infoAccount.info.id}</th>
            </tr>
            <tr>
              <th scope="col">Cấp độ:</th>
              <th scope="col">{infoAccount.info.level}</th>
            </tr>
            <tr>
              <th scope="col">Server:</th>
              <th scope="col">{infoAccount.info.server_game}</th>
            </tr>
            <tr>
              <th scope="col">TTGT:</th>
              <th scope="col">{infoAccount.info.family ? 'Có' : 'Không'}</th>
            </tr>
            <tr>
              <th scope="col">Giá Mua:</th>
              <th scope="col">{new Intl.NumberFormat().format(infoAccount.info.sale_price)} VNĐ</th>
            </tr>
          </thead>
        </table>
        {!isLogin && <p className="text-center error">Vui lòng đăng nhập để thanh toán</p>}

        {isLogin && parseInt(infoUser.money) < parseInt(infoAccount.info.sale_price) && (
          <p className="text-center error">Bạn không đủ tiền vui lòng nạp thêm</p>
        )}

        {!isLogin && (
          <button className="btn btn-info" onClick={locationLogin}>
            Đăng nhập
          </button>
        )}
        {isLogin && parseInt(infoUser.money) >= parseInt(infoAccount.info.sale_price) && (
          <button className="btn btn-info" onClick={handlePay}>
            Thanh Toán
          </button>
        )}
        {isLogin && parseInt(infoUser.money) < parseInt(infoAccount.info.sale_price) && (
          <button className="btn btn-info" onClick={locationReCharge}>
            Nạp Tiền
          </button>
        )}
      </Notification>
      {loadingBuyAcc && <LoadingData title="Chờ tí nhé" />}
    </div>
  );
}

export default InfoAccountGame;
