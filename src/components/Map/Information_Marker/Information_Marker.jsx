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
   

    return <div className={`col-4 ${s.container}`}>
        <img className='col-11' src="attraction.jpg" alt="photo_attraction" />
        <h2>{name_attr}</h2>
        <div className={s.izb}>
            {
                proverka ? (<span onClick={()=>Remove_AttractionYou([name_attr,markerPosition],set_all_attraction)}>Удалить из избранных</span>) 
                : (<span onClick={()=>Add_AttractionYou([name_attr,markerPosition],set_all_attraction)}>Добавить в избранное</span>)
            }
            
            <img className='col-1' src="starr.png" alt="" />
            <button className={`${s.butt} col-2`} onClick={()=>{set_name("",false,undefined)}}>Закрыть</button>
        </div>
    </div>
}

export {Information_Marker}