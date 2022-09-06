import React from 'react';
import Wrapper from './searchbar.style';
import { TIME_FORMAT, TODAY } from '../../utilities/constants';
import moment from 'moment';
import AutoComplete from './Autocomplete';

const SearchBar = (props) => {

    /* Selects date */
    const selectDate = (e) => {
        props.setDate(e.target.value ? e.target.value : TODAY)
    }

    /* Selects time */
    const selectTime = (e) => {
        props.setTime(e.target.value ? e.target.value : moment().format(TIME_FORMAT))
    }

    return <Wrapper>
        <div className="search-bar">
            <div><label>Departure</label></div>
            <div>
                <AutoComplete selectSpaceCenter={props.selectSpaceCenter} />
            </div>
            <div><label>Departure time</label></div>
            <div>
                <input type="date" value={props.date} onChange={selectDate}></input>
                <input type="time" value={props.time} onChange={selectTime}></input>
            </div>
            <div>
                <button></button>
            </div>
        </div>
    </Wrapper>
};

export default SearchBar;
