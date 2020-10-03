import React, { useEffect, useImperativeHandle, useState } from 'react';
import { withApollo } from "react-apollo";
import gql from 'graphql-tag';
import { Spinner } from 'react-rainbow-components';

import SearchBar from '../SearchBar';
import Images from '../Images';

import './main-content.scss';
import ErrorComponent from '../ErrorComponent';
import Header from '../Header';
import Footer from '../Footer';

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
    const [{ page, query, images, error, loading }, setParams] = useState({
        page: 1,
        query: "",
        images: [],
        error: null,
        loading: true
    })

    const getImages = (page, query) => {
        props.client.query({
            query: GET_IMAGES_QUERY,
            variables: { page, query }
        })
            .then(res => {
                setParams((prev) => ({
                    ...prev,
                    loading: false,
                    images: prev.images.concat(res.data.images)
                }));
            })
            .catch(e =>
                setParams((prev) => ({
                    ...prev,
                    loading: false,
                    error: e.toString()
                })));
    }

    const scrollHandler = ({ currentTarget }) => {
        if (currentTarget.scrollTop + currentTarget.clientHeight + 50 >= currentTarget.scrollHeight) {
            setParams((prev) => ({
                ...prev,
                page: prev.page + 1,
                query: prev.query
            }));
        }
    }

    const changeHandler = (query) => {
        console.log(`query:${query}`);
        setParams({
            page: 1,
            query,
            images: [],
            error: null,
            loading: true
        });
    }

    useEffect(() => {
        getImages(page, query);
    }, [page, query]);


    return (
        <>
            <SearchBar changeHandler={changeHandler} />
            {
                loading
                    ? <Spinner size="x-large" style={{ width: `150px`, height: `150px` }} />
                    : error
                        ? <ErrorComponent />
                        : <Images images={images} scrollHandler={scrollHandler} />
            }
        </>
    )
}

export default withApollo(MainContent);