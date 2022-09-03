import React from 'react'
import Wrapper from './map.style'
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import pointerIcon from '../../assets/icons/Pointer@2x.svg'
import pointerIconSelected from '../../assets/icons/Pointer_selected@2x.svg'
import { DEFAULT_MAPBOX_CONFIG } from '../../utilities/constants'

const Map = (props) => {
  /* Shows pop up when selected */
  const handleSelectMarker = (e, spaceCenter) => {
    e.preventDefault();
    props.selectSpaceCenter(spaceCenter)
  }

  /* Closes pop up */
  const closePopUp = () => {
    props.selectSpaceCenter(null)
  }

  const mapViewChange = (e) => {
    // console.log(e.target.transform.maxLat + ", " + e.target.transform.maxLng );
    // console.log(e.target.transform.minLat + ", " + e.target.transform.minLng );
    // console.log(e)
  }

  return (
    <Wrapper>
      <div className="map">
        {
          props.selectedSpaceCenter && <div className='shame'>{props.selectedSpaceCenter.name}</div>
        }
        <ReactMapGL
          initialViewState={DEFAULT_MAPBOX_CONFIG.viewState}
          style={DEFAULT_MAPBOX_CONFIG.style}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
          onLoad={mapViewChange}
          onDragEnd={mapViewChange}
          onZoomEnd={mapViewChange}
          onResize={mapViewChange}
        >
          {
            props.spaceCenters && props.spaceCenters.length > 0 && props.spaceCenters.map((spaceCenter, index) => {
              return <Marker latitude={spaceCenter.latitude} longitude={spaceCenter.longitude} anchor="bottom" key={index}>
                <button className='marker-btn' onClick={(e) => handleSelectMarker(e, spaceCenter)}>
                  {
                    props.selectedSpaceCenter && props.selectedSpaceCenter.id === spaceCenter.id
                      ? <img src={pointerIconSelected} alt="mark" />
                      : <img src={pointerIcon} alt="mark selected" />
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
          <NavigationControl/>
          <FullscreenControl />
        </ReactMapGL>
      </div>
    </Wrapper>
  );
}

export default Map;
