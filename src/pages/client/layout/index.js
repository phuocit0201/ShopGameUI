import Header from './header';
import Footer from './footer';
import { DataContext } from '~/contexts/DataContext';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
function Layout({ children }) {
  const dataContext = useContext(DataContext);
  const infoUser = dataContext.data;
  const handleReload = dataContext.handleReload;
  const pusher = dataContext.pusher;
  const [publish, setPushLish] = useState({ key: '' });
  const [pushlishOld, setPushlishOld] = useState('');
  const [pushlishType, setPushlishType] = useState('');

  let channelInfoUser = '';
  if (infoUser && infoUser.id) {
    channelInfoUser = pusher.subscribe(`${infoUser.id}`);
  } else {
    channelInfoUser = pusher.subscribe('default');
  }

  //lắng nghe sự kiện thay đổi tiền từ server
  channelInfoUser.bind('change-money', (data) => {
    setPushLish(data);
    setPushlishType('change-money');
  });

  channelInfoUser.bind('banned-account', (data) => {
    setPushLish(data);
    setPushlishType('banned-account');
  });
  useEffect(() => {
    //gọi api cập nhật lại tiền mỗi khi số tiền user có sự thay đổi
    if (publish.key != pushlishOld && pushlishType == 'change-money') {
      setPushlishOld(publish.key);
      handleReload();
    }

    if (publish.key != pushlishOld && pushlishType == 'banned-account') {
      setPushlishOld(publish.key);
      //xuất hiện thông báo khi người dùng bị admin khóa tài khoản
      Swal.fire({
        position: 'center',
        icon: `${publish.data.icon}`,
        title: `${publish.data.title}`,
        text: `${publish.data.message}`,
        confirmButtonText: 'Xác Nhận',
        background: 'rgba(0, 0, 0, 1)',
      });
      handleReload();
    }
  }, [publish]);
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper-content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
