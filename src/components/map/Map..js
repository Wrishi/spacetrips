import React, { useEffect, useRef, useState } from 'react'
import Wrapper from './map.style'
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import pointerIcon from '../../assets/icons/Pointer@2x.svg'
import pointerIconSelected from '../../assets/icons/Pointer_selected@2x.svg'
import { DEFAULT_MAPBOX_CONFIG, MAPBOX_MIN_ZOOM } from '../../utilities/constants'

// Problems:
// 1) Pop up switch on marker change
// 2) Shame html

const Map = (props) => {
  const mapRef = useRef(null)
  const [spaceCentersInView, setSpaceCentersInView] = useState()

  /* Checks if location is in viewport 
     Library must have had its own function
  */
  const isLocationInViewPort = (location) => {
    const mapBounds = mapRef.current.getBounds()
    return location.latitude > mapBounds._sw.lat
      && location.latitude < mapBounds._ne.lat
      && location.longitude > mapBounds._sw.lng
      && location.longitude < mapBounds._ne.lng
  }

  /* Fly to location if selected space center not in map */
  useEffect(() => {
    if (!props.selectedSpaceCenter) return

    if (!isLocationInViewPort(props.selectedSpaceCenter))
      mapRef.current.flyTo({
        center: [props.selectedSpaceCenter.longitude, props.selectedSpaceCenter.latitude]
      })

  }, [props.selectedSpaceCenter])

  /* Shows pop up when selected */
  const selectMarker = (e, spaceCenter) => {
    e.preventDefault();
    props.selectSpaceCenter(spaceCenter)
  }

  /* Closes pop up */
  const closePopUp = (e) => {
    // if(e.target.options.latitude === props.selectedSpaceCenter.latitude 
    //   && e.target.options.longitude === props.selectedSpaceCenter.longitude) 
    props.selectSpaceCenter(null)
  }

  const mapViewChange = (e) => {
    const _spaceCentersInView = props.spaceCenters.filter(
      spaceCenter => isLocationInViewPort(spaceCenter)
    )
    setSpaceCentersInView(_spaceCentersInView)
    props.setVisibleSpaceCenters(_spaceCentersInView)
  }

  return (
    <Wrapper>
      <div className="map">
        {
          props.selectedSpaceCenter && <div className='shame'>{props.selectedSpaceCenter.name}</div>
        }
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
            spaceCentersInView && spaceCentersInView.length > 0 && spaceCentersInView.map((spaceCenter, index) => {
              return <Marker latitude={spaceCenter.latitude} longitude={spaceCenter.longitude} anchor="bottom" key={index}>
                <button className='marker-btn' onClick={(e) => selectMarker(e, spaceCenter)}>
                  {
                    (props.selectedSpaceCenter && props.selectedSpaceCenter.id === spaceCenter.id )
                    || (props.hoveredSpaceCenter && props.hoveredSpaceCenter.id === spaceCenter.id)
                      ? <img src={pointerIconSelected} alt="mark" />
                      : <img src={pointerIcon} alt="mark highlighted" />
                  }
                </button>
              </Marker>
            })
          }
          {
            props.selectedSpaceCenter &&
            <Popup
              latitude={props.selectedSpaceCenter.latitude}
              longitude={props.selectedSpaceCenter.longitude}
              onClose={closePopUp}
              anchor='bottom'
              closeButton={false}
            >
              <div className='marker-card'>
                <div className='details'>
                  {props.selectedSpaceCenter.description}
                </div>
                <div className='title'>
                  <h3>{props.selectedSpaceCenter.name}</h3>
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
}

export default Map;
