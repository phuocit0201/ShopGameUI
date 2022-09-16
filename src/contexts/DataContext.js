import { createContext, useEffect, useState } from 'react';
import $ from 'jquery';
export const DataContext = createContext();
function DataContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const baseUrl = 'http://localhost:8000/api/v1/';
    const handleGoToTop = () => {
        $('html, body').animate({ scrollTop: 0 }, 0);
    };
    const handleReload = () => {
        setReload((prev) => prev + 1);
        console.log(reload);
        setLoading(true);
    };
    useEffect(() => {
        const handleGetCategory = async () => {
            if (localStorage.getItem('access_token') !== null) {
                await $.post(
                    'http://localhost:8000/api/v1/users/get-me',
                    {
                        token: localStorage.getItem('access_token'),
                    },
                    (res) => {
                        setLoading(false);
                        setIsLogin(true);
                        setData(res);
                    },
                ).catch(() => {
                    setLoading(false);
                    setIsLogin(false);
                    localStorage.removeItem('access_token');
                    setData(null);
                });
            } else {
                setData(null);
                setIsLogin(false);
                setLoading(false);
            }
        };
        handleGetCategory();
    }, [reload]);
    const dataExport = {
        data: data,
        handleReload: handleReload,
        setData: setData,
        loading: loading,
        isLogin: isLogin,
        handleGoToTop: handleGoToTop,
        baseUrl: baseUrl,
    };
    return <DataContext.Provider value={dataExport}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
