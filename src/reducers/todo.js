import { combineReducers } from 'redux';

const todo = (todo, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (todo.id !== action.id)
                return todo;
            else
                return Object.assign({}, todo, {completed: !todo.completed});
        default:
            return todo;
    }
};

const byIds = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            }
        default:
            return state;
    }
};
const allIds = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.id]
        default:
            return state
    }
};
const getAllTodos = (state) => {
    return state.allIds.map(id => state.byIds[id]);
};
export const todos = combineReducers({
    byIds,
    allIds
});

export const filterSorter = (state, filter) => {
    const todos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(todo => todo.completed)
        case 'visible':
            return todos.filter(todo => !todo.completed)
        default:
            return todos;
    }
};