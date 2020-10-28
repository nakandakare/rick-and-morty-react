import React, { Dispatch, SetStateAction } from 'react';
import './Episodes.scss';
import { GET_EPISODES } from '../../utilities/queries';
import { useQuery } from '@apollo/react-hooks';
import Spinner from '../Spinner/Spinner';
import ResultsError from '../ResultsError/ResultsError';
import Item from '../Item/Item';

type Props = {
    searchInput: string,
    page: number,
    setPageCount: Dispatch<SetStateAction<number>>
};

const Episodes = ({ searchInput, page, setPageCount }: Props) => {
    //obtiene los datos con apollo, si el input del search es menor a 3 caracteres, se "skippea" el query.
    const { loading, error, data } = useQuery(GET_EPISODES, { variables: { name: searchInput, page: page }, skip: searchInput.length < 3 });

    if(data) {
        setPageCount(data.episodes.info.pages);
    }
    
    return (
        <>
            {
                loading ? <Spinner /> :
                    error ? <ResultsError message={'Error: we could not find the episodes'} /> :
                        !data ? <ResultsError message={'Please use the search bar to find the episodes'} /> :
                            <div className='itemsOverview'>
                                {
                                    data.episodes.results.map((episode: { name: string; episode: string; air_date: string; characters: []; category: string }, i: number) => <Item key={i} name={episode.name} attributeOne={episode.episode} attributeTwo={episode.air_date} characters={episode.characters} category={'episodes'} />)
                                }
                            </div>
            }
        </>
    )
}

export default Episodes;