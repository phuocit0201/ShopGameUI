import LayoutSystem from '../components/layout-system';
import '~/asset/client/css/money-volatility.css';
import '~/components/form/form.css';
import '~/asset/client/css/recharge-card.css';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import $ from 'jquery';
import { DataContext } from '~/contexts/DataContext';
import { Loading } from '~/components/loading';
import { LoadingData } from '~/components/loading';
import Flatpickr from 'react-flatpickr';

function RechargeCard() {
  const title = 'NẠP THẺ';
  document.title = title;
  const dataContext = useContext(DataContext);
  const baseUrl = dataContext.baseUrl;
  const handleReload = dataContext.handleReload;
  const [valueCardByTelco, setValueCardByTelco] = useState([]);
  const [listValueCard, setListValueCard] = useState([]);
  const [typeCard, setTypeCard] = useState([]);
  const [telco, setTelco] = useState('');
  const [declareValue, setDeclareValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [serial, setSerial] = useState('');
  const [code, setCode] = useState('');
  const [messageRecharge, setMessageRecharge] = useState({});
  const [loadingRequestCard, setLoadingRequestCard] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingGetTelco, setLoadingGetTelco] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dataHistory, setDataHistory] = useState();
  const [refresh, setRefresh] = useState(0);

  //làm mới lại dữ liệu mỗi khi gửi thẻ thành công lên hệ thống
  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };
  //lấy ra danh sách nhà mạng
  const handleParserTypeCard = (array) => {
    const arrayTypeCard = [];
    array.forEach((element) => {
      if (arrayTypeCard.includes(element.telco) === false) {
        arrayTypeCard.push(element.telco);
      }
    });
    setTelco(arrayTypeCard[0]);
    setTypeCard(arrayTypeCard);
  };

  // nạp card
  const handleRequestCard = () => {
    setLoadingRequestCard(true);
    console.log(serial + code + telco);
    $.ajax({
      url: baseUrl + 'cards/request-card-tsr',
      type: 'POST',
      data: {
        token: localStorage.getItem('access_token'),
        telco: telco,
        declare_value: declareValue,
        code: code,
        serial: serial,
      },
    })
      .done((response) => {
        if (response.status === true) {
          setMessageRecharge({ mess: `Vui lòng chờ 30s serial ${serial} đang chờ duyệt`, status: true });
          setCode('');
          setSerial('');
          setLoadingHistory(true);
          setLoadingGetTelco(true);
          handleRefresh();
        } else {
          setLoadingRequestCard(false);
        }
      })
      .fail((response) => {
        if (response.status === 403) {
          setMessageRecharge({ mess: 'Phiên đăng nhập của bạn đã hết hạn', status: false });
          setTimeout(() => {
            handleReload();
          }, 1000);
        } else if (response.responseJSON.mess) setMessageRecharge({ mess: response.responseJSON.mess, status: false });
        setLoadingRequestCard(false);
      });
  };

  /*gọi api lấy tất cả các thẻ cào từ thesieure.com */
  const handleGetCards = () => {
    $.ajax({
      url: baseUrl + 'cards/get-fee',
      type: 'GET',
      data: {
        token: localStorage.getItem('access_token'),
      },
    })
      .done((response) => {
        setListValueCard(response);
        handleParserTypeCard(response);
        setLoadingGetTelco(false);
      })
      .catch(() => {
        setLoadingGetTelco(false);
      });
  };

  /* gọi api lấy lịch sử nạp thẻ */
  const handleGetHistory = () => {
    $.ajax({
      url: baseUrl + 'cards/history?page=1&per_page=20',
      type: 'GET',
      data: {
        token: localStorage.getItem('access_token'),
      },
    })
      .done((response) => {
        if (response.data.data) {
          setDataHistory(response.data);
        }
        setLoadingHistory(false);
      })
      .fail(() => {
        setDataHistory({ data: [] });
        setLoadingHistory(false);
        setLoadingGetTelco(false);
      });
  };

  // hiển thị mệnh giá thẻ cào theo từng nhà mạng
  useEffect(() => {
    setValueCardByTelco([]);
    listValueCard.forEach((item) => {
      if (item.telco === telco) {
        setValueCardByTelco((pre) => [...pre, { value: item.value, fees: item.fees }]);
        setDeclareValue('0');
      }
    });
  }, [telco, refresh]);

  //gọi api khi vừa load trang hoặc refresh thay đổi
  useEffect(() => {
    handleGetHistory();
    handleGetCards();
  }, [refresh]);

  useEffect(() => {
    if (loadingGetTelco === false && loadingHistory === false) {
      setLoading(false);
      setLoadingRequestCard(false);
    }
  }, [loadingGetTelco, loadingHistory]);
  return (
    <LayoutSystem title={title}>
      {loading ? (
        <Loading />
      ) : (
        <div className="container__recharge-card">
          <div className="container__notification">
            {!loadingRequestCard && (
              <p className={messageRecharge.status === true ? 'success' : 'error'}>{messageRecharge.mess}</p>
            )}
          </div>
          <div className="recharge__card-content row">
            <div className="content__box--input col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="">Loại Thẻ</label>
              <select value={telco} onChange={(e) => setTelco(e.target.value)} name="" id="">
                {typeCard.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="content__box--input col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="">Mệnh Giá</label>
              <select value={declareValue} onChange={(e) => setDeclareValue(e.target.value)} name="" id="">
                <option value="0">Chọn mệnh giá</option>
                {valueCardByTelco.map((item, index) => (
                  <option key={index} value={item.value}>
                    {new Intl.NumberFormat().format(item.value)} ({item.fees}%)
                  </option>
                ))}
              </select>
            </div>
            <div className="content__box--input col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="">Số Serial</label>
              <input
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                type="number"
                placeholder="Nhập số serial"
              />
            </div>
            <div className="content__box--input col-xl-3 col-lg-3 col-md-6 col-sm-12">
              <label htmlFor="">Mã số thẻ</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="number"
                placeholder="Nhập mã số thẻ"
              />
            </div>
          </div>
          <div className="content__box--btn d-flex justify-content-center">
            <button onClick={handleRequestCard}>NẠP THẺ</button>
          </div>
          <div className="container__history--recharge-card">
            <h3>LỊCH SỬ NẠP THẺ</h3>
            <div className="container__table--recharge-card">
              <div className="box__search-money-volatility">
                <label htmlFor="" className="per_page">
                  <span style={{ paddingRight: 5, fontWeight: '500' }}>Số mục hiển thị</span>
                  <select>
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
              <table className="table recharge-card">
                <thead>
                  <tr>
                    <th scope="col">Mã Thẻ</th>
                    <th scope="col">Serial</th>
                    <th scope="col">Nhà Mạng</th>
                    <th scope="col">Mệnh Giá</th>
                    <th scope="col">Kết Quả</th>
                    <th scope="col">Thực Nhận</th>
                    <th scope="col">Thời Gian</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHistory.data.length !== 0 ? (
                    dataHistory.data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.code}</td>
                        <td>{item.serial}</td>
                        <td>{item.telco}</td>
                        <td>{new Intl.NumberFormat().format(item.declare_value)}</td>
                        <td>
                          {item.status === 1 && <span className="badge bg-success">Thành công</span>}
                          {item.status === 99 && <span className="badge bg-warning">Chờ duyệt</span>}
                          {item.status === 2 && <span className="badge bg-danger">Sai mệnh giá</span>}
                          {item.status === 3 && <span className="badge bg-danger">Thẻ lỗi</span>}
                        </td>
                        <td>{new Intl.NumberFormat().format(item.amount)}</td>
                        <td>22/22/2022 21:21:21</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="data__money-volatility--null">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {loadingRequestCard && <LoadingData title="Vui lòng chờ" />}
    </LayoutSystem>
  );
}

export default RechargeCard;
