import './item-game.css';
import { Link } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import { useContext } from 'react';
function ItemGame({ data }) {
  const dataContext = useContext(DataContext);
  const handleReload = dataContext.handleReload;

  return (
    <div className="container__item--game">
      <div className="item__game--img">
        <img src={process.env.REACT_APP_URL_PUBLIC + 'accounts/' + data.avatar} alt="" />
      </div>
      <div className="item__game--info">
        <div className="item__game--info-top row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            Cấp độ: <b>{data.level}</b>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            Phái: <b>{data.class}</b>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            server: <b>{data.server_game}</b>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            TTGT: <b>{data.family ? 'Có' : 'Không'}</b>
          </div>
        </div>
        <div className="item__game--info-bottom row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            <span>{new Intl.NumberFormat().format(data.sale_price)}đ</span>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            <Link onClick={handleReload} className="btn btn-info" to={`/chi-tiet/${data.id}`}>
              Chi Tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemGame;
