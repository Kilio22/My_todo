import { createStore, combineReducers } from 'redux';
import throttle from 'lodash/throttle';

import { todos } from './reducers/todo'
import { loadStorage, saveStorage } from './localStorage';
import * as FromTodo from './reducers/todo';

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group)
        return rawDispatch;
    return (action) => {
        console.group(action.type);
        console.log('Before dispatch', store.getState())
        console.log('Action :', action);
        const n_val = rawDispatch(action);
        console.log('After dispatch :', store.getState());
        console.groupEnd(action.type);
        return n_val;
    }
};

export const configureStore = () => {
    const persistedState = loadStorage();
    const my_global_todo = combineReducers({
        todos,
    });
    const store = createStore(my_global_todo, persistedState);

    if (process.env.NODE_ENV !== 'production')
        store.dispatch = addLoggingToDispatch(store);

    store.subscribe(throttle(() => {
        saveStorage({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
}

export const getVisibleTodos = (state, filter) => {
    return FromTodo.filterSorter(state.todos, filter);
}