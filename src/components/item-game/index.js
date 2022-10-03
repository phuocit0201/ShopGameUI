import './item-game.css';
import avatar from '~/asset/client/images/avatar-game/1.png';
function ItemGame({ data }) {
  return (
    <div className="container__item--game">
      <div className="item__game--img">
        <img src={avatar} alt="" />
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
            <span>200,000đ</span>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-6 text-center">
            <button className="btn btn-info">Chi Tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemGame;
