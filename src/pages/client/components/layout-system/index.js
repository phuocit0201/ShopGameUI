import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import './layout-system.css';
function LayoutSystem({ children, title }) {
  const handleReload = useContext(DataContext).handleReload;
  return (
    <div className="content__container">
      <div className="content__box row">
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
          <div className="content__box--sidebar">
            <div className="box__sidebar-content">
              <div className="box__sidebar-content--title">
                <h3>MENU TÀI KHOẢN</h3>
              </div>
              <ul className="box__sidebar-account--nav">
                <li>
                  <NavLink onClick={handleReload} to="/thong-tin-tai-khoan">
                    <i className="fas fa-user"></i> THÔNG TIN TÀI KHOẢN
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleReload} to="/bien-dong-so-du">
                    <i className="fas fa-coins"></i> BIẾN ĐỘNG SỐ DƯ
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleReload} to="/doi-mat-khau">
                    <i className="fas fa-lock"></i> ĐỔI MẬT KHẨU
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="box__sidebar-content">
              <div className="box__sidebar-content--title">
                <h3>MENU GIAO DỊCH</h3>
              </div>
              <ul className="box__sidebar-account--nav">
                <li>
                  <NavLink onClick={handleReload} to="/nap-tien-qua-ngan-hang">
                    <i className="fab fa-cc-visa"></i> NẠP ATM - VÍ ĐIỆN TỬ
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleReload} to="/nap-the">
                    <i className="fas fa-star"></i> NẠP THẺ CÀO
                  </NavLink>
                </li>

                <li>
                  <NavLink onClick={handleReload} to="/lich-su-mua-nick">
                    <i className="fas fa-history"></i> LỊCH SỬ MUA NICK
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/lich-su-vong-quay">
                    <i className="fas fa-history"></i> LỊCH SỬ VÒNG QUAY
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7">
          <div className="content__container--box">
            <div className="container__box-profile">
              <div className="container__box-profile--title">
                <h3>{title}</h3>
              </div>
            </div>
            <div className="container__box-profile--content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutSystem;
