import { normalize } from 'normalizr';

import * as api from '../api/index';
import { getIsFetching } from '../reducers';
import * as schema from './schema';

export const addTodo = (text) => (dispatch) => (
    api.addTodo(text).then((response) => {
        dispatch({
            type: 'ADD_TODO',
            response: normalize(response, schema.todo)
        });
    })
);

export const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    response: normalize(response, schema.arrayOfTodos),
    filter
});

const errorTodos = (filter, error) => ({
    type: 'REQUEST_ERROR',
    message: error.message || 'Something went wrong.',
    filter
});

const deleteTodos = (response) => ({
    type: 'DELETE_TODOS',
    response: normalize(response, schema.arrayOfTodos)
})

export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        console.log('ALREADY FETCHING');
        return;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => {
        dispatch(receiveTodos(filter, response));
    }, error => dispatch(errorTodos(filter, error)));
};

export const toggleTodo = (id) => (dispatch) => {
    api.toggleTodo(id).then(response => {
            dispatch({
            type: 'TOGGLE_TODO',
            response: normalize(response, schema.todo)
        })
    })
};

export const deleteTodo = (id) => (dispatch) => {
    return (api.deleteTodo(id).then((response) => {
        dispatch(deleteTodos(response));
    }));
}