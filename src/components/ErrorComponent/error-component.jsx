import React from 'react';

import error from './error.png';
import './error-component.scss';

const ErrorComponent = (props) =>
    <div className="ErrorComponent">
        <div className="image_container">
            <img src={error} alt="Error!" />
        </div>
        <div className="text_container">
            <h2>{props.error ? props.error : "Ooops! Something goes wrong:("}</h2>
            <p>{props.description ? props.description : "Sit back and relax. We'll fix it ASAP."}</p>
        </div>
    </div>

export default ErrorComponent;