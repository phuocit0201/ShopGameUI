import LayoutSystem from '../components/layout-system';
import InfoAtmMomo from '~/components/atm-momo';
import '~/asset/client/css/atm-momo.css';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '~/contexts/DataContext';
import $ from 'jquery';
import { Loading } from '~/components/loading';
function AtmMomo() {
  const title = 'NẠP ATM - VÍ ĐIỆN TỬ';
  document.title = title;
  const dataContext = useContext(DataContext);
  const baseUrl = dataContext.baseUrl;
  const [listAtmWallet, setListAtmWallet] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    $.ajax({
      url: baseUrl + 'atm-wallet/get',
      type: 'GET',
      data: {
        token: localStorage.getItem('access_token'),
      },
    })
      .done((response) => {
        if (response.status === true) {
          setListAtmWallet(response.data);
        }
        setLoading(false);
      })
      .fail(() => {
        setLoading(false);
      });
  }, []);
  return (
    <LayoutSystem title={title}>
      {loading ? (
        <Loading />
      ) : listAtmWallet.length !== 0 ? (
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
