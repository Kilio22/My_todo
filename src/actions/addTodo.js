let nb_id = 0;

export const addTodo = (input) => {
    return (
        {
            type: 'ADD_TODO',
            id: nb_id++,
            text: input
        }
    )
};