import s from './Information_Marker.module.css'
import { useState } from 'react';
import { Add_AttractionYou,Remove_AttractionYou } from '../../../functionFirebase.js';
function Information_Marker({name_attr,all_attraction,set_all_attraction,set_name,markerPosition})
{
    let proverka = false;
    const index = all_attraction.findIndex(attr => attr.name === name_attr);
    if (index != -1) {
    proverka = true;
    } else {
    proverka = false;
    }
   

    return <div className={`col-6 m-1 ${s.container}`}>
        <img className='col-12' src="attraction.jpg" alt="photo_attraction" />
        <h1 className='display-6'>{name_attr}</h1>
        <div className={s.izb}>
            {
                proverka ? (<span onClick={()=>Remove_AttractionYou([name_attr,markerPosition],set_all_attraction)}>Удалить из избранных</span>) 
                : (<span onClick={()=>Add_AttractionYou([name_attr,markerPosition],set_all_attraction)}>Добавить в избранное</span>)
            }
            
            <img className='col-2 col-md-1' src="starr.png" alt="" />
            <button className={`${s.butt} col-4`} onClick={()=>{set_name("",false,undefined)}}>Закрыть</button>
        </div>
    </div>
}

export {Information_Marker}