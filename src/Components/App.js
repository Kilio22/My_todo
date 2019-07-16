import React from 'react';

import { InputList } from './Input';
import { PrintTodoList } from './TodoList';
import { Footer } from './Footer';

export const App = ({ match }) => (
    <div>
        <InputList />
        <PrintTodoList/>
        <Footer />
    </div>
);