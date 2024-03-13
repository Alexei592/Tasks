import React from 'react'
import {CircleF, GoogleMap, MarkerF,DirectionsRenderer} from '@react-google-maps/api';
import { useRef,useState,useEffect } from 'react';
import s from './Map.module.css'
import {Information_Marker} from './Information_Marker/Information_Marker'

const containerStyle = {
    width: '100%',
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


const Map = ({center,attraction,position_attractions,all_attraction,set_all_attraction})=>{
      
    
    const mapRef=useRef(undefined);
    const [directions, setDirections] = useState(null);
    const [point_otp,set_point]=useState(undefined);
    const [markers,setMarker]=useState([]);
    const [name_use_attraction,set_name]=useState([null,false]);

    useEffect(() => {

      if (mapRef.current) {
  
        setMarker([]);
        
        const newMarkers = attraction.map((element, index) => {
          const position = position_attractions[index];
          const name = element.tags?.name ? element.tags.name : element.name;
          const label = {
            text: name,
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '500'
          };
          return <MarkerF
          key={`${name}-${index}`}
          position={position}
          label={label}
          onClick={(event) => {
            const markerPosition = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            set_point(markerPosition);
            set_name([label.text,true,markerPosition]);
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
      const currentLocation =center;
      const destination = point_otp;

  fetch(`https://www.mapquestapi.com/directions/v2/route?key=YOUR_API_KEY&from=${currentLocation}&to=${destination}`)
    .then(response => response.json())
    .then(data => {
   
      setDirections(data.directions);
    })
    .catch(error => {
      console.error('Ошибка при получении маршрута:', error);
    });
    };
      
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
           {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
            {name_use_attraction[1] ? (<Information_Marker set_all_attraction={set_all_attraction} set_name={set_name} all_attraction={all_attraction} markerPosition={name_use_attraction[2]} name_attr={name_use_attraction[0]}/>) : (<></>)}
            
    </div>
}

export {Map}