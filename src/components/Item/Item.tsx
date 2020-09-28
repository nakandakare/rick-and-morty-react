import React, { useState } from 'react';
import './Item.scss';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

type Props = {
    name: string,
    attributeOne: string,
    attributeTwo: string,
    characters: [],
    category: string
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 800,
            backgroundColor: '#18191a',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            color: 'white'
        },
    }),
);

const Item = ({ name, attributeOne, attributeTwo, characters, category }: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='itemContainer'>
            <div className='item' onClick={handleOpen}>
                <div className='title'>
                    <p>{name}</p>
                </div>
                <div className='attributes'>
                    <p>{attributeOne}</p>
                    <p>{attributeTwo}</p>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className='modalContainer'
            >
                <div className={classes.paper + ' modalInner'}>
                    <p className='name'>
                        {name}
                    </p>
                    <div className='attribute'>
                        {category === 'locations' ?
                            <p>Dimension: {attributeOne}</p>
                            :
                            <p>Episode: {attributeOne}</p>
                        }
                    </div>
                    <div className='attribute'>
                        {category === 'locations' ?
                            <p>Type: {attributeTwo}</p>
                            :
                            <p>Air Date: {attributeTwo}</p>
                        }
                    </div>
                    <div className='characters'>
                        <div className='charactersTitle'>
                            {
                                category === 'locations' ?
                                <p>
                                    Some residents:
                                </p>
                                :
                                <p>
                                    Some characters
                                </p>
                            }
                        </div>
                        {
                            characters ? characters.slice(0, 5).map((character: {image: string, name: string}, i: number) => 
                            <div key={i} className='eachCharacter'>
                                <img className='imgModal' src={character.image} />
                                <p className='name'>
                                    {character.name}
                                </p>
                            </div> )
                            :
                            null
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Item;