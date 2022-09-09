import React, { useEffect, useRef, useState } from 'react'
import Wrapper from './map.style'
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import { DEFAULT_MAPBOX_CONFIG, MAPBOX_MIN_ZOOM } from '../../utilities/constants'
import pointerIcon from '../../assets/icons/Pointer@2x.svg'
import pointerIconSelected from '../../assets/icons/Pointer_selected@2x.svg'
import 'mapbox-gl/dist/mapbox-gl.css'
import { connectGeoSearch/*, connectHits*/ } from 'react-instantsearch-dom'

// Problems:
// 1) Pop up switch on marker change
// 2) Shame html
/* Works with connectHits as well */
const Map = connectGeoSearch(({
  /* variables */
  hits,
  selectedSpaceCenter,
  hoveredSpaceCenter,
  /* functions */
  selectSpaceCenter,
  setMapBoundaries
}) => {
  const mapRef = useRef(null)
  const [showPopUp, setShowPopUp] = useState(false)

  /* Fly to location if selected space center not in map */
  useEffect(() => {
    if (!selectedSpaceCenter) return

    mapRef.current.flyTo({
      center: [selectedSpaceCenter._geoloc.lng, selectedSpaceCenter._geoloc.lat]
    })
    setShowPopUp(true)

  }, [selectedSpaceCenter])

  /* Shows pop up when selected */
  const selectMarker = (e, spaceCenter) => {
    e.preventDefault();
    selectSpaceCenter(spaceCenter)
  }

  /* Closes pop up */
  const closePopUp = () => {
    // if(e.target.options.latitude === selectedSpaceCenter.latitude 
    //   && e.target.options.longitude === selectedSpaceCenter.longitude) 
    setShowPopUp(false)
    selectSpaceCenter(null)
  }

  /* Updates Map boundaries on view change */
  const mapViewChange = () => {
    setMapBoundaries(mapRef.current.getBounds())
  }

  return (
    <Wrapper>
      <div className="map">
        {/* {
          selectedSpaceCenter && <div className='shame'>{selectedSpaceCenter.name}</div>
        } */}
        <ReactMapGL
          ref={mapRef}
          initialViewState={DEFAULT_MAPBOX_CONFIG.viewState}
          style={DEFAULT_MAPBOX_CONFIG.style}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
          onLoad={mapViewChange}
          onDragEnd={mapViewChange}
          onZoomEnd={mapViewChange}
          onResize={mapViewChange}
          minZoom={MAPBOX_MIN_ZOOM} /* Too many space centers!! */
        >
          {
            hits && hits.length > 0 && hits.map((spaceCenter) => {
              return <Marker anchor="bottom" key={spaceCenter.uid}
                latitude={spaceCenter._geoloc.lat}
                longitude={spaceCenter._geoloc.lng}
              >
                <button className='marker-btn'
                  data-testid="marker"
                  onClick={(e) => selectMarker(e, spaceCenter)}>
                  {
                    (selectedSpaceCenter && selectedSpaceCenter.uid === spaceCenter.uid)
                      || (hoveredSpaceCenter && hoveredSpaceCenter.uid === spaceCenter.uid)
                      ? <img src={pointerIconSelected} alt="mark" />
                      : <img src={pointerIcon} alt="mark highlighted" />
                  }
                </button>
              </Marker>
            })
          }
          {
            selectedSpaceCenter &&
            showPopUp &&
            <Popup
              latitude={selectedSpaceCenter._geoloc.lat}
              longitude={selectedSpaceCenter._geoloc.lng}
              onClose={closePopUp}
              anchor='bottom'
              closeButton={false}
            >
              <div className='marker-card'>
                <div className='details'>
                  {selectedSpaceCenter.description}
                </div>
                <div className='title'>
                  <h3>{selectedSpaceCenter.name}</h3>
                </div>
              </div>
            </Popup>
          }
          <GeolocateControl />
          <NavigationControl />
          <FullscreenControl />
        </ReactMapGL>
      </div>
    </Wrapper>
  );
})

export default Map;
