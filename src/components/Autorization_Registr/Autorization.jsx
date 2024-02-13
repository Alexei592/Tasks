import { useState } from "react";
import {auth} from "../../firebase";
import style from "./Autorization_Registr.module.css"
import { signInWithEmailAndPassword } from "firebase/auth";
function Autorization()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const Autoriz=(event)=>
    {
        event.preventDefault();
        signInWithEmailAndPassword(auth,email,password).then((user)=>{
            console.log(user);
            setEmail("");
            setPassword("");

        }).catch((error)=>
        {
            alert(error);
        })
    }

    return <div>
        <form className={style.Form} onSubmit={Autoriz}>
            <h3>Авторизация</h3>
            <input className="col-6" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Введите Email" />
            <input className="col-6"  value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Введите пароль" />
            <button className="col-7">Авторизоваться</button>
        </form>
    </div>
}

export {Autorization}