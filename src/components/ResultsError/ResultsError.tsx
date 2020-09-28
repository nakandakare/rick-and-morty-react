import React from 'react';
import './ResultsError.scss';

type Props = {
    message: string
};

const ResultsError = ({message}: Props) => {
    return(
        <div className='resultsErrorContainer'>
            <div className='resultsErrorInner'>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ResultsError;