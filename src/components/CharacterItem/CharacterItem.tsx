import React, { useState } from 'react';
import './CharacterItem.scss';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

type Props = {
    name: string,
    image: string,
    species: string,
    gender: string,
    created: string
};


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 500,
            backgroundColor: '#18191a',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            color: 'white'
        },
    }),
);

const CharacterItem = ({ name, image, species, gender, created }: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className='item' onClick={handleOpen}>
                <img className='img' src={image} />
                <p className='title'>{name}</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                className='modalContainer'
            >
                <div className={classes.paper + ' modalInner'}>
                    <img className='imgModal' src={image} />
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