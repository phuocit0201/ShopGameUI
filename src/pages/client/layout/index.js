import Header from './header';
import Footer from './footer';
import { DataContext } from '~/contexts/DataContext';
import { useContext } from 'react';
import Pusher from 'pusher-js';
import Swal from 'sweetalert2';

function Layout({ children }) {
  const dataContext = useContext(DataContext);
  const infoUser = dataContext.data;
  const handleReload = dataContext.handleReload;
  const pusher = new Pusher('4c2d9a92e2724218381c', {
    cluster: 'ap1',
    encrypted: true,
  });

  let channel = pusher.subscribe('default');
  if (infoUser && infoUser.id) {
    channel = pusher.subscribe(`${infoUser.id}`);
  }

  //gọi api cập nhật lại tiền mỗi khi số tiền user có sự thay đổi
  channel.bind('change-money', (data) => {
    if (data === 'callapi') {
      handleReload();
    }
  });

  //xuất hiện thông báo khi người dùng bị admin khóa tài khoản
  channel.bind('banned-account', (data) => {
    Swal.fire({
      position: 'center',
      icon: `${data.icon}`,
      title: `${data.title}`,
      text: `${data.message}`,
      confirmButtonText: 'Xác Nhận',
      background: 'rgba(0, 0, 0, 1)',
    });
    handleReload();
  });
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper-content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
