import React, { useState } from 'react';
import './MainPanel.scss';
import Filters from '../Filters/Filters';
import Searcher from '../Searcher/Searcher';
import ItemsOverview from '../ItemsOverview/ItemsOverview';
import Pagination from '@material-ui/lab/Pagination';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Spinner from '../Spinner/Spinner';
import ResultsError from '../ResultsError/ResultsError';

interface ISearchData {
    filterType: string,
    searchInput: string
}

const GET_CHARACTERS = gql`
    query characters($name: String!, $page: Int) {
        characters(page: $page, filter: { name: $name }) {
            info {
                pages,
                count
              }
        results {
            name
            image
            species
            gender
            created
            }
        }
    }
`;

const GET_LOCATIONS = gql`
    query locations($name: String!,  $page: Int) {
        locations(page: $page, filter: { name: $name }) {
            info {
                pages,
                count
              }
            results{
                name
                type
                dimension
                residents {
                  name
                  image
                }
        }
    }
}
`;

const GET_EPISODES = gql`
    query episodes($name: String!,  $page: Int) {
        episodes(page: $page, filter: { name: $name }) {
            info {
                pages,
                count
              }
        results {
            name
            air_date
            episode
            characters {
                name
                image
              } 
            }
        }
    }
`;

const MainPanel = () => {

    //Se utilizan estos datos para filtrar con graphql
    const [searchData, setSearchData] = useState<ISearchData>({ filterType: 'characters', searchInput: "" });
    const { filterType, searchInput } = searchData;

    //Un state para la paginación
    const [page, setPage] = useState<number>(1);

    //Se ejecuta esta funcion cuando se cambia de pagina
    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    //obtiene los datos con apollo, si el input del search es menor a 3 caracteres, se "skippea" el query.
    const { loading: loadingChar, error: errorChar, data: dataChar } = useQuery(GET_CHARACTERS, { variables: { name: searchInput, page: page }, skip: !(filterType === 'characters') || searchInput.length < 3 });
    const { loading: loadingLoc, error: errorLoc, data: dataLoc } = useQuery(GET_LOCATIONS, { variables: { name: searchInput, page: page }, skip: !(filterType === 'locations') || searchInput.length < 3 });
    const { loading: loadingEpi, error: errorEpi, data: dataEpi } = useQuery(GET_EPISODES, { variables: { name: searchInput, page: page }, skip: !(searchData.filterType === 'episodes') || searchInput.length < 3 });

    return (
        <div className='mainPanelContainer'>
            <div className='filter'>
                <Filters searchData={searchData} setSearchData={setSearchData} setPage={setPage} />
            </div>
            <div className='mainContent'>
                <Searcher searchData={searchData} setSearchData={setSearchData}  setPage={setPage}/>
                {
                    loadingChar || loadingLoc || loadingEpi ? <Spinner /> :
                        errorChar || errorLoc || errorEpi ? <ResultsError message={`Error: we could not find the ${filterType}`} /> :
                            !dataChar && !dataLoc && !dataEpi ? <ResultsError message={`Please use the search bar to find the ${filterType}`} /> :
                                <ItemsOverview {...searchData} dataChar={dataChar} dataLoc={dataLoc} dataEpi={dataEpi} />
                }
                <div className='pagination'>
                    <Pagination onChange={onPageChange} page={page} count={dataChar ? dataChar.characters.info.pages : dataLoc ? dataLoc.locations.info.pages : dataEpi ? dataEpi.episodes.info.pages : 0}/>
                </div>
            </div>
        </div>
    )
}

export default MainPanel;