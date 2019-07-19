import { v4 } from 'node-uuid';

const fakeDatabase = {
  todos: [],
};

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
        case 'completed':
            return fakeDatabase.todos.filter(t => t.completed);
        case 'visible':
            return fakeDatabase.todos.filter(t => !t.completed);
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
        fakeDatabase.todos.push(todo);
        return todo;
    })
)

export const toggleTodo = (id) => (
    delay(500).then(() => {
        const todo = fakeDatabase.todos.find(t => t.id === id);

        todo.completed = !todo.completed;
        return todo;
    })
);