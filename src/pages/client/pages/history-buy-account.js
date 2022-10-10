import '~/asset/client/css/history-buy-account.css';
import LayoutSystem from '../components/layout-system';
import { DataContext } from '~/contexts/DataContext';
import { useContext, useEffect, useState } from 'react';
import moment from 'moment/moment';
import { Loading } from '~/components/loading';
import $ from 'jquery';
import Notification from '~/components/notification';
function HistoryBuyAccount() {
  const title = 'LỊCH SỬ MUA NICK';
  document.title = title;
  const dataContext = useContext(DataContext);
  const baseUrl = dataContext.baseUrl;
  const handleReload = dataContext.handleReload;
  const loadingAuth = dataContext.loading;
  const [loading, setLoading] = useState(true);
  const [loadingHistoty, setLoadingHistory] = useState(true);
  const [loadingOrderDetail, setLoadingOrderDetail] = useState(true);
  const [history, setHistory] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [showAccount, setShowAccount] = useState({});

  const handleSetPage = (e) => {
    setPage(e.target.textContent);
  };

  const handleNextPage = () => {
    if (page > 0 && page < history.last_page) {
      setPage(parseInt(page) + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSetPerPage = (e) => {
    setPerPage(e.target.value);
    setPage(1);
  };

  const handleGetHistory = () => {
    $.ajax({
      url: baseUrl + `orders/get-orders-by-user?page=1&per_page=10`,
      type: 'GET',
      data: {
        token: localStorage.getItem('access_token'),
      },
    })
      .done((response) => {
        if (response.data.data) {
          setHistory(response.data);
        }
        setLoadingHistory(false);
      })
      .fail((response) => {
        if (response.status === 403) {
          localStorage.removeItem('access_token');
          handleReload();
        }
        setHistory({ data: [] });
        setLoadingHistory(false);
      });
  };

  const handleGetOrderDetail = () => {
    $.ajax({
      url: baseUrl + `orders/get-orders-detail-by-user`,
      type: 'GET',
      data: {
        token: localStorage.getItem('access_token'),
      },
    })
      .done((response) => {
        if (response.data) {
          setListOrderDetail(response.data);
        }
        setLoadingOrderDetail(false);
      })
      .fail((response) => {
        if (response.status === 403) {
          localStorage.removeItem('access_token');
          handleReload();
        }
        setLoadingOrderDetail(false);
      });
  };

  const handleShowaAccount = (e) => {
    const idAccount = parseInt(e.currentTarget.attributes['idaccount'].value);
    listOrderDetail.forEach((account) => {
      if (idAccount === account.id) {
        setShowAccount(account);
        $('.notification').css({ opacity: 1, 'pointer-events': 'unset' });
        $('#notification').css({ transform: 'unset', transition: 'all 0.25s linear' });
      }
    });
  };

  useEffect(() => {
    if (loadingAuth === false) {
      handleGetHistory();
      handleGetOrderDetail();
    }
  }, [loadingAuth, perPage, page]);

  useEffect(() => {
    if (loadingHistoty === false && loadingOrderDetail === false) {
      setLoading(false);
    }
  }, [loadingHistoty, loadingOrderDetail]);

  return (
    <LayoutSystem title={title}>
      {loading ? (
        <Loading />
      ) : (
        <div className="container__content--money-volatility">
          <div className="box__search-money-volatility">
            <label htmlFor="" className="per_page">
              <span style={{ paddingRight: 5, fontWeight: '500' }}>Số mục hiển thị</span>
              <select onChange={(e) => handleSetPerPage(e)}>
                <option value={5}>5</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>
          </div>
          <table className="table money-volatility">
            <thead>
              <tr>
                <th scope="col">ID Nick</th>
                <th scope="col">Tên Game</th>
                <th scope="col">Giá mua</th>
                <th scope="col">Thời gian</th>
                <th scope="col">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {history.data.length !== 0 ? (
                history.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.account_id}</td>
                    <td>{item.name}</td>
                    <td className="text-info">{new Intl.NumberFormat().format(item.price)}</td>
                    <td>{moment(item.created_at).utc().format('H:m:s DD-MM-YYYY')}</td>
                    <td>
                      <button
                        idaccount={item.account_id}
                        onClick={(e) => handleShowaAccount(e)}
                        className="btn btn-info"
                      >
                        <i className="fas fa-eye"></i> Chi Tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="data__money-volatility--null">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {history.data.length !== 0 && (
            <nav aria-label="Page navigation example pagination__recharge">
              <ul className="pagination">
                <li className="page-item page-after">
                  <button onClick={handlePreviousPage}>Trước</button>
                </li>
                {history.links.map(
                  (item, index) =>
                    index !== 0 &&
                    index !== history.links.length - 1 && (
                      <li key={index} className="page-item">
                        <button
                          onClick={(e) => handleSetPage(e)}
                          className={item.active ? 'page-link active' : 'page-link'}
                        >
                          {item.label}
                        </button>
                      </li>
                    ),
                )}
                <li className="page-item page-next">
                  <button onClick={handleNextPage}>Tiếp theo</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
      <Notification title={'Chi Tiết'}>
        <table className="table show__detail--account">
          <thead>
            <tr>
              <th scope="col">Mã số:</th>
              <th scope="col">{showAccount.id}</th>
            </tr>
            <tr>
              <th scope="col">Server:</th>
              <th scope="col">{showAccount.server_game}</th>
            </tr>
            <tr>
              <th scope="col">Phái:</th>
              <th scope="col">{showAccount.class}</th>
            </tr>
            <tr>
              <th scope="col">TGTT:</th>
              <th scope="col">{showAccount.family ? 'Có' : 'Không'}</th>
            </tr>
            <tr>
              <th scope="col">Giá Mua:</th>
              <th scope="col">{new Intl.NumberFormat().format(showAccount.sale_price)} VNĐ</th>
            </tr>
            <tr>
              <th scope="col">Tài Khoản:</th>
              <th scope="col">{showAccount.username}</th>
            </tr>
            <tr>
              <th scope="col">Mật Khẩu:</th>
              <th scope="col">{showAccount.password}</th>
            </tr>
          </thead>
        </table>
      </Notification>
    </LayoutSystem>
  );
}

export default HistoryBuyAccount;
