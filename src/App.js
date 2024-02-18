import { useEffect, useState } from 'react';
import {Map} from './components/Map';
import {useJsApiLoader} from '@react-google-maps/api';
import { getBrowserLocation } from './components/geolocation';
import { Buttons } from './components/button_filter/Buttons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Autorization } from './components/Autorization_Registr/Autorization';
import { Registration } from './components/Autorization_Registr/Registration';
import { All_Information_Attraction,getUsersByMail} from "./functionFirebase";
import { getFirestore } from "firebase/firestore";
import s from "./font-size.module.css"
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
  const [all_attraction,set_all_attraction]=useState([]);
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

  const attract=async ()=>
  {
    const db=getFirestore();
    const User=auth.currentUser;
    const userId=await getUsersByMail(User.email,db);
    All_Information_Attraction(userId,set_all_attraction);
  }

  useEffect(()=>
  {
    if(auth.currentUser)
    {
      attract();
    }
  },[auth.currentUser])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY_MAP,
  })

  return (
    <div className="">
    {Aut_User ? (
      <>
        <div className='col-10 d-flex flex-column align-items-start'>
          <div className='d-flex flex-row align-items-center'>
          <span className={` ${s.acc} col-4`}>Ваш аккаунт:</span>
          <span className='fst-italic col-6'>{Aut_User.email}</span>
          </div>
          <button style={{backgroundColor:"bisque", color:"#442014"}} className="col-10 rounded border-0 " onClick={()=>Exit_Account()}>Выйти из аккаунта</button>
        </div>
        {isLoaded ? (
          <>
            <Buttons
              set_attractions={set_attractions}
              set_position={set_position}
              center={center}
              attractions={all_attraction}
            />
            <Map
              set_all_attraction={set_all_attraction}
              all_attraction={all_attraction}
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
      <div className='d-flex justify-content-center flex-column flex-lg-row'>
      <Autorization/>
      <Registration />
      </div>
    )}
  </div>)
}

export default App;
