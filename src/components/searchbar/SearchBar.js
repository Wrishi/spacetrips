import React from 'react';
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Wrapper from './searchbar.style';
import AutoComplete from './Autocomplete';
import { TIME_FORMAT, TODAY } from '../../utilities/constants';
import moment from 'moment';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPID,
    process.env.REACT_APP_ALGOLIA_APIKEY
);

const SearchBar = (props) => {

    /* Selects date */
    const selectDate = (e) => {
        props.setDate(e.target.value ? e.target.value: TODAY)
    }

    /* Selects time */
    const selectTime = (e) => {
        props.setTime(e.target.value ? e.target.value: moment().format(TIME_FORMAT))
    }

    return <Wrapper>
        <div className="search-bar">
            <div><label>Departure</label></div>
            <div>
                <InstantSearch
                    indexName={process.env.REACT_APP_SEARCH_INDEX}
                    searchClient={searchClient}
                    onSearchStateChange={(searchState) => console.log(searchState)}
                >
                    <AutoComplete selectSpaceCenter={props.selectSpaceCenter}/>
                    <Configure hitsPerPage={4}
                        filters="planet_code:EAR"
                        // facets={`'*,planet_code'`}
                        // facetFilters={`[['planet_code:EAR']]`}
                    />
                </InstantSearch>
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
