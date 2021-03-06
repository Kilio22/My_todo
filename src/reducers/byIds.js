const byIds = (state = {}, action) => {
    if (action.response) {
        if (action.type === 'DELETE_TODOS') {
            return {
                ...action.response.entities.todos
            };
        }
        return {
            ...state,
            ...action.response.entities.todos
        };
    }
    return state;
};

export default byIds;

export const getTodo = (state, id) => state[id];