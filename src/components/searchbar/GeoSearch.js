import { Configure, connectHits, InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import AutoComplete from './Autocomplete';
import React from 'react';
import { useEffect } from 'react';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APPID,
    process.env.REACT_APP_ALGOLIA_APIKEY
);

const HiddenHits = connectHits((props) => {
    useEffect(() => {
        if(!props.hits) return
        console.log(props.hits)
        // props.setSpaceCenters(props.hits)
    }, [props.hits])

    return (
        props.hits && props.hits.map((hit, index) => {
            return <div style={{ zIndex: 1}} key={hit.uid}>{hit.name}</div>
        })
    )
})


const GeoSearch = (props) => {
    return (
        <InstantSearch
            indexName={process.env.REACT_APP_SEARCH_INDEX}
            searchClient={searchClient}
            onSearchStateChange={(searchState) => console.log(searchState)}
        >
            <AutoComplete selectSpaceCenter={props.selectSpaceCenter}/>
            <Configure hitsPerPage={400}
                filters="planet_code:EAR"
                insideBoundingBox={
                    props.mapBoundaries
                        ? [[props.mapBoundaries._ne.lat, props.mapBoundaries._sw.lng,
                        props.mapBoundaries._sw.lat, props.mapBoundaries._ne.lng]]
                        : undefined}
            // facets={`'*,planet_code'`}
            // facetFilters={`[['planet_code:EAR']]`}
            />
            <HiddenHits setSpaceCenters={props.setSpaceCenters}/>
        </InstantSearch>
    )
}

export default GeoSearch

// const CustomGeoSearch = connectGeoSearch(GeoSearch)
// export default CustomGeoSearch