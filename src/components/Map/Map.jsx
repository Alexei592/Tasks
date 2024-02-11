import React from 'react'
import {CircleF, GoogleMap, MarkerF,DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
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


const Map = ({center,attraction,position_attractions,url})=>{
      
    
    const mapRef=useRef(undefined);
    const directionsServiceRef = useRef(null);
    const directionsRendererRef = useRef(null);
    const [point_otp,set_point]=useState(undefined);
    const [markers,setMarker]=useState([]);

    useEffect(() => {

      if (mapRef.current) {
  
        setMarker([]);
        
        const newMarkers = attraction.map((element, index) => {
          const position = position_attractions[index];
          const label = {
            text: element.tags.name,
            color: 'white',
            fontSize: '0.8vw',
            fontWeight: '500'
          };
          return <MarkerF
          key={index}
          position={position}
          label={label}
          onClick={(event) => {
            const markerPosition = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            set_point(markerPosition);
            console.log(markerPosition);
          }}
        />
        ;
        });
        setMarker(newMarkers);
      }
    }, [attraction, position_attractions]);
  
    const calculateDirections = () => {
      if(point_otp===undefined)
      {
        alert("пункт назначения не выбран");
        return;
      }
      const directionsService = directionsServiceRef.current;
      const directionsRenderer = directionsRendererRef.current;
  
      directionsService.route(
        {
          origin: center,
          destination: point_otp,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            console.error('Ошибка при получении маршрута:', status);
          }
        }
      );
    };
      
        const onLoad = React.useCallback(function callback(map) {
        mapRef.current=map;
        directionsServiceRef.current = new window.google.maps.DirectionsService();
        directionsRendererRef.current = new window.google.maps.DirectionsRenderer();
        }, [])

        const onUnmount = React.useCallback(function callback() {
            mapRef.current=undefined;
          }, [])

    return <div className={s.container}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
            <CircleF
            center={center}
            radius={2000}
            options={{ fillColor: "#000000", fillOpacity: 0.07, StrokeColor: "#FF0000", StrokeOpacity: 0.01, StrokeWeight:1, } } 
            ></CircleF>
            <MarkerF position={center} icon={{url:'/star.png'}} label={{text:'Вы'}}/>
           {markers}
           <DirectionsRenderer />
            </GoogleMap>
            <button style={{marginLeft:"32%", marginTop:"0.5vw"}} onClick={calculateDirections}>Построить маршрут</button>
    </div>
}

export {Map}