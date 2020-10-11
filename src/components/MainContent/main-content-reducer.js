import React from 'react';

import { SET_INITIAL_STATE, SET_ERROR, SET_PAGES, SET_IMAGES, SET_QUERY } from './main-content-types';

export const MainContentContext = React.createContext({});

export const initialState = {
    page: 1,
    query: '',
    images: [],
    error: null,
    loading: true
};

export const mainContentReducer = (state, action) => {
    switch (action.type) {
        case SET_INITIAL_STATE:
            return initialState
        case SET_QUERY:
            return {
                page: 1,
                images: [],
                query: action.payload.query,
                error: null,
                loading: true
            }
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error.toString()
            }
        case SET_IMAGES:
            return {
                ...state,
                loading: false,
                images: state.images.concat(action.payload.images)
            }
        case SET_PAGES:
            return {
                ...state,
                page: action.payload.page,
                query: state.query
            }
        default:
            return state;
    }
};