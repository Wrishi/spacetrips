import React from 'react';
import Wrapper from './searchbar.style';
import { TIME_FORMAT, TODAY } from '../../utilities/constants';
import moment from 'moment';
import AutoComplete from './Autocomplete';

const SearchBar = ({
    /* variables */
    date,
    time,
    /* functions */
    setDate,
    setTime,
    selectSpaceCenter
}) => {

    /* Selects date */
    const selectDate = (e) => {
        setDate(e.target.value ? e.target.value : TODAY)
    }

    /* Selects time */
    const selectTime = (e) => {
        setTime(e.target.value ? e.target.value : moment().format(TIME_FORMAT))
    }

    return <Wrapper>
        <div className="search-bar" data-testid="search-bar">
            <div><label>Departure</label></div>
            <div>
                <AutoComplete selectSpaceCenter={selectSpaceCenter} />
            </div>
            <div><label>Departure time</label></div>
            <div>
                <input type="date" value={date} onChange={selectDate}></input>
                <input type="time" value={time} onChange={selectTime}></input>
            </div>
            <div>
                <button></button>
            </div>
        </div>
    </Wrapper>
};

export default SearchBar;
