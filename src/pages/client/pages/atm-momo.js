import '~/asset/client/css/atm-momo.css';
import LayoutSystem from '../components/layout-system';
import InfoAtmMomo from '~/components/atm-momo';
import $ from 'jquery';
import { useContext, useEffect, useState } from 'react';
import { Loading } from '~/components/loading';
import { DataContext } from '~/contexts/DataContext';

function AtmMomo() {
  const title = 'NẠP ATM - VÍ ĐIỆN TỬ';
  document.title = title;

  const dataContext = useContext(DataContext);
  const handleGoToTop = dataContext.handleGoToTop;
  const loadingSystem = dataContext.loading;

  const [listAtmWallet, setListAtmWallet] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);

  const handleGetAtmMM = () => {};
  $.ajax({
    url: process.env.REACT_APP_URL_API + 'atm-wallet/get',
    type: 'GET',
    data: {
      token: localStorage.getItem('access_token'),
    },
  })
    .done((response) => {
      if (response.status === true) {
        setListAtmWallet(response.data);
      }
      setLoadingData(false);
    })
    .fail(() => {
      handleGetAtmMM();
    });

  useEffect(() => {
    handleGoToTop();
  }, []);

  useEffect(() => {
    if (loadingSystem === false) {
      handleGetAtmMM();
    }
  }, [loadingSystem]);

  useEffect(() => {
    if (loadingData === false) {
      setLoadingPage(false);
    }
  }, [loadingData]);

  return (
    <LayoutSystem title={title}>
      {loadingPage && <Loading />}
      {loadingPage === false && listAtmWallet.length !== 0 ? (
        <div className="container__content--atm-momo row">
          {listAtmWallet.data.map((item, index) => (
            <div key={index} className="content__box--atm-momo col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <InfoAtmMomo data={item} command={listAtmWallet.command} />
            </div>
          ))}
        </div>
      ) : (
        <p>Hệ thống tạm bảo trì</p>
      )}
    </LayoutSystem>
  );
}

export default AtmMomo;
