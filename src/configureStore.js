import { createStore, combineReducers } from 'redux';
import throttle from 'lodash/throttle';

import { todos } from './reducers/todo'
import { loadStorage, saveStorage } from './localStorage';


export const configureStore = () => {
    const persistedState = loadStorage();
    const my_global_todo = combineReducers({
        todos,
    });
    const store = createStore(my_global_todo, persistedState);

    store.subscribe(throttle(() => {
        saveStorage({
            todos: store.getState().todos
        });
    }, 1000));

    return store;
}
