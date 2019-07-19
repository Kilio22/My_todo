import { connect } from 'react-redux';
import React from 'react';

import {addTodo} from '../actions/actions';

export let InputList = ({ dispatch }) => {
    let input;

    return (
    <div>
        <input type='text/plain' placeholder='Write your todo' ref={node => { input = node }}></input>
        <button onClick={() => { dispatch(addTodo(input.value));
        input.value = ''}}>Add todo</button>
    </div>
    );
};
InputList = connect()(InputList)