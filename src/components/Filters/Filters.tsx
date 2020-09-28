import React from 'react';
import './Filters.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Filters = (props: any) => {

    const { setSearchData, searchData } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchData({...searchData, filterType: (event.target as HTMLInputElement).value});
    };

    return (
        <div className='filtersContainer'>
            <div className='filterInner'>
                <div className='title'>
                    Filters
                </div>
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup name="filterType" value={searchData.filterType} onChange={handleChange}>
                            <FormControlLabel value="characters" control={<Radio />} label="Characters" />
                            <FormControlLabel value="locations" control={<Radio />} label="Locations" />
                            <FormControlLabel value="episodes" control={<Radio />} label="Episodes" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default Filters;