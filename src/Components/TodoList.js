import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router';

import { toggleTodo } from '../actions/toggleTodo';
import { getVisibleTodos } from '../configureStore';

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
        todos: getVisibleTodos(state, match.params.filter || 'all')
    });
export const PrintTodoList = withRouter(connect(
    mapStatePrintToProps,
    { onClick: toggleTodo }
)(TodoList));
