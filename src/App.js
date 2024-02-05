import { useEffect, useState } from 'react';
import {Map} from './components/Map';
import {useJsApiLoader} from '@react-google-maps/api';
import { getBrowserLocation } from './components/geolocation';
const API_KEY_MAP=process.env.REACT_APP_API_KEY
const default_center = {
  lat:53.9,
  lng:27.5667
};

function App() {

  const [center,SetCenter]=useState(default_center)

  useEffect(()=>{getBrowserLocation().then((curlLock)=>{
    SetCenter(curlLock)
  }).catch((default_center)=>
  {
    SetCenter(default_center)
  })}
  ,[])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY_MAP,
  })

  return (
    <div className="">
    {isLoaded ?
    <Map center={center}/>
   : <h2>Problems</h2>}
    </div>)
}

export default App;
