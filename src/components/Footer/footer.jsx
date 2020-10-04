import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

import './footer.scss';

const Footer = () => (
    <div className="Footer">
        <div className="info">
            <p>Infinite-scroll Image Viewer</p>
            <p>Created by Alex Mykhailiuk, 2020</p>
        </div>
        <div className="feedback">
        <p>Contact with me:</p>
        <Link to={{ pathname: 'https://instagram.com/a1exand3r_f' }} target='_blank'>
            <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link to={{ pathname: 'https://github.com/Anonim147' }} target='_blank'>
            <FontAwesomeIcon icon={faGithub} />
        </Link>
        </div>
    </div>
);

export default Footer;
