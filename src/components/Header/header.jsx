import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from './logo.svg';

import './header.scss';
import { MainContentContext } from '../MainContent/main-content-reducer';
import {SET_INITIAL_STATE } from '../MainContent/main-content-types';

const Header = (props) => {
    const { state, dispatch } = useContext(MainContentContext);
    const { images } = state;
    return (
        <div className="Header">
            <Link to="/">
                <img src={logo} alt="logo" onClick={() =>
                    dispatch({
                        type: SET_INITIAL_STATE
                    })} />
            </Link>
        </div>)
}


export default Header;