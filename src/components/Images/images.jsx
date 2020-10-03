import React from 'react';
import {withRouter} from 'react-router';

import './images.scss';

const Images = (props) => {
    return (
        <div className="Images" onScroll={e=>props.scrollHandler(e)}>
            {props.images.length > 0 ?
            props.images.map((image, index) => 
                <div key={index}
                    className="image_container animated"
                    onClick={()=>props.history.push({pathname: `/${image.id}`, state:{image:image}})}>
                    <img src={image.urls.small} alt={image.alt_description} />
                </div>
            ) : <p>No images found</p>}
        </div>
    )
}

export default withRouter(Images);