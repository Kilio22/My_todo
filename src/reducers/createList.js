import { combineReducers } from 'redux';

const createList = (filter) => {
    const handleToggle = (state, action) => {
        const {result: toggleId, entities} = action.response;
        const { completed } = entities.todos;
        const toUpdate = ((completed && filter === 'visible') || (!completed && filter === 'completed'))

        return toUpdate ? state.filter(id => id !== toggleId) : state;
    }
    const ids = (state = [], action) => {
        switch (action.type) {
            case 'RECEIVE_TODOS':
                return filter === action.filter ? action.response.result : state;
            case 'ADD_TODO':
                return filter !== 'completed' ? [...state, action.response.result] : state;
            case 'TOGGLE_TODO':
                return handleToggle(state, action);
            case 'DELETE_TODOS':
                state = action.response.result;
                return state;
            default:
                return state
        }
    }
    const isFetching = (state = false, action) => {
        if (action.filter !== filter)
            return state;
        switch (action.type) {
            case 'REQUEST_TODOS':
                return true;
            case 'REQUEST_ERROR':
            case 'RECEIVE_TODOS':
                return false;
            default:
                return state;
        }
    }
    const errorHandling = (state = null, action) => {
        if (action.filter !== filter)
            return state;
        switch (action.type) {
            case 'REQUEST_ERROR':
                return action.message;
            case 'REQUEST_TODOS':
            case 'RECEIVE_TODOS':
                return null;
            default:
                return state;
        }
    }
    return combineReducers({
        ids,
        isFetching,
        errorHandling
    });
}

export default createList;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorHandling;