import React, { useEffect, useRef, useState } from 'react'
import Wrapper from './map.style'
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import { DEFAULT_MAPBOX_CONFIG, MAPBOX_MIN_ZOOM } from '../../utilities/constants'
import pointerIcon from '../../assets/icons/Pointer@2x.svg'
import pointerIconSelected from '../../assets/icons/Pointer_selected@2x.svg'
import 'mapbox-gl/dist/mapbox-gl.css'

// Problems:
// 1) Pop up switch on marker change
// 2) Shame html

const Map = (props) => {
  const mapRef = useRef(null)
  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    if (!props.spaceCenters) return
    console.log(props.spaceCenters)
  }, [props.spaceCenters])

  /* Fly to location if selected space center not in map */
  useEffect(() => {
    if (!props.selectedSpaceCenter) return

    mapRef.current.flyTo({
      center: [props.selectedSpaceCenter._geoloc.lng, props.selectedSpaceCenter._geoloc.lat]
    })
    setShowPopUp(true)

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
    setShowPopUp(false)
    props.selectSpaceCenter(null)
  }

  const mapViewChange = (e) => {
    props.setMapBoundaries(mapRef.current.getBounds())
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
            props.spaceCenters && props.spaceCenters.length > 0 && props.spaceCenters.map((spaceCenter, index) => {
              return <Marker anchor="bottom" key={index}
                latitude={spaceCenter._geoloc.lat}
                longitude={spaceCenter._geoloc.lng}
              >
                <button className='marker-btn' onClick={(e) => selectMarker(e, spaceCenter)}>
                  {
                    (props.selectedSpaceCenter && props.selectedSpaceCenter.uid === spaceCenter.uid)
                      || (props.hoveredSpaceCenter && props.hoveredSpaceCenter.uid === spaceCenter.uid)
                      ? <img src={pointerIconSelected} alt="mark" />
                      : <img src={pointerIcon} alt="mark highlighted" />
                  }
                </button>
              </Marker>
            })
          }
          {
            props.selectedSpaceCenter &&
            showPopUp &&
            <Popup
              latitude={props.selectedSpaceCenter._geoloc.lat}
              longitude={props.selectedSpaceCenter._geoloc.lng}
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
