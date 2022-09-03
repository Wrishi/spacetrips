import React from 'react';
import Wrapper from './searchbar.style';
import { Configure, InstantSearch, SearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPID,
  process.env.REACT_APP_ALGOLIA_APIKEY
);


const SearchBar = () => {
  return (
    <Wrapper>
      <div className="search-bar">
        <div><label>Departure</label></div>
        <div>
          <InstantSearch
            indexName={process.env.REACT_APP_SEARCH_INDEX}
            searchClient={searchClient}
          // Optional parameters
          // searchState={object}
          // resultsState={object}
          // createURL={function}
          // onSearchStateChange={function}
          // onSearchParameters={function}
          // refresh={boolean}
          // stalledSearchDelay={number}
          >
            <Configure facets={`'*,planet_code'`} facetFilters={`[['planet_code:EAR']]`} />
            <SearchBox
            // Optional parameters
            //   defaultRefinement={string}
            //   autoFocus={boolean}
            //   searchAsYouType={boolean}
            //   showLoadingIndicator={boolean}
            //   submit={React.Node}
            //   reset={React.Node}
            //   loadingIndicator={React.Node}
            //   focusShortcuts={string[]}
            //   onSubmit={function}
            //   onReset={function}
            //   on*={function}
            // translations={object}
            />
          </InstantSearch>
        </div>
        <div><label>Departure time</label></div>
        <div>

        </div>
        <div>
          <button></button>
        </div>
      </div>
    </Wrapper>
  );
}

export default SearchBar;
