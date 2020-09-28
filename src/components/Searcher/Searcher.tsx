import React from 'react';
import './Searcher.scss';

const Searcher = (props: any) => {

    const { setSearchData, searchData } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //En el tercer carater no se hace el skip para obtener los datos.
        setSearchData({ ...searchData, searchInput: (event.target as HTMLInputElement).value })
    };

    const reset = () => {
        setSearchData({...searchData, searchInput: ""});
    }

    return (
        <div className='searcherContainer'>
            <input placeholder='Search' className='searchBar' onChange={handleChange} value={searchData.searchInput} />
            <button className="button" onClick={reset}>Reset</button>
        </div>
    )
}

export default Searcher;