import { v4 } from 'node-uuid';

let database = {
  todos: [],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return database.todos;
        case 'completed':
            return database.todos.filter(t => t.completed);
        case 'visible':
            return database.todos.filter(t => !t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
});

export const addTodo = (text) => (
    delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false
        }
        database.todos.push(todo);
        return todo;
    })
)

export const toggleTodo = (id) => (
    delay(500).then(() => {
        const todo = database.todos.find(t => t.id === id);

        todo.completed = !todo.completed;
        return todo;
    })
);

export const deleteTodo = (id) => (
    delay(500).then(() => {
        const newDb = database.todos.filter(t => t.id !== id);

        database.todos = newDb;
        return newDb;
    })
)