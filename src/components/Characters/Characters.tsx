import React, { Dispatch, SetStateAction } from 'react';
import './Characters.scss';
import { GET_CHARACTERS } from '../../utilities/queries';
import { useQuery } from '@apollo/react-hooks';
import Spinner from '../Spinner/Spinner';
import ResultsError from '../ResultsError/ResultsError';
import CharacterItem from '../CharacterItem/CharacterItem';

type Props = {
    searchInput: string,
    page: number,
    setPageCount: Dispatch<SetStateAction<number>>
};

const Characters = ({ searchInput, page, setPageCount }: Props) => {
    //obtiene los datos con apollo, si el input del search es menor a 3 caracteres, se "skippea" el query.
    const { loading, error, data } = useQuery(GET_CHARACTERS, { variables: { name: searchInput, page: page }, skip: searchInput.length < 3 });

    if(data) {
        setPageCount(data.characters.info.pages);
    }

    return (
        <>
            {
                loading ? <Spinner /> :
                    error ? <ResultsError message={'Error: we could not find the characters'} /> :
                        !data ? <ResultsError message={'Please use the search bar to find the characters'} /> :
                            <div className='itemsOverview'>
                                {
                                    data.characters.results.map((character: { name: string; image: string; species: string; gender: string; created: string }, i: number) => <CharacterItem key={i} {...character} />)
                                }
                            </div>
            }
        </>
    )
}

export default Characters;