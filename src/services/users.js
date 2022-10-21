import { useState } from 'react';
import $ from 'jquery';

function Logout() {
  const [loading, setLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const access_token = localStorage.getItem('access_token');
    if (access_token !== null) {
      $.ajax({
        url: process.env.REACT_APP_URL_API + 'users/logout',
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

export { Logout };
