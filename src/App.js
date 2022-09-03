import Wrapper from './app.style';
import Map from './components/map/Map.';
import List from './components/list/List';
import SearchBar from './components/searchbar/SearchBar';
import { PLANET } from './utilities/constants';
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { GET_SPACESTATIONS_FOR_PLANET } from './graplql/queries';

const App = () => {
  // Active planet
  const currentPlanet = PLANET.earth

  const { loading, error, data } = useQuery(GET_SPACESTATIONS_FOR_PLANET)
  const [spaceCenters, setSpaceCenters] = useState()
  const [selectedSpaceCenter, setSelectedSpaceCenter] = useState(null)

  useEffect(() => {
    if (data) setSpaceCenters(data.planets.find(planet => planet.id === currentPlanet.id).spaceCenters)
  }, [data])

  return (
    <Wrapper>
      <div className="app">
        <div className='row'>
          <div className='col-4'>
            <div className='logo'>SPACE TRIPS</div>
          </div>
          <div className='col-8'>
            <SearchBar />
          </div>
        </div>
        <div className='row'>
          {loading && <div className='alert info'>Loading locations...</div>}
          {error && <div className='alert error'>Unknown error occured...</div>}
          <div className='col-4'>
            <List spaceCenters={spaceCenters} selectedSpaceCenter={selectedSpaceCenter} selectSpaceCenter={setSelectedSpaceCenter} />
          </div>
          <div className='col-8'>
            <Map spaceCenters={spaceCenters} selectedSpaceCenter={selectedSpaceCenter} selectSpaceCenter={setSelectedSpaceCenter} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
