import LayoutSystem from '../components/layout-system';
import '~/asset/client/css/profile.css';
import { DataContext } from '~/contexts/DataContext';
import { useContext, useEffect } from 'react';
import { Loading } from '~/components/loading';
import moment from 'moment/moment';
function Profile() {
  const title = 'THÔNG TIN TÀI KHOẢN';
  document.title = title;
  const dataContext = useContext(DataContext);
  const loading = dataContext.loading;
  const data = dataContext.data;
  const handleGoToTop = dataContext.handleGoToTop;
  useEffect(() => {
    handleGoToTop();
  }, []);
  return (
    <LayoutSystem title={title}>
      {loading ? (
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
              <th scope="col">{moment(data.created_at).utc().format('H:m:s DD-MM-YYYY')}</th>
            </tr>
          </thead>
        </table>
      )}
    </LayoutSystem>
  );
}

export default Profile;
