import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const Root = ({ store }) => {
    return (
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/:filter?'>
                <App />
            </Route>
        </BrowserRouter>
    </Provider >
    );
};

export default Root;