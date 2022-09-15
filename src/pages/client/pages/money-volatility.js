import LayoutSystem from '../components/layout-system';
import '~/asset/client/css/money-volatility.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '~/contexts/DataContext';
import { Loading } from '~/components/loading';
import $ from 'jquery';
import moment from 'moment/moment';
import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/material_orange.css';
import 'flatpickr/dist/themes/dark.css';
function MoneyVolatility() {
    const title = 'BIẾN ĐỘNG SỐ DƯ';
    document.title = title;
    const loadingAuth = useContext(DataContext).loading;
    const handleReload = useContext(DataContext).handleReload;
    const [loadingData, setLoadingData] = useState(true);
    const [moneyVolatility, setMoneyVolatility] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [date, setDate] = useState(new Date());

    const handleSetPage = (e) => {
        setPage(e.target.textContent);
    };

    const handleNextPage = () => {
        if (page > 0 && page < moneyVolatility.last_page) {
            setPage(page + 1);
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
    useEffect(() => {}, []);
    useEffect(() => {
        const handleMoneyVolatility = async () => {
            await $.get(
                'http://localhost:8000/api/v1/trans-history/get-by-user?per_page=' + perPage + '&page=' + page,
                { token: localStorage.getItem('access_token') },
                (response) => {
                    if (response.data.data) {
                        setMoneyVolatility(response.data);
                    }
                    setLoadingData(false);
                },
            ).catch((err) => {
                console.log(err);
                if (err.responseJSON.status === false) {
                    localStorage.removeItem('access_token');
                    handleReload();
                }
                setMoneyVolatility([]);
                setLoadingData(false);
            });
        };
        if (loadingAuth === false) {
            handleMoneyVolatility();
        }
    }, [loadingAuth, perPage, page]);
    return (
        <LayoutSystem title={title}>
            {loadingData ? (
                <Loading />
            ) : (
                <div>
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
                        <label htmlFor="" className="search___by-date">
                            <Flatpickr data-enable-time value={date} />
                        </label>
                        <label htmlFor="" className="search___by-date">
                            <Flatpickr data-enable-time value={date} />
                        </label>
                    </div>
                    <table className="table money-volatility">
                        <thead>
                            <tr>
                                <th scope="col">Số Tiền Trước</th>
                                <th scope="col">Số Tiền Thay Đổi</th>
                                <th scope="col">Số Tiền Sau</th>
                                <th scope="col">Thời Gian</th>
                                <th scope="col">Nội Dung</th>
                            </tr>
                        </thead>

                        <tbody>
                            {moneyVolatility.data.length !== 0 ? (
                                moneyVolatility.data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-primary">
                                            {new Intl.NumberFormat().format(item.after_money)}
                                        </td>
                                        <td
                                            className={
                                                item.transaction_money[0] === '-' ? 'text-danger' : 'text-success'
                                            }
                                        >
                                            {new Intl.NumberFormat().format(item.transaction_money)}
                                        </td>
                                        <td className="text-info">
                                            {new Intl.NumberFormat().format(item.befor_money)}
                                        </td>
                                        <td>{moment(item.created_at).utc().format('H:m:s DD-MM-YYYY')}</td>
                                        <td className="text-warning">{item.note}</td>
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

                    {moneyVolatility.data.length !== 0 && (
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <button onClick={handlePreviousPage} className="page-link">
                                        Trước
                                    </button>
                                </li>
                                {moneyVolatility.links.map(
                                    (item, index) =>
                                        index !== 0 &&
                                        index !== moneyVolatility.links.length - 1 && (
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
                                <li className="page-item">
                                    <button onClick={handleNextPage} className="page-link">
                                        Tiếp theo
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            )}
        </LayoutSystem>
    );
}

export default MoneyVolatility;
