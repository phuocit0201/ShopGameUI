import '~/asset/client/css/history-buy-account.css';
import LayoutSystem from '../components/layout-system';
import $ from 'jquery';
import { DataContext } from '~/contexts/DataContext';
import { useContext, useEffect, useState } from 'react';
import { Loading } from '~/components/loading';
function HistoryRotation() {
  const title = 'LỊCH SỬ VÒNG QUAY';
  document.title = title;
  const dataContext = useContext(DataContext);
  const handleReload = dataContext.handleReload;
  const loadingAuth = dataContext.loading;
  const handleGoToTop = dataContext.handleGoToTop;

  const [loading, setLoading] = useState(true);
  const [loadingHistoty, setLoadingHistory] = useState(true);
  const [history, setHistory] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

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
      url: process.env.REACT_APP_URL_API + `rotation-luck/get-history-by-user?page=${page}&per_page=${perPage}`,
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

  useEffect(() => {
    if (loadingAuth === false) {
      handleGetHistory();
    }
  }, [loadingAuth, perPage, page]);

  useEffect(() => {
    if (loadingHistoty === false) {
      setLoading(false);
    }
  }, [loadingHistoty]);

  useEffect(() => {
    handleGoToTop();
  }, []);
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
                <th scope="col">ID</th>
                <th scope="col">Tên Vòng Quay</th>
                <th scope="col">Phần Thưởng</th>
                <th scope="col">Thời Gian</th>
              </tr>
            </thead>
            <tbody>
              {history.data.length !== 0 ? (
                history.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.rotation_name}</td>
                    <td className="text-info">{new Intl.NumberFormat().format(item.coins)} xu</td>
                    <td>{item.created_at}</td>
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
    </LayoutSystem>
  );
}

export default HistoryRotation;
