import { useContext, useEffect, useState } from 'react';
import $ from 'jquery';
import { DataContext } from '~/contexts/DataContext';
function GetMe() {
  const baseUrl = useContext(DataContext).baseUrl;
  const [info, setInfo] = useState(null);
  const [reload, setReload] = useState(0);
  const handleReload = () => {
    setReload((prev) => prev + 1);
  };
  useEffect(() => {
    const handleGetMe = async () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token !== null) {
        await $.post(baseUrl + 'users/get-me', { token: access_token }, (res) => {
          if (res.name) {
            setInfo(res);
          }
        }).catch(() => {
          localStorage.removeItem('access_token');
          setInfo(null);
        });
      } else {
        setInfo(null);
      }
    };
    handleGetMe();
  }, [reload]);

  return [info, handleReload];
}

function Logout() {
  const baseUrl = useContext(DataContext).baseUrl;
  const [loading, setLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    if (access_token !== null) {
      $.ajax({
        url: baseUrl + 'users/logout',
        type: 'POST',
        data: { token: access_token },
      })
        .done((res) => {
          if (res.status === true) {
            setLoading(false);
            setIsLogout(true);
            localStorage.removeItem('access_token');
          }
        })
        .fail(() => {
          setLoading(false);
          setIsLogout(true);
          localStorage.removeItem('access_token');
        });
    } else {
      setLoading(false);
    }
  };
  return [loading, isLogout, handleLogout, setIsLogout];
}

export { GetMe, Logout };
