import { useState } from 'react';
import API from '~/services/rest-client';

function UserAuth() {
    const [isAuth, setIsAuth] = useState(null);
    const access_token = localStorage.getItem('access_token');
    const handleAuth = async () => {
        if (access_token !== null) {
            await API.post('http://localhost:8000/api/v1/users/get-me', { token: access_token })
                .then((res) => {
                    if (res.data.id) {
                        setIsAuth(true);
                    } else {
                        setIsAuth(false);
                    }
                })
                .catch(() => {
                    setIsAuth(false);
                });
        } else {
            setIsAuth(false);
        }
    };
    return [isAuth, handleAuth];
}

export default UserAuth;
