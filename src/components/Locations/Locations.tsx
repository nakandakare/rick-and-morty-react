import React, { Dispatch, SetStateAction } from 'react';
import './Locations.scss';
import { GET_LOCATIONS } from '../../utilities/queries';
import { useQuery } from '@apollo/react-hooks';
import Spinner from '../Spinner/Spinner';
import ResultsError from '../ResultsError/ResultsError';
import Item from '../Item/Item';

type Props = {
    searchInput: string,
    page: number,
    setPageCount: Dispatch<SetStateAction<number>>
};

const Characters = ({ searchInput, page, setPageCount }: Props) => {
    //obtiene los datos con apollo, si el input del search es menor a 3 caracteres, se "skippea" el query.
    const { loading, error, data } = useQuery(GET_LOCATIONS, { variables: { name: searchInput, page: page }, skip: searchInput.length < 3 });
    
    if(data) {
        setPageCount(data.locations.info.pages);
    }

    return (
        <>
            {
                loading ? <Spinner /> :
                    error ? <ResultsError message={'Error: we could not find the locations'} /> :
                        !data ? <ResultsError message={'Please use the search bar to find the locations'} /> :
                            <div className='itemsOverview'>
                                {
                                    data.locations.results.map((location: { name: string, type: string, dimension: string; residents: []; category: string }, i: number) => <Item key={i} name={location.name} attributeOne={location.dimension} attributeTwo={location.type} characters={location.residents} category={'locations'} />)
                                }
                            </div>
            }
        </>
    )
}

export default Characters;