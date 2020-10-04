import React from 'react';
import {Link} from 'react-router-dom';

import logo from './logo.svg';

import './header.scss';

const Header = () => (
    <div className="Header">
        <Link to="/">
        <img src = {logo} alt="logo" />
        </Link>
    </div>
);

export default Header;