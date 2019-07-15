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
}

export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, todo(undefined, action)];
        case 'TOGGLE_TODO':
            return state.map(single_todo => todo(single_todo, action));
        default:
            return state;
    }
};