import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { my_filter } from './reducers/filter'
import { todos } from './reducers/todo'
import { App } from './Components/App';


/* Permet de mettre plusieurs reducer dans un meme store, chaque reducer recoit une état et une action,
 * store.getState() permet de récupérer la valeur de retour par defaut de chaque reducer
 */
const my_global_todo = combineReducers({
    todos,
    my_filter
});

const render = () => {
    ReactDOM.render(
        <Provider store={createStore(my_global_todo)}>
            <App />
        </Provider >
        , document.getElementById('root')
    );
};
render();
