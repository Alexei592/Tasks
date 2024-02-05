import React from 'react'
import { GoogleMap } from '@react-google-maps/api';
import { useRef } from 'react';
import s from './Map.module.css'

const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
const defaultOptions={
    panControl:true,
    zoomControl:false,
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
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
            </GoogleMap>
    </div>
}

export {Map}