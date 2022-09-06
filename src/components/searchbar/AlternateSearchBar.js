import React, { useEffect } from 'react';
import Wrapper from './searchbar.style';
import { TIME_FORMAT, TODAY } from '../../utilities/constants';
import moment from 'moment';
import AutoComplete from './Autocomplete';
import { useState } from 'react';

/* 
* Search Acts on button click 
* Found this less intuitive
* NOT UPDATED
*/
const SearchBar = (
    /* variables */
    date,
    time,
    /* functions */
    setDate,
    setTime,
    selectSpaceCenter
) => {
    const [selectedSpaceCenter, setSelectedSpaceCenter] = useState()
    const [departureDate, setDepartureDate] = useState()
    const [departureTime, setDepartureTime] = useState()

    useEffect(() => {
        if(date) setDepartureDate(date)
    }, [date])

    useEffect(() => {
        if(time) setDepartureDate(time)
    }, [date, time])

    /* Selects date */
    const selectDate = (e) => {
        setDepartureDate(e.target.value ? e.target.value : TODAY)
    }

    /* Selects time */
    const selectTime = (e) => {
        setDepartureTime(e.target.value ? e.target.value : moment().format(TIME_FORMAT))
    }

    /* Triggers on click of search button */
    const updateSearch = () => {
        setDate(departureDate)
        setTime(departureTime)
        if(selectedSpaceCenter) selectSpaceCenter(selectedSpaceCenter)
    }

    return <Wrapper>
        <div className="search-bar" id="search-bar">
            <div><label>Departure</label></div>
            <div>
                <AutoComplete selectSpaceCenter={setSelectedSpaceCenter} />
            </div>
            <div><label>Departure time</label></div>
            <div>
                <input type="date" value={departureDate} onChange={selectDate}></input>
                <input type="time" value={departureTime} onChange={selectTime}></input>
            </div>
            <div>
                <button onClick={updateSearch}></button>
            </div>
        </div>
    </Wrapper>
};

export default SearchBar;
