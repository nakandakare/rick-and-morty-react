import React, { Dispatch, SetStateAction, useState } from 'react';
import './ItemsOverview.scss';
import CharacterItem from '../CharacterItem/CharacterItem';
import Item from '../Item/Item';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from '../Spinner/Spinner';
import ResultsError from '../ResultsError/ResultsError';

interface IPageCount {
    pages: number,
    count: number
}

type Props = {
    filterType: string,
    searchInput: string
};

const GET_CHARACTERS = gql`
    query characters($name: String!) {
        characters(page: 1, filter: { name: $name }) {
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
    query locations($name: String!) {
        locations(page: 1, filter: { name: $name }) {
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
    query episodes($name: String!) {
        episodes(page: 1, filter: { name: $name }) {
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
const ItemsOverview = ({ filterType, searchInput }: Props) => {
    
    //obtiene los datos con apollo, si el input del search es menor a 3 caracteres, se "skippea" el query.
    const { loading: loadingChar, error: errorChar, data: dataChar } = useQuery(GET_CHARACTERS, { variables: { name: searchInput }, skip: !(filterType === 'characters') || searchInput.length < 3 });

    const { loading: loadingLoc, error: errorLoc, data: dataLoc } = useQuery(GET_LOCATIONS, { variables: { name: searchInput }, skip: !(filterType === 'locations') || searchInput.length < 3 });

    const { loading: loadingEpi, error: errorEpi, data: dataEpi } = useQuery(GET_EPISODES, { variables: { name: searchInput }, skip: !(filterType === 'episodes') || searchInput.length < 3 });

    if (loadingChar || loadingLoc || loadingEpi) {
        return <Spinner />
    }

    if (errorChar || errorLoc || errorEpi) {
        return <ResultsError message={`Error: we could not find the ${filterType}`} />
    }

    if (!dataChar && !dataLoc && !dataEpi) {
        return <ResultsError message={`Please use the search bar to find the ${filterType}`} />
    }


    return (
        <div className='itemsOverviewContainer'>
            <div className='itemsOverviewInner'>
                {filterType === 'characters' ?
                    dataChar.characters.results.map((character: { name: string; image: string; species: string; gender: string; created: string }, i: number) => <CharacterItem key={i} {...character} />)
                    :
                    filterType === 'locations' ?
                        dataLoc.locations.results.map((location: { name: string, type: string, dimension: string; residents: []; category: string }, i: number) => <Item key={i} name={location.name} attributeOne={location.dimension} attributeTwo={location.type} characters={location.residents} category={'locations'} />)
                        :
                        filterType === 'episodes' ?
                            dataEpi.episodes.results.map((episode: { name: string; episode: string; air_date: string; characters: []; category: string }, i: number) => <Item key={i} name={episode.name} attributeOne={episode.episode} attributeTwo={episode.air_date} characters={episode.characters} category={'episodes'} />)
                            :
                            null
                }
            </div>
        </div>
    )
}

export default ItemsOverview;