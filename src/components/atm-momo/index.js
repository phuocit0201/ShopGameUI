import './atm-momo.css';
import { DataContext } from '~/contexts/DataContext';
import { useContext } from 'react';
function InfoAtmMomo({ data, command }) {
  const dataContext = useContext(DataContext);
  const infoMe = dataContext.data;
  return (
    <div className="container__card--info">
      <div className="card__info--logo">
        <img
          src={process.env.REACT_APP_URL_PUBLIC + 'logo/' + data.link_logo}
          className={data.type === 'thesieure' ? 'logo__tsr' : ''}
          alt=""
        />
      </div>
      <div className="card__info--content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{data.type === 'atm' ? 'Ngân hàng' : 'Ví điện tử'}</th>
              <th scope="col">{data.type === 'atm' ? data.bank : data.type === 'momo' ? 'MOMO' : 'THESIEURE'}</th>
            </tr>
            <tr>
              <th scope="col">
                {data.type === 'atm' && 'Số tài khoản'}
                {data.type === 'momo' && 'Số điện thoại'}
                {data.type === 'thesieure' && 'Tên tài khoản'}
              </th>
              <th scope="col">{data.account_number}</th>
            </tr>
            <tr>
              <th scope="col">Chủ tài khoản</th>
              <th scope="col">{data.full_name}</th>
            </tr>
            <tr>
              <th scope="col">Nội dung chuyển tiền</th>
              <th scope="col">
                {command}
                {infoMe.id}
              </th>
            </tr>
            <tr>
              <th scope="col" colSpan={2} className="description">
                {data.note}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default InfoAtmMomo;
