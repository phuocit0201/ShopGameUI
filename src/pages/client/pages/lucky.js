import '~/asset/client/css/lucky.css';
import BoxContent from '~/components/box-content';
import $ from 'jquery';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import btnRotato from '~/asset/client/images/lucky/btn-rotato.jpg';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import { Loading, LoadingData } from '~/components/loading';

function Lucky() {
  document.title = 'VÒNG QUAY';
  const { slug } = useParams();
  const navigate = useNavigate();

  const dataContext = useContext(DataContext);
  const hanleReload = dataContext.handleReload;
  const handleGoToTop = dataContext.handleGoToTop;
  const loadingSystem = dataContext.loading;
  const isLogin = dataContext.isLogin;

  const [loadingRotation, setLoadingRotation] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingHistoryRecently, setLoadingHistoryRecently] = useState(true);
  const [loadingInfoLuck, setLoadingInfoLuck] = useState(true);

  const [resetRotato, setResetRotato] = useState(false);
  const [flag, setFlag] = useState(true);
  const [dataRotation, setDataRotation] = useState({});
  const [dataHistotyRecently, setDataHistotyRecently] = useState([]);
  const [infoLuck, setInfoLuck] = useState([]);

  const handleRotato = () => {
    if (isLogin === false) {
      navigate('/dang-nhap');
    }
    if (flag === true) {
      setFlag(false);
      setLoadingRotation(true);
      $.ajax({
        url: process.env.REACT_APP_URL_API + 'rotation-luck/rotation',
        type: 'POST',
        data: {
          token: localStorage.getItem('access_token'),
          slug: slug,
        },
      })
        .done((response) => {
          setDataRotation(response);
          setLoadingRotation(false);
        })
        .fail((err) => {
          if (err.status === 403) {
            hanleReload();
          } else if (err.status === 401) {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title: 'Thông Báo',
              text: `${err.responseJSON.mess}`,
              confirmButtonText: 'Xác Nhận',
              backdrop: false,
            });
          }
          setLoadingRotation(false);
          setFlag(true);
        });
    }
  };

  const handleHistoyRecently = () => {
    $.ajax({
      url: process.env.REACT_APP_URL_API + `rotation-luck/show-history-recently/${slug}`,
      type: 'GET',
    })
      .done((response) => {
        if (response.data) {
          setDataHistotyRecently(response.data);
          setLoadingHistoryRecently(false);
        }
      })
      .fail(() => {
        handleHistoyRecently();
      });
  };

  const handleGetRotation = () => {
    $.ajax({
      url: process.env.REACT_APP_URL_API + `rotation-luck/show-client/${slug}`,
      type: 'GET',
    })
      .done((response) => {
        if (response.data) {
          setInfoLuck(response.data);
          setLoadingInfoLuck(false);
        }
      })
      .fail(() => {
        handleGetRotation();
      });
  };

  useEffect(() => {
    if (loadingSystem === false) {
      handleGetRotation();
    }
  }, [loadingSystem]);

  useEffect(() => {
    if (loadingInfoLuck === false) {
      handleHistoyRecently();
    }
  }, [loadingInfoLuck]);

  useEffect(() => {
    if (loadingHistoryRecently === false) {
      setLoadingPage(false);
    }
  }, [loadingHistoryRecently]);

  useEffect(() => {
    handleGoToTop();
  }, []);

  useEffect(() => {
    if (flag === false && loadingRotation === false) {
      if (dataRotation.status === true) {
        hanleReload();
        $('.rotato').css('transition', '10s');
        $('.rotato').css('transform', `rotate(${dataRotation.data.deg}deg)`);
        setTimeout(() => {
          Swal.fire({
            position: 'center',
            title: 'XIN CHÚC MỪNG',
            text: `Chúc mừng bạn đã quay được ${new Intl.NumberFormat().format(dataRotation.data.coins)} xu`,
            confirmButtonText: 'Xác Nhận',
            backdrop: false,
          });
          setResetRotato(true);
        }, 11000);
      }
    }
  }, [loadingRotation]);

  useEffect(() => {
    if (resetRotato === true) {
      $('.rotato').css('transition', 'unset');
      $('.rotato').css('transform', `rotate(0deg)`);
      handleHistoyRecently();
      setResetRotato(false);
      setFlag(true);
    }
  }, [resetRotato]);

  return (
    <BoxContent>
      {loadingPage && <Loading />}
      {loadingRotation && <LoadingData title="Chờ tí nha" />}
      {loadingPage === false && (
        <div className="wrapper__lucky">
          <div className="category-lucky__content--title">
            <h2 className="text-center">VÒNG QUAY MAY MẮN</h2>
            <span></span>
            <h2>Lượt quay {new Intl.NumberFormat().format(infoLuck.price)} VNĐ</h2>
          </div>
          <div className="wrapper__lucky--content row">
            <div className="col-xl-6 col-lg-6">
              <div className="wrapper__lucky--content-rotato">
                <div className="lucky__content--rotato-img">
                  <img
                    className="rotato"
                    src={process.env.REACT_APP_URL_PUBLIC + 'lucky/' + infoLuck.img_gift}
                    alt=""
                  />
                  <img onClick={handleRotato} className="btn-rotato" src={btnRotato} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-lg-6">
              <div className="wrapper__lucky--content-history">
                <div className="lucky__content--history-header">
                  <div className="text-end">
                    <Link to="/lich-su-vong-quay">LỊCH SỬ QUAY</Link>
                  </div>
                  <h2>LƯỢT QUAY GẦN ĐÂY</h2>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">
                          Tài khoản
                        </th>
                        <th scope="col" className="text-center">
                          Phần thưởng
                        </th>
                        <th scope="col" className="text-center">
                          Thời gian
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataHistotyRecently.map((item) => (
                        <tr key={item.id}>
                          <td className="text-center">{item.username}</td>
                          <td className="text-center">{new Intl.NumberFormat().format(item.coins)} xu</td>
                          <td className="text-center">{moment(item.created_at).utc('00:07').format('DD-MM-YYYY')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </BoxContent>
  );
}

export default Lucky;
