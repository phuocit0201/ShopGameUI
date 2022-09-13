import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, authRoutesClient } from '~/routes';
import Auththentication from './routes/private-router';
import DataContextProvider from '~/contexts/DataContext';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Page = route.component;
                        let Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    ;
                    {/* <Route element={<Auththentication />}>
                            {authRoutesClient.map((route, index) => {
                                let Page = route.component;
                                let Layout = route.layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route> */}
                    {authRoutesClient.map((route, index) => {
                        let Page = route.component;
                        let Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DataContextProvider>
                                        <Auththentication>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </Auththentication>
                                    </DataContextProvider>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
