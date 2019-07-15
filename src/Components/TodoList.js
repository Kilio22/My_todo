import { connect } from 'react-redux';
import React from 'react';

import { toggleTodo } from '../actions/toggleTodo';

const filterSorter = (todos, filter) => {
    switch (filter) {
        case 'ALL':
            return todos;
        case 'COMPLETED':
            return todos.filter(todo => todo.completed)
        case 'VISIBLE':
            return todos.filter(todo => !todo.completed)
        default:
            return todos;
    }
};

const Todo = ({todo, onClick}) => {
    return (
    <h1 onClick={() => onClick()}
    style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</h1>
    );
};
const TodoList = ({todos, onClick}) => {
    return (todos.map(todo => {
        return (
        <div key={todo.id}>
            <Todo todo={todo} onClick={() => {onClick(todo.id)}}/>
        </div>);
    }))
};
const mapStatePrintToProps = (state) => {
    return {
        todos: filterSorter(state.todos, state.my_filter)
    }
};
const mapDispatchPrintToProps = (dispatch) => {
    return {
        onClick: (id) => {dispatch(toggleTodo(id))}
    };
};
export const PrintTodoList = connect(
    mapStatePrintToProps,
    mapDispatchPrintToProps
)(TodoList);
