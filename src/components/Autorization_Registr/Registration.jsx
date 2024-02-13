import { useState } from "react";
import {auth} from "../../firebase";
import style from "./Autorization_Registr.module.css"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
function Registration()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [Podpassword,setPodPassword]=useState("");
    const [Error,SetError]=useState("");
    const Regisrt=(event)=>
    {
        event.preventDefault();
        if(email=="" || password=="" || Podpassword=="")
        {
            SetError("Не все поля заполнены!");
            return;
        }
        else if(password!=Podpassword)
        {
            SetError("Пароли не совпадают!");
            return;
        }
        
       createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            console.log(user);
            setEmail("");
            setPassword("");
            SetError("");

        }).catch((error)=>
        {
            alert(error);
        })
    }

    return <div>
        <form className={style.Form2} onSubmit={Regisrt}>
            <h3>Регистрация</h3>
            <input className="col-6" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Введите Email" />
            <input className="col-6"  value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Введите пароль" />
            <input className="col-6"  value={Podpassword} onChange={(e)=>{setPodPassword(e.target.value)}} type="password" placeholder="Подтвердите пароль" />
            <button className="col-7">Зарегистрироваться</button>
            <p style={{color:"red", fontWeight:"bold"}}>{Error}</p>
        </form>
    </div>
}

export {Registration}