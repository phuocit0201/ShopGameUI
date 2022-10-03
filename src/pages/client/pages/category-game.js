import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '~/contexts/DataContext';
import BoxContent from '~/components/box-content';
import ItemGame from '~/components/item-game';
import { Loading } from '~/components/loading';
import '~/asset/client/css/category-game.css';
import $ from 'jquery';
function CategoryGame() {
  document.title = 'NINJASCHOOL';
  const { slug } = useParams();
  const dataContext = useContext(DataContext);
  const handleGoToTop = dataContext.handleGoToTop;
  const loadingSystem = dataContext.loading;
  const handleReload = dataContext.handleReload;
  const baseUrl = dataContext.baseUrl;
  const [loadingPage, setLoadingPage] = useState(true);
  const [listAccount, setListAccount] = useState([{ data: [] }]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState({
    class: '',
    sale_price: '',
    family: '',
    server_game: '',
  });
  const handleGetAcountGame = () => {
    $.ajax({
      url:
        baseUrl +
        `accounts/get-accounts-client?slug=${slug}&page=${page}&per_page=${perPage}&server_game=${search.server_game}&class=${search.class}&sale_price=${search.sale_price}&family=${search.family}`,
      type: 'GET',
    })
      .done((response) => {
        if (response.status === true) {
          setListAccount(response.data);
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
  }, []);

  return loadingPage ? (
    <Loading />
  ) : (
    <BoxContent>
      <div className="nav__field--search row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 field__search">
          <span>Server</span>
          <select
            value={search.server_game}
            onChange={(e) => setSearch((pre) => ({ ...pre, server_game: e.target.value }))}
          >
            <option value="">---Tất Cả---</option>
            <option value="bokken">Bokken</option>
            <option value="shuriken">Shuriken</option>
            <option value="tensen">Tensen</option>
            <option value="kunai">Kunai</option>
            <option value="katana">Katana</option>
            <option value="tone">Tone</option>
            <option value="sanzu">Sanzu</option>
            <option value="sensha">Sensha</option>
          </select>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 field__search">
          <span>Giá tiền</span>
          <select
            value={search.sale_price}
            onChange={(e) => setSearch((pre) => ({ ...pre, sale_price: e.target.value }))}
          >
            <option value="">---Tất Cả---</option>
            <option value="1">Dưới 50k</option>
            <option value="2">50K - 200K</option>
            <option value="3">200K - 500K</option>
            <option value="4">500K - 1 Triệu</option>
            <option value="5">Trên 1 Triệu</option>
          </select>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 field__search">
          <span>TTGT</span>
          <select value={search.family} onChange={(e) => setSearch((pre) => ({ ...pre, family: e.target.value }))}>
            <option value="">---Tất Cả---</option>
            <option value="0">Không</option>
            <option value="1">Có</option>
          </select>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 field__search">
          <span>Phái</span>
          <select value={search.class} onChange={(e) => setSearch((pre) => ({ ...pre, class: e.target.value }))}>
            <option value="">---Tất Cả---</option>
            <option value="tiêu">Tiêu</option>
            <option value="kiếm">Kiếm</option>
            <option value="cung">Cung</option>
            <option value="kunai">Kunai</option>
            <option value="đao">Đao</option>
            <option value="quạt">Quạt</option>
          </select>
        </div>
      </div>
      <div className="container__search">
        <button onClick={handleGetAcountGame} className="btn btn-primary">
          Tìm Kiếm
        </button>
        <button className="btn btn-danger">Tất Cả</button>
      </div>
      <div className="content__box--category-game row">
        {listAccount.data.map((item, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-6">
            <ItemGame data={item} />
          </div>
        ))}
      </div>
    </BoxContent>
  );
}

export default CategoryGame;
