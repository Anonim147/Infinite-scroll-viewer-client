export const SET_QUERY = 'SET_QUERY';
export const SET_ERROR = 'SET_ERROR';
export const SET_IMAGES = 'SET_IMAGES';
export const SET_PAGES = 'SET_PAGES';


export const initialState = {
    page:1,
    query:'',
    images:[],
    error:null,
    loading:true
};

export const mainContentReducer = (state, action) => {
    switch(action.type){
        case SET_QUERY : 
            return {
                ...state,
                query: action.payload.query
            }
        case SET_ERROR : 
            return {
                ...state,
                loading: false,
                error: action.payload.error.toString()
            }
        case SET_IMAGES : 
            return {
                ...state,
                loading:false,
                images:state.images.concat(action.payload.images)
            }
        case SET_PAGES:
            return {
                ...state,
                page:action.payload.pahe
            }
        default:
            return state;
    }
};