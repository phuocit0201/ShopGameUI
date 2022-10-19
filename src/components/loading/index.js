import './loading.css';
import imgLoading from '~/asset/client/images/home/loading.svg';
import imgLoadingData from '~/asset/client/images/home/loading-login.svg';
function Loading() {
  return (
    <div className="loading">
      <img src={imgLoading} alt="" />
    </div>
  );
}
function LoadingData(title) {
  return (
    <div className="loading-login">
      <img src={imgLoadingData} alt="" />
      <h3>{title.title}</h3>
    </div>
  );
}

function AwaitData() {
  return (
    <div className="wrapper__await-data">
      <Loading />
    </div>
  );
}

export { Loading, LoadingData, AwaitData };
