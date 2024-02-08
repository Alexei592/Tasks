import { useEffect, useState } from 'react';
import {Map} from './components/Map';
import {useJsApiLoader} from '@react-google-maps/api';
import { getBrowserLocation } from './components/geolocation';
import { Buttons } from './components/button_filter/Buttons';
const API_KEY_MAP=process.env.REACT_APP_API_KEY
const default_center = {
  lat:53.9,
  lng:27.5667
};

function App() {

  const [center,SetCenter]=useState(default_center)
  const [attractions, set_attractions] = useState([]);
  const [position_attractions,set_position]=useState([]);

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
    {isLoaded ?(
      <>
    <Buttons set_attractions={set_attractions} set_position={set_position}  center={center}/>
    <Map attraction={attractions} position_attractions={position_attractions} center={center}/></>)
   : <h2>Что-то пошло не так</h2>}
    </div>)
}

export default App;
