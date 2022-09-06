import Wrapper from './app.style';
import Map from './components/map/Map.';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';
import { TIME_FORMAT, TODAY } from './utilities/constants';
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

  const [spaceCenters, setSpaceCenters] = useState()
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
        <Configure hitsPerPage={400}
          filters="planet_code:EAR"
          insideBoundingBox={
            mapBoundaries
              ? [[mapBoundaries._ne.lat, mapBoundaries._sw.lng,
              mapBoundaries._sw.lat, mapBoundaries._ne.lng]]
              : undefined}
        />
        <div className="app">
          <div className='row'>
            <div className='col-4'>
              <div className='logo'>SPACE TRIPS</div>
              <List
                selectedSpaceCenter={selectedSpaceCenter}
                selectSpaceCenter={setSelectedSpaceCenter}
                hoverSpaceCenter={setHoveredSpaceCenter}
                date={date}
                time={time} />
            </div>
            <div className='col-8'>
              <SearchBar selectSpaceCenter={setSelectedSpaceCenter}
                date={date} setDate={setDate}
                time={time} setTime={setTime}
                mapBoundaries={mapBoundaries}
                setSpaceCenters={setSpaceCenters}
              />
              <Map
                selectedSpaceCenter={selectedSpaceCenter}
                selectSpaceCenter={setSelectedSpaceCenter}
                hoveredSpaceCenter={hoveredSpaceCenter}
                setMapBoundaries={setMapBoundaries}
              />
            </div>
          </div>
        </div>

      </InstantSearch>
    </Wrapper>
  );
}

export default App;
