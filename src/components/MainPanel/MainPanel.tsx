import React, { useState } from 'react';
import './MainPanel.scss';
import Filters from '../Filters/Filters';
import Searcher from '../Searcher/Searcher';
import ItemsOverview from '../ItemsOverview/ItemsOverview';
import Pagination from '@material-ui/lab/Pagination';

interface ISearchData {
    filterType: string,
    searchInput: string
}

interface IPageCount {
    pages: number,
    count: number
}

const MainPanel = () => {

    //Se utilizan estos datos para filtrar con graphql
    const [searchData, setSearchData] = useState<ISearchData>({ filterType: 'characters', searchInput: ""});

    const [pageCount, setPageCount] = useState<IPageCount>({ pages: 0, count: 0});

    return (
        <div className='mainPanelContainer'>
            <div className='filter'>
                <Filters searchData={searchData} setSearchData={setSearchData} />
            </div>
            <div className='mainContent'>
                <Searcher searchData={searchData} setSearchData={setSearchData} />
                <ItemsOverview {...searchData} />
                <div className='pagination'>
                    <Pagination count={5} />
                </div>
            </div>
        </div>
    )
}

export default MainPanel;