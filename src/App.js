import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, authRoutesClient } from '~/routes';
import Auththentication from './routes/private-router';

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
                    <Page active={route.path} />
                  </Layout>
                }
              />
            );
          })}
          ;
          {authRoutesClient.map((route, index) => {
            let Page = route.component;
            let Layout = route.layout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Auththentication>
                    <Layout>
                      <Page />
                    </Layout>
                  </Auththentication>
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
