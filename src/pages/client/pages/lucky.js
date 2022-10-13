import BoxContent from '~/components/box-content';
import $ from 'jquery';
import Swal from 'sweetalert2';
import btnRotato from '~/asset/client/images/lucky/btn-rotato.jpg';
import '~/asset/client/css/lucky.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import { Loading } from '~/components/loading';
function Lucky() {
  document.title = 'VÒNG QUAY 20K';
  const dataContext = useContext(DataContext);
  const baseUrl = dataContext.baseUrl;
  const hanleReload = dataContext.handleReload;
  const handleGoToTop = dataContext.handleGoToTop;
  const loadingSystem = dataContext.loading;
  const isLogin = dataContext.isLogin;
  const [resetRotato, setResetRotato] = useState(false);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(true);
  const { slug } = useParams();
  const handleRotato = () => {
    setFlag(false);
    if (isLogin === false) {
      navigate('/dang-nhap');
    }
    if (flag === true) {
      $.ajax({
        url: baseUrl + 'rotation-luck/rotation',
        type: 'POST',
        data: {
          token: localStorage.getItem('access_token'),
          slug: slug,
        },
      })
        .done((response) => {
          $('.rotato').css('transition', '10s');
          $('.rotato').css('transform', `rotate(${response.data.deg}deg)`);
          setTimeout(() => {
            Swal.fire({
              position: 'center',
              title: 'XIN CHÚC MỪNG',
              text: `Chúc mừng bạn đã quay được ${new Intl.NumberFormat().format(response.data.coins)} xu`,
              confirmButtonText: 'Xác Nhận',
              backdrop: false,
            });
            setResetRotato(true);
          }, 11000);
        })
        .fail((err) => {
          if (err.status === 403) {
            hanleReload();
          }
        });
    }
  };

  useEffect(() => {
    handleGoToTop();
  }, []);

  useEffect(() => {
    if (resetRotato === true) {
      $('.rotato').css('transition', 'unset');
      $('.rotato').css('transform', `rotate(0deg)`);
      setResetRotato(false);
      setFlag(true);
    }
  }, [resetRotato]);
  return (
    <BoxContent>
      <div className="wrapper__lucky">
        <div className="category-lucky__content--title">
          <h2 className="text-center">VÒNG QUAY MAY MẮN</h2>
          <span></span>
          <h2>Lượt quay 20,000 VNĐ</h2>
        </div>
        <div className="wrapper__lucky--content row">
          <div className="col-xl-6 col-lg-6">
            <div className="wrapper__lucky--content-rotato">
              <div className="lucky__content--rotato-img">
                <img
                  className="rotato"
                  src="https://shopnsocan.com/storage/main/images/image%20giao%20di%E1%BB%87n/cAGVianVLF_9619824592.png"
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
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                    <tr>
                      <td className="text-center">namle5098</td>
                      <td className="text-center">1 Triệu 2 xu - vòng quay 20k</td>
                      <td className="text-center">3 giờ trước</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoxContent>
  );
}

export default Lucky;
