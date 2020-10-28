import React, { useState } from 'react';
import './MainPanel.scss';
import Filters from '../Filters/Filters';
import Searcher from '../Searcher/Searcher';
import Pagination from '@material-ui/lab/Pagination';
import Characters from '../Characters/Characters';
import Locations from '../Locations/Locations';
import Episodes from '../Episodes/Episodes';

interface ISearchData {
    filterType: string,
    searchInput: string
}

const MainPanel = () => {

    //Se utilizan estos datos para filtrar con graphql
    const [searchData, setSearchData] = useState<ISearchData>({ filterType: 'characters', searchInput: "" });
    const { filterType, searchInput } = searchData;

    //Un state para la paginación
    const [page, setPage] = useState<number>(1);

    //Un state para la cantidad de paginas que puede tener cada componente (characters, locations, episodes)
    const [pageCount, setPageCount] = useState<number>(0);

    //Se ejecuta esta funcion cuando se cambia de pagina
    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className='mainPanelContainer'>
            <div className='filter'>
                <Filters searchData={searchData} setSearchData={setSearchData} setPage={setPage} />
            </div>
            <div className='mainContent'>
                <Searcher searchData={searchData} setSearchData={setSearchData} setPage={setPage} />
                <div className='itemsOverviewContainer'>
                    {
                        filterType === 'characters' ?
                            <Characters searchInput={searchInput} page={page} setPageCount={setPageCount}/>
                            : filterType === 'locations' ?
                                <Locations searchInput={searchInput} page={page} setPageCount={setPageCount}/>
                                : filterType === 'episodes' ?
                                    <Episodes searchInput={searchInput} page={page} setPageCount={setPageCount}/>
                                    : null
                    }
                </div>
                <div className='pagination'>
                    <Pagination onChange={onPageChange} page={page} count={pageCount} />
                </div>
            </div>
        </div>
    )
}

export default MainPanel;