import { v4 } from 'node-uuid';

export const addTodo = (input) => ({
    type: 'ADD_TODO',
    id: v4(),
    text: input
});