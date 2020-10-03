import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import FileSaver from 'file-saver';
import { withApollo } from 'react-apollo';
import useClipboard from 'react-use-clipboard';
import gql from 'graphql-tag';
import { Spinner } from 'react-rainbow-components';
import { useToasts } from 'react-toast-notifications';

import ErrorComponent from '../ErrorComponent';

import './image.scss';

const GET_IMAGE_QUERY = gql`
query GetImageQuery($id: String!) {
    image(id:$id){
		id
    description
    alt_description
    urls{
      regular
      full
    }
  }
}
`

const Image = (props) => {
    const image_from_parent = props.location.state.image;
    const [{ image, loading, error }, setState] = useState({
        image: null,
        loading: true,
        error: null
    });
    const { id } = props.match.params;
    const [isCopied, setCopied] = useClipboard(window.location);
    const { addToast } = useToasts();

    useEffect(() => {
        console.log('useEffect');
        if(image_from_parent){
            setState(({
                    image:image_from_parent,
                    loading:false,
                    error:null
                }));
        }
        else{
            props.client.query({
                query: GET_IMAGE_QUERY,
                variables: { id }
            })
                .then(res => {
                    console.log(res.data.image);
                    setState((prev)=>({
                        image: res.data.image,
                        loading: false,
                        error: null
                    }));
                    
                })
                .catch(e => setState({
                    image: null,
                    loading: false,
                    error: e.toString()
                }))
        }
        
    }, [])

    const saveImage = (url) => {
        const name = url.slice(url.lastIndexOf('/'));
        FileSaver.saveAs(url, getFileName(url));
    }

    const getFileName = (link) => {
        return link.slice(link.lastIndexOf('/')+1,link.indexOf('?'));
    }

    const copyToClipboard = async () => {
        
        /*setCopied();
        addToast("Copied to clipboard!", {
            appearance: 'info',
            autoDismiss: true,
          })*/
          console.log(navigator !== undefined)
          console.log(navigator.canShare());
          //await navigator.share({image: image.urls.full});
    }
    return (<div className="Image">

        <button className="red_button" onClick={() => props.history.push('/')}>Go back</button>

        { error ? <ErrorComponent /> :
            loading ? <Spinner size="x-large" style={{ width: `150px`, height: `150px` }} /> :
                <>
                    <div className="image_container">
                        <img src={image.urls.regular} alt={image.alt_description}></img>
                    </div>
                    <div className="image_info">
                        <div className="image_details">
                            <h2>{image.alt_description}</h2>
                            <p>Created By</p>
                            <p>{image.user.name}</p>
                        </div>
                        <div className="image_actions">
                            <button className="lime_button" onClick={() => saveImage(image.urls.full,)}> Download</button>
                            <button className="yellow_button" onClick={copyToClipboard}>Share</button>
                        </div>
                    </div>
                </>}
    </div>)
}

export default withApollo(withRouter(Image));

