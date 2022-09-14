import LayoutSystem from '../components/layout-system';
import '~/asset/client/css/money-volatility.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '~/contexts/DataContext';
import { Loading } from '~/components/loading';
import $ from 'jquery';
import moment from 'moment/moment';
function MoneyVolatility() {
    const title = 'BIẾN ĐỘNG SỐ DƯ';
    document.title = title;
    const loadingAuth = useContext(DataContext).loading;
    const [loadingData, setLoadingData] = useState(true);
    const [moneyVolatility, setMoneyVolatility] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (loadingAuth === false) {
            $.get(
                'http://localhost:8000/api/v1/trans-history/get-by-user?per_page=' + perPage + '&page=' + page,
                { token: localStorage.getItem('access_token') },
                (response) => {
                    if (response.data.data) {
                        setMoneyVolatility(response.data.data);
                    }
                    setLoadingData(false);
                },
            ).catch(() => {
                setMoneyVolatility(null);
                setLoadingData(false);
            });
        }
    }, [loadingAuth, perPage]);
    return (
        <LayoutSystem title={title}>
            {loadingData ? (
                <Loading />
            ) : (
                <div>
                    <select
                        onChange={(e) => setPerPage(e.target.value)}
                        className="form-select"
                        aria-label="Default select example"
                    >
                        <option value={5}>5</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
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
                        {moneyVolatility ? (
                            <tbody>
                                {moneyVolatility.map((item, index) => (
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
                                ))}
                            </tbody>
                        ) : (
                            <p>Không có dữ liệu</p>
                        )}
                    </table>
                </div>
            )}
        </LayoutSystem>
    );
}

export default MoneyVolatility;
