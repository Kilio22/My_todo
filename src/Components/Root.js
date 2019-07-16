import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

export const Root = ({ store }) => {
    return (
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/:filter?' render={({match}) => (
                <App />
            )}/>
        </BrowserRouter>
    </Provider >
    );
}