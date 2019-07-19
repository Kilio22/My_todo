import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import * as actions from '../actions/actions';
import { getIsFetching, getVisibleTodos, getErrorMessage } from '../reducers/index';
import FetchError from './FetchError';

const Todo = ({todo, onClick}) => (
    <h1 onClick={() => onClick()}
    style={{textDecoration: todo.completed ? 'line-through' : 'none', display: 'inline-block'}}>{todo.text}</h1>
);

const TodoList = ({todos, onClick, deleteTodo}) => (
    todos.map(todo => {
        return (
        <li key={todo.id}>
            <Todo todo={todo} onClick={() => {onClick(todo.id)}}/>
            <h2 style={{display: 'inline-block', paddingLeft: '2em', fontSize: '25px'}} onClick={() => deleteTodo(todo.id)}>🗑</h2>
        </li>
    );
}));

export class PrintTodoList extends Component {
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter)
            this.fetchData()
    }
    render() {
        const {toggleTodo, todos, errorMessage, isFetching, deleteTodo} = this.props;

        if (errorMessage && !todos.length)
            return <FetchError errorMessage={errorMessage} retry={() => this.fetchData()}/>
        if (isFetching && !todos.length)
            return <p>Loading...</p>
        return <ul><TodoList onClick={toggleTodo} todos={todos} deleteTodo={deleteTodo}/></ul>
    }
    fetchData() {
        const { filter, fetchTodos } = this.props;

        fetchTodos(filter);
    }
};

const mapStatePrintToProps = (state, { match }) => {
    const filter = match.params.filter || 'all';
    console.log('UPDATE');
    return ({
        todos: getVisibleTodos(state, filter || 'all'),
        errorMessage: getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    });
};

PrintTodoList = withRouter(connect(
    mapStatePrintToProps,
    actions
)(PrintTodoList));
