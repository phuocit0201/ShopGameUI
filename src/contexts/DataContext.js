import { createContext, useEffect, useState } from 'react';
import API from '~/services/rest-client';
import $ from 'jquery';
import { Loading } from '~/components/loading';
export const DataContext = createContext();
function DataContextProvider({ children }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const handleReload = () => {
        setReload((prev) => prev + 1);
        setLoading(true);
    };
    useEffect(() => {
        const handleGetCategory = async () => {
            if (localStorage.getItem('access_token') !== null) {
                console.log('request api dataContext');
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
    const dataExport = { data: data, handleReload: handleReload, setData: setData, loading: loading, isLogin: isLogin };
    return <DataContext.Provider value={dataExport}>{children}</DataContext.Provider>;
    // return loading ? <Loading /> : <DataContext.Provider value={dataExport}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
