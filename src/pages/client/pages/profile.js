import '~/asset/client/css/profile.css';
import moment from 'moment/moment';
import LayoutSystem from '../components/layout-system';
import { DataContext } from '~/contexts/DataContext';
import { useContext, useEffect, useState } from 'react';
import { Loading } from '~/components/loading';
function Profile() {
  const title = 'THÔNG TIN TÀI KHOẢN';
  document.title = title;

  const dataContext = useContext(DataContext);
  const loadingSystem = dataContext.loading;
  const [loadingPage, setLoadingPage] = useState(true);
  const data = dataContext.data;
  const handleGoToTop = dataContext.handleGoToTop;

  useEffect(() => {
    handleGoToTop();
  }, []);

  useEffect(() => {
    if (loadingSystem === false) {
      setLoadingPage(false);
    }
  }, [loadingSystem]);
  return (
    <LayoutSystem title={title}>
      {loadingPage ? (
        <Loading />
      ) : (
        <table className="table profile">
          <thead>
            <tr>
              <th scope="col">TÊN TÀI KHOẢN:</th>
              <th scope="col">{data.username}</th>
            </tr>
            <tr>
              <th scope="col">SỐ DƯ TÀI KHOẢN:</th>
              <th scope="col" className="money">
                {new Intl.NumberFormat().format(data.money)} VNĐ
              </th>
            </tr>
            <tr>
              <th scope="col">HỌ VÀ TÊN:</th>
              <th scope="col">{data.name}</th>
            </tr>
            <tr>
              <th scope="col">ĐỊA CHỈ EMAIL:</th>
              <th scope="col">{data.email}</th>
            </tr>
            <tr>
              <th scope="col">NHÓM TÀI KHOẢN:</th>
              <th scope="col">{data.role ? 'ADMIN' : 'KHÁCH HÀNG'}</th>
            </tr>
            <tr>
              <th scope="col">NGÀY THAM GIA</th>
              <th scope="col">{moment(data.created_at).utc('00:07').format('H:m:s DD-MM-YYYY')}</th>
            </tr>
          </thead>
        </table>
      )}
    </LayoutSystem>
  );
}

export default Profile;
