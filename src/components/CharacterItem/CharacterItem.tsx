import React, { useState } from 'react';
import './CharacterItem.scss';
import { characterUseStyles } from '../../utilities/styles';
import Modal from '@material-ui/core/Modal';

type Props = {
    name: string,
    image: string,
    species: string,
    gender: string,
    created: string
};

const CharacterItem = ({ name, image, species, gender, created }: Props) => {
    const classes = characterUseStyles();
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className='item' onClick={handleOpen}>
                <img className='img' src={image} alt='charImage'/>
                <p className='title'>{name}</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className='modalContainer'
            >
                <div className={classes.paper + ' modalInner'}>
                    <img className='imgModal' src={image} alt='modalImage'/>
                    <p className='name'>
                        {name}
                    </p>
                    <p className='attribute'>
                        Species: {species}
                    </p>
                    <p className='attribute'>
                        Gender: {gender}
                    </p>
                    <p className='attribute'>
                        Created at: {created.split('T')[0]}
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default CharacterItem;