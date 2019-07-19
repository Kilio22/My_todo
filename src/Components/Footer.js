import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterStyle = ({filter, children}) => {
    return (
    <NavLink
        exact
        to={'/' + (filter === 'all' ? '' : filter)}
        activeStyle={{
            textDecoration: 'none',
            color: 'black'
        }}>
        {children}
    </NavLink>
    )
};

export const Footer = () => (
    <p>
        <FilterStyle filter='all'>
            All
        </FilterStyle>
        {' '}
        <FilterStyle filter='completed'>
            Completed
        </FilterStyle>
        {' '}
        <FilterStyle filter='visible'>
            Visible
        </FilterStyle>
    </p>
);