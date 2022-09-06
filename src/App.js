import Wrapper from './app.style';
import Map from './components/map/Map.';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';
// import SearchBar from './components/searchbar/AlternateSearchBar';
import { MAX_HITS, TIME_FORMAT, TODAY } from './utilities/constants';
import { useState } from 'react';
import moment from 'moment'
import { Configure, InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPID,
  process.env.REACT_APP_ALGOLIA_APIKEY
);

const App = () => {
  /* Active planet */
  const [date, setDate] = useState(TODAY) // useState(moment().format(DATE_FORMAT)) // Does not have data for recent times
  const [time, setTime] = useState(moment().format(TIME_FORMAT))

  const [selectedSpaceCenter, setSelectedSpaceCenter] = useState(null)
  const [hoveredSpaceCenter, setHoveredSpaceCenter] = useState(null)

  const [mapBoundaries, setMapBoundaries] = useState()

  return (
    <Wrapper>
      <InstantSearch
        indexName={process.env.REACT_APP_SEARCH_INDEX}
        searchClient={searchClient}
        onSearchStateChange={(searchState) => console.log(searchState)}
      >
        <Configure hitsPerPage={mapBoundaries ? MAX_HITS: 0}
          filters="planet_code:EAR"
          insideBoundingBox={
            mapBoundaries
              // ? [[mapBoundaries._ne.lat, mapBoundaries._sw.lng,
              // mapBoundaries._sw.lat, mapBoundaries._ne.lng]]
              ? `${mapBoundaries._ne.lat},${ mapBoundaries._ne.lng},${ mapBoundaries._sw.lat},${mapBoundaries._sw.lng}`
              : undefined}
        />
        <div className="app">
          <div className='row'>
            <div className='col-4'>
              <div className='logo'>SPACE TRIPS</div>
              <List
                selectedSpaceCenter={selectedSpaceCenter}
                date={date}
                time={time}
                hoverSpaceCenter={setHoveredSpaceCenter} />
            </div>
            <div className='col-8'>
              <SearchBar 
                date={date} setDate={setDate}
                time={time} setTime={setTime}
                mapBoundaries={mapBoundaries}
                selectSpaceCenter={setSelectedSpaceCenter}
              />
              <Map
                selectedSpaceCenter={selectedSpaceCenter}
                hoveredSpaceCenter={hoveredSpaceCenter}
                setMapBoundaries={setMapBoundaries}
                selectSpaceCenter={setSelectedSpaceCenter}
              />
            </div>
          </div>
        </div>

      </InstantSearch>
    </Wrapper>
  );
}

export default App;
