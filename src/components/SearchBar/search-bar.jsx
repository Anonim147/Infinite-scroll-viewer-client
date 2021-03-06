import React, { useEffect } from 'react';
import { useState } from 'react';

import './search-bar.scss';

const SearchBar = (props) => {
    const[searchValue, setSearchValue] = useState(props.searchValue);

    useEffect(()=>{
        setSearchValue(props.searchValue);
    }, [props.searchValue]);
    return (

        <div className="SearchBar animated">
            <form onSubmit={e => { e.preventDefault(); props.changeHandler(searchValue);}}>
                <input 
                    className="search_input" 
                    type="text" 
                    placeholder='Type here to search' 
                    value={searchValue}
                    onChange={e=>setSearchValue(e.target.value)}
                />
                <input 
                    className="search_button orange_button" 
                    type="submit" 
                    value="Search"
                    disabled={searchValue.length<1} 
                />
            </form>
        </div>
    )
}

    export default SearchBar;