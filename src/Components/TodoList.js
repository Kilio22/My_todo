import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';

import { toggleTodo } from '../actions/toggleTodo';

const filterSorter = (todos, filter) => {
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

const Todo = ({todo, onClick}) => (
    <h1 onClick={() => onClick()}
    style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</h1>
);
const TodoList = ({todos, onClick}) => (
    todos.map(todo => {
        return (
        <div key={todo.id}>
            <Todo todo={todo} onClick={() => {onClick(todo.id)}}/>
        </div>);
    }));
const mapStatePrintToProps = (state, { match }) => ({
        todos: filterSorter(state.todos, match.params.filter || 'all')
    });
/* const mapDispatchPrintToProps = (dispatch) => ({
        onClick: (id) => {dispatch(toggleTodo(id))}
    }); */
export const PrintTodoList = withRouter(connect(
    mapStatePrintToProps,
    { onClick: toggleTodo }
)(TodoList));
