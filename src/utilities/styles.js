import { makeStyles, createStyles } from '@material-ui/core/styles';

export const characterUseStyles = makeStyles((theme) =>
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

export const itemUseStyles = makeStyles((theme) =>
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