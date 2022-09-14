import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import DataContextProvider from '~/contexts/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <GlobalStyles>
        <DataContextProvider>
            <App />
        </DataContextProvider>
    </GlobalStyles>,
    // </React.StrictMode>,
);
reportWebVitals();
