import Wrapper from './app.style';
import Map from './components/map/Map.';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';
import { TIME_FORMAT, TODAY } from './utilities/constants';
import { useState } from 'react';
import moment from 'moment'

const App = () => {
  /* Active planet */
  const [date, setDate] = useState(TODAY) // useState(moment().format(DATE_FORMAT)) // Does not have data for recent times
  const [time, setTime] = useState(moment().format(TIME_FORMAT))

  const [spaceCenters, setSpaceCenters] = useState()
  const [selectedSpaceCenter, setSelectedSpaceCenter] = useState(null)
  const [hoveredSpaceCenter, setHoveredSpaceCenter] = useState(null)

  const [mapBoundaries, setMapBoundaries] = useState()

  const selectSpaceCenterByUID = (uid) => {
    setSelectedSpaceCenter(spaceCenters.find(spaceCenter => spaceCenter.uid === uid))
  }

  return (
    <Wrapper>
      <div className="app">
        <div className='row'>
          <div className='col-4'>
            <div className='logo'>SPACE TRIPS</div>
          </div>
          <div className='col-8'>
            <SearchBar selectSpaceCenter={selectSpaceCenterByUID}
              date={date} setDate={setDate}
              time={time} setTime={setTime}
              mapBoundaries={mapBoundaries}
              setSpaceCenters={setSpaceCenters}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <List spaceCenters={spaceCenters}
              selectedSpaceCenter={selectedSpaceCenter}
              selectSpaceCenter={setSelectedSpaceCenter}
              hoverSpaceCenter={setHoveredSpaceCenter}
              date={date}
              time={time} />
          </div>
          <div className='col-8'>
            <Map spaceCenters={spaceCenters}
              selectedSpaceCenter={selectedSpaceCenter}
              selectSpaceCenter={setSelectedSpaceCenter}
              hoveredSpaceCenter={hoveredSpaceCenter}
              setMapBoundaries={setMapBoundaries}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
