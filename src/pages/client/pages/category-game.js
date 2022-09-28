import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import BoxContent from '~/components/box-content';
import ItemGame from '~/components/item-game';
import { Loading } from '~/components/loading';
import $ from 'jquery';
function CategoryGame() {
  document.title = 'NINJASCHOOL';
  const { slug } = useParams();
  const dataContext = useContext(DataContext);
  const handleGoToTop = dataContext.handleGoToTop;
  const loadingSystem = dataContext.loading;
  const baseUrl = dataContext.baseUrl;
  const [loadingPage, setLoadingPage] = useState(true);
  const [properties, setProperties] = useState({});
  const [listAccount, setListAccount] = useState([{ data: [] }]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const handleGetAcountGame = () => {
    $.ajax({
      url: baseUrl + `accounts/get-accounts-client?slug=${slug}&page=${page}&per_page=${perPage}`,
      type: 'GET',
    })
      .done((response) => {
        if (response.status === true) {
          setListAccount(response.data);
          document.title = response.data.data[0].name.toUpperCase();
        }
        setLoadingPage(false);
      })
      .fail(() => {
        setLoadingPage(false);
      });
  };

  useEffect(() => {
    if (loadingSystem === false) {
      handleGetAcountGame();
    }
  }, [loadingSystem]);

  useEffect(() => {
    handleGoToTop();
    if (slug === 'ninjaschool') {
      setProperties({
        info1: 'Cấp độ',
        info2: 'Server',
        info3: 'Phái',
        info4: 'TTGT',
      });
    }
  }, []);

  return loadingPage ? (
    <Loading />
  ) : (
    <BoxContent>
      <div className="content__box--category-game row">
        {listAccount.data.map((item, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6">
            <ItemGame properties={properties} data={item} />
          </div>
        ))}
      </div>
    </BoxContent>
  );
}

export default CategoryGame;
