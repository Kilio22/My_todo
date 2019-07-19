const byIds = (state = {}, action) => {
    if (action.response)
        return {
            ...state,
            ...action.response.entities.todos
        };
    return state;
};

export default byIds;

export const getTodo = (state, id) => state[id];