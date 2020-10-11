import React, { useEffect, useContext } from 'react';
import { withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { Spinner } from 'react-rainbow-components';

import SearchBar from '../SearchBar';
import Images from '../Images';

import './main-content.scss';
import ErrorComponent from '../ErrorComponent';
import { MainContentContext } from './main-content-reducer';
import { SET_QUERY, SET_PAGES, SET_ERROR, SET_IMAGES } from './main-content-types';
import './main-content.scss';
import image from '../Image/image';

const GET_IMAGES_QUERY = gql`
query GetImagesQuery($page:Int, $query:String) {
    images(page:$page, query:$query){
    id
    alt_description
    user{
        username
        name
    }
    urls{
      small
      regular
      full
    }
  }
}
`

const MainContent = (props) => {

    const { state, dispatch } = useContext(MainContentContext);
    const { page, query, images, error, loading } = state;

    const getImages = (page, query) => {
        props.client.query({
            query: GET_IMAGES_QUERY,
            variables: { page, query }
        })
            .then(res => {
                dispatch({
                    type:SET_IMAGES,
                    payload: {
                        images: res.data.images
                    }
                });
            })
            .catch(e =>{
                dispatch({
                    type:SET_ERROR,
                    payload: {error: e.toString()}
                });
            });
    }

    const scrollHandler = ({ currentTarget }) => {
        if (currentTarget.scrollTop + currentTarget.clientHeight + 50 >= currentTarget.scrollHeight) {
            dispatch({
                type: SET_PAGES,
                payload: { page:page + 1 }
            })
        }
    }

    const changeHandler = (query) => {
        dispatch({
            type:SET_QUERY,
            payload:{
                query:query
            }
        })
    }

    useEffect(() => {
        console.log('UseEffect');

        getImages(page, query);
    }, [page, query]);

    return (
        <div className="MainContent">
            <SearchBar changeHandler={changeHandler} searchValue={query}/>
            {
                loading
                    ? <Spinner size="x-large" style={{ width: `150px`, height: `150px` }} />
                    : error
                        ? <ErrorComponent />
                        : <Images images={images} scrollHandler={scrollHandler} />
            }
        </div>
    )
}

export default withApollo(MainContent);