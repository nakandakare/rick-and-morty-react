import React, { Dispatch, SetStateAction, useState } from 'react';
import './ItemsOverview.scss';
import CharacterItem from '../CharacterItem/CharacterItem';
import Item from '../Item/Item';

interface IPageCount {
    pages: number,
    count: number
}

type Props = {
    filterType: string,
    searchInput: string,
    dataChar: any,
    dataLoc: any,
    dataEpi: any
};

const ItemsOverview = ({ filterType, dataChar, dataLoc, dataEpi  }: Props) => {

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