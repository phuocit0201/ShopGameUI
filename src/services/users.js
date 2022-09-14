import { useEffect, useState } from 'react';
import $ from 'jquery';
import API from '~/services/rest-client';
function GetMe() {
    const [info, setInfo] = useState(null);
    const [reload, setReload] = useState(0);
    const handleReload = () => {
        setReload((prev) => prev + 1);
    };
    useEffect(() => {
        const handleGetMe = async () => {
            const access_token = localStorage.getItem('access_token');
            if (access_token !== null) {
                await $.post('http://localhost:8000/api/v1/users/get-me', { token: access_token }, (res) => {
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
    const [loading, setLoading] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        const access_token = localStorage.getItem('access_token');
        if (access_token !== null) {
            await $.post('http://localhost:8000/api/v1/users/logout', { token: access_token }, (res) => {
                if (res.status === true) {
                    console.log('logout success');
                    setLoading(false);
                    setIsLogout(true);
                    localStorage.removeItem('access_token');
                }
            }).catch(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };
    return [loading, isLogout, handleLogout];
}

export { GetMe, Logout };
