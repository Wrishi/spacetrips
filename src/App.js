import Wrapper from './app.style';
import Map from './components/map/Map.';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';
import { PLANET, TIME_FORMAT, TODAY } from './utilities/constants';
import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react';
import { GET_SPACESTATIONS } from './graplql/queries';
import moment from 'moment'

const App = () => {
  /* Active planet */
  const currentPlanet = PLANET.earth
  const [date, setDate] = useState(TODAY) // useState(moment().format(DATE_FORMAT)) // Does not have data for recent times
  const [time, setTime] = useState(moment().format(TIME_FORMAT))

  const page = useRef(1)
  const { loading, error, data, fetchMore } = useQuery(GET_SPACESTATIONS, {
    variables: {
      page: page.current,
      pageSize: 100
    },
  })
  const [spaceCenters, setSpaceCenters] = useState([])
  const [spaceCentersInMapView, setSpaceCentersInMapView] = useState([])
  const [selectedSpaceCenter, setSelectedSpaceCenter] = useState(null)
  const [hoveredSpaceCenter, setHoveredSpaceCenter] = useState(null)

  useEffect(() => {
    if (!data) return
    // console.log(data)
    setSpaceCenters([...spaceCenters, ...data.spaceCenters.nodes.filter(spaceCenter => spaceCenter.planet.code === currentPlanet.code)])
  }, [data])

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
              time={time} setTime={setTime} />
          </div>
        </div>
        <div className='row'>
          {loading && <div className='alert info'>Loading locations...</div>}
          {error && <div className='alert error'>Unknown error occured...</div>}
          <div className='col-4'>
            {spaceCenters.length}
            <button onClick={() => {
              page.current = page.current + 1
              // console.log(page.current)
              fetchMore({
                variables: { page: page.current, pageSize: 100 },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  // console.log(fetchMoreResult)
                  return fetchMoreResult
                }
              })
            }}>Load more</button>
            <List spaceCenters={spaceCentersInMapView}
              selectedSpaceCenter={selectedSpaceCenter}
              selectSpaceCenter={setSelectedSpaceCenter}
              hoverSpaceCenter={setHoveredSpaceCenter}
              date={date} 
              time={time}/>
          </div>
          <div className='col-8'>
            <Map spaceCenters={spaceCenters}
              setVisibleSpaceCenters={setSpaceCentersInMapView}
              selectedSpaceCenter={selectedSpaceCenter}
              selectSpaceCenter={setSelectedSpaceCenter} 
              hoveredSpaceCenter={hoveredSpaceCenter}/>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
