import { Configure, connectGeoSearch, InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import AutoComplete from './Autocomplete';
import React, { useState } from 'react';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPID,
    process.env.REACT_APP_ALGOLIA_APIKEY
);

const GeoSearch = (props) => {
    return (
        <InstantSearch
            indexName={process.env.REACT_APP_SEARCH_INDEX}
            searchClient={searchClient}
            onSearchStateChange={(searchState) => console.log(searchState)}
        >
            <AutoComplete
                selectSpaceCenter={props.selectSpaceCenter}
                setSpaceCenters={props.setSpaceCenters} />
            <Configure hitsPerPage={40}
                filters="planet_code:EAR"
                insideBoundingBox={
                    props.mapBoundaries
                        ? [[props.mapBoundaries._ne.lat, props.mapBoundaries._sw.lng,
                        props.mapBoundaries._sw.lat, props.mapBoundaries._ne.lng]]
                        : []}
            // facets={`'*,planet_code'`}
            // facetFilters={`[['planet_code:EAR']]`}
            />
        </InstantSearch>
    )
}

export default GeoSearch

// const CustomGeoSearch = connectGeoSearch(GeoSearch)
// export default CustomGeoSearch