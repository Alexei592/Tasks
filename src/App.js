import { useEffect, useState } from 'react';
import {Map} from './components/Map';
import {useJsApiLoader} from '@react-google-maps/api';
import { getBrowserLocation } from './components/geolocation';
import { Buttons } from './components/button_filter/Buttons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Autorization } from './components/Autorization_Registr/Autorization';
import { Registration } from './components/Autorization_Registr/Registration';
const API_KEY_MAP=process.env.REACT_APP_API_KEY
const default_center = {
  lat:53.9,
  lng:27.5667
};

function App() {
  const[Aut_User,SetAut_User]=useState(null);
  const [center,SetCenter]=useState(default_center);
  const [attractions, set_attractions] = useState([]);
  const [position_attractions,set_position]=useState([]);

  const Exit_Account=()=>{
    signOut(auth).then(()=>
    {
      alert("Мы рады были вас видеть!");
    }).catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>
  {
      const listen_User=onAuthStateChanged(auth,(user)=>
      {
        if(user)
        {
          SetAut_User(user);
        }
        else
        {
          SetAut_User(null);
        }
      });
      return ()=>{
        listen_User();
      }
  },[]);

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
    {Aut_User ? (
      <>
        <div style={{position:"absolute", display:'flex',justifyContent:'space-evenly',flexDirection:"column",marginTop:"-1vw"}}>
        <span>Ваш аккаунт:</span>
        <h2>{Aut_User.email}</h2>
        <button onClick={()=>Exit_Account()}>Выйти из аккаунта</button>
        </div>
        {isLoaded ? (
          <>
            <Buttons
              set_attractions={set_attractions}
              set_position={set_position}
              center={center}
            />
            <Map
              attraction={attractions}
              position_attractions={position_attractions}
              center={center}
            />
          </>
        ) : (
          <h2>Что-то пошло не так</h2>
        )}
      </>
    ) : (
      <div style={{display:"flex", justifyContent:"space-evenly"}}>
      <Autorization />
      <Registration />
      </div>
    )}
  </div>)
}

export default App;
