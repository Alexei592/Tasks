import React from 'react'
import {CircleF, GoogleMap, MarkerF} from '@react-google-maps/api';
import { useRef,useState,useEffect } from 'react';
import s from './Map.module.css'

const containerStyle = {
    width: '80%',
    height: '100%'
  };
  
const defaultOptions={
    panControl:true,
    zoomControl:true,
    mapTypeControl:false,
    scaleControl:false,
    streetViewControl:false,
    rotateControl:false,
    clickableIcons:false,
    keyboardShortcuts:false,
    scrollwheel:false,
    disableDoubleClickZoom:false,
    fullscreenControl:false
}


const Map = ({center})=>{
      

    const mapRef=useRef(undefined);
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
      if (mapRef.current) {
        const service = new window.google.maps.places.PlacesService(mapRef.current);
  
        service.nearbySearch(
          {
            location: center,
            radius: 1000,
            type: 'museum',
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              console.log("Зашло");
              setMuseums(results);
            }
            else
            {
              console.log(window.google.maps.places.PlacesServiceStatus);
              console.log(status);
            }
          }
        );
      }
    }, [center]);

      
        const onLoad = React.useCallback(function callback(map) {
        mapRef.current=map;
        }, [])

        const onUnmount = React.useCallback(function callback() {
            mapRef.current=undefined;
          }, [])

    return <div className={s.container}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14.8}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
            <CircleF
            center={center}
            radius={1000}
            options={{ fillColor: "#000000", fillOpacity: 0.07, StrokeColor: "#FF0000", StrokeOpacity: 0.01, StrokeWeight:1, } } 
            ></CircleF>
            <MarkerF position={center} icon={{url:'/star.png'}} label={{text:'Вы'}}/>
            </GoogleMap>
    </div>
}

export {Map}