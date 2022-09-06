import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { GET_SPACESTATION } from '../../graplql/queries';
import Flights from './Flights';

const Item = (props) => {
    const itemRef = useRef(null)
    const [spaceCenterId, setSpaceCenterId] = useState()
    const [planetName, setPlanetName] = useState()
    const { loading, error, data } = useQuery(GET_SPACESTATION, {
        variables: {
            uid: props.spaceCenter.uid
        },
    })

    useEffect(() => {
        if (!data) return
        setSpaceCenterId(data.spaceCenter.id)
        setPlanetName(data.spaceCenter.planet.name)
    }, [data])

    useEffect(() => {
        if (props.spaceCenter && props.selectedSpaceCenter && props.selectedSpaceCenter.uid === props.spaceCenter.uid) {
            // itemRef.current.scrollIntoView({ block: "nearest", inline: "center",  behavior: "smooth", alignToTop: false // })
            itemRef.current.parentNode.scrollTop = itemRef.current.offsetTop - 20
        }
    }, [props.selectedSpaceCenter, props.spaceCenter])

    return (
        <div className={`item ${props.spaceCenter && props.selectedSpaceCenter && props.selectedSpaceCenter.uid === props.spaceCenter.uid && "focus"}`}
            ref={itemRef}
            onMouseOver={() => props.hoverSpaceCenter(props.spaceCenter)}
            onMouseOut={() => props.hoverSpaceCenter(null)}
        >
            <header>
                <div className='title'>
                    {loading && <div>Loading flights...</div>}
                    {error && <div>Unknown error occured...</div>}
                    <h4 className="center">{props.spaceCenter.name}</h4>
                    <span className="location">{planetName || props.spaceCenter.planet_code}</span>
                </div>
                <span className="icon"></span>
            </header>
            <div className='details'>
                {spaceCenterId && <Flights date={props.date} time={props.time} from={spaceCenterId} spaceCenter={props.spaceCenter}/>}
            </div>
            <footer>
                <button>SEE ALL FLIGHTS</button>
            </footer>
        </div>
    );
}

export default Item;
