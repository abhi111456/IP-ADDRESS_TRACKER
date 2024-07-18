import React from "react";
import { useEffect,useMemo } from "react";
import { Marker, Popup ,useMap} from "react-leaflet";
import icon from './icon'
export default function MarkerPosition({Address}){
    const position=useMemo(()=>{
        return [Address.location.lat,Address.location.lng]
    },[Address.location.lat,Address.location.lng])
    const map=useMap()

    useEffect(()=>{
      map.flyTo(position,13,{
        animate:true
      })
    },[map,position])
    return(
        <>
            <Marker icon={icon} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </>
    )
}