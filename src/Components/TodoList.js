import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import * as actions from '../actions/actions';
import { getIsFetching, getVisibleTodos, getErrorMessage } from '../reducers/index';
import FetchError from './FetchError';

const Todo = ({todo, onClick}) => (
    <h1 onClick={() => onClick()}
    style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</h1>
);

const TodoList = ({todos, onClick}) => (
    todos.map(todo => {
        return (
        <div key={todo.id}>
            <Todo todo={todo} onClick={() => {onClick(todo.id)}}/>
        </div>
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
        const {toggleTodo, todos, errorMessage, isFetching} = this.props;

        if (errorMessage && !todos.length)
            return <FetchError errorMessage={errorMessage} retry={() => this.fetchData()}/>
        if (isFetching && !todos.length)
            return <p>Loading...</p>
        return <TodoList onClick={toggleTodo} todos={todos}/>
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
