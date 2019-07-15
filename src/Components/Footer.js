import { connect } from 'react-redux';
import React from 'react';

import { changeFilter } from '../actions/changeFilter';

const Link = ({ buttonName, onClick, active }) => {
    if (active)
        return (<span>{buttonName}</span>)
    return (
        <button onClick={(e) => {
            e.preventDefault();
            onClick();
        }}>
        {buttonName}
        </button>
    );
};
const mapStateLinkToProps = (state, props) => {
    return {
        active: props.name === state.my_filter,
        buttonName: props.name
    }
};
const mapDispatchLinkToProps = (dispatch, props) => {
    return {
        onClick: () => {
            dispatch(changeFilter(props.name))
        }
    };
};
const FilterStyle = connect(
    mapStateLinkToProps,
    mapDispatchLinkToProps
)(Link);
export const Footer = () => {
    return (
    <p>
        <FilterStyle name='ALL'/>
        {' '}
        <FilterStyle name='COMPLETED'/>
        {' '}
        <FilterStyle name='VISIBLE'/>
    </p>
    );
};