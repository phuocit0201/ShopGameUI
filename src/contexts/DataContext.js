import $ from 'jquery';
import Pusher from 'pusher-js';
import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext();
function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingGetMe, setLoadingGetMe] = useState(true);
  const [loadingSetting, setLoadingSetting] = useState(true);
  const [settingWebsite, setSettingWebsite] = useState([]);

  const pusher = new Pusher('4c2d9a92e2724218381c', {
    cluster: 'ap1',
    encrypted: true,
  });

  const handleGoToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 0);
  };

  const handleReload = () => {
    setReload((prev) => prev + 1);
    setLoading(true);
  };

  const handleGetMe = () => {
    if (localStorage.getItem('access_token') !== null) {
      $.ajax({
        url: process.env.REACT_APP_URL_API + 'users/get-me',
        type: 'POST',
        data: {
          token: localStorage.getItem('access_token'),
        },
      })
        .done((res) => {
          setLoadingGetMe(false);
          setIsLogin(true);
          setData(res);
        })
        .fail((err) => {
          if (err.status === 403) {
            setIsLogin(false);
            setLoadingGetMe(false);
            localStorage.removeItem('access_token');
            setData(null);
          } else {
            handleGetMe();
          }
        });
    } else {
      setLoadingGetMe(false);
      setData(null);
      setIsLogin(false);
    }
  };

  const handleGetSettingWebsite = () => {
    $.ajax({
      url: process.env.REACT_APP_URL_API + 'settings/get-settings',
      type: 'GET',
    })
      .done((response) => {
        if (response.data) {
          setSettingWebsite(response.data);
        }
        setLoadingSetting(false);
      })
      .fail(() => {
        handleGetSettingWebsite();
      });
  };

  const handleGetValueSetting = (key) => {
    for (let i = 0; i < settingWebsite.length; i++) {
      if (settingWebsite[i].key_name === key) {
        return settingWebsite[i].value;
      }
    }
    return null;
  };

  useEffect(() => {
    handleGetMe();
  }, [reload]);

  useEffect(() => {
    if (loadingGetMe === false) {
      handleGetSettingWebsite();
    }
  }, [loadingGetMe]);

  useEffect(() => {
    if (loadingSetting === false) {
      setLoading(false);
      setLoadingGetMe(true);
      setLoadingSetting(true);
    }
  }, [loadingSetting]);
  const dataExport = {
    data: data,
    handleReload: handleReload,
    setData: setData,
    loading: loading,
    isLogin: isLogin,
    handleGoToTop: handleGoToTop,
    handleGetValueSetting: handleGetValueSetting,
    pusher: pusher,
  };
  return <DataContext.Provider value={dataExport}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
