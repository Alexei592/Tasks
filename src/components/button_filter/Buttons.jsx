import mod from './Button.module.css'
import s from '../../font-size.module.css'
const Buttons=({center,set_attractions,set_position,attractions})=>
{

    const attraction_func = async (name_attr) => {
        try {
          const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:1000,${center.lat},${center.lng})[${name_attr}];out;`);
          const data = await response.json();
          console.log(data.elements);
          set_attractions([]);
          set_position([]);
          set_attractions(data.elements);
          const attractions_lat_lon = data.elements.map(element => {
            return {
              lat: element.lat,
              lng: element.lon
            };
          });
          set_position(attractions_lat_lon);
          if (data.elements.length === 0) {
            alert('Данных мест поблизости нету');
          }
        } catch (error) {
          console.log(error);
        }
      };

      const selected_attractions=async (attraction)=>{
        if(attraction.length==0)
        {
          alert('Вы еще не добавляли места в избранные');
          return;
        }
          set_attractions(attraction);
          const attractions_lat_lon = attraction.map(element => {
            return {
              lat: parseFloat(element.position.lat),
              lng: parseFloat(element.position.lng),
            };
          });
          set_position(attractions_lat_lon);
      }
      
      



    return <div className={`${mod.Buttons_Filters} col-12 d-flex flex-wrap justify-content-center`}>
        <button className={`col-5 m-2 ${s.acc} p-1`} onClick={() => attraction_func('tourism=museum')}>Музеи</button>
        <button className={`col-5 m-2 ${s.acc} p-1`} onClick={() => attraction_func('leisure=park')}>Парки</button>
        <button className={`col-5 m-2 ${s.acc} p-1`} onClick={() => attraction_func('amenity=restaurant')}>Рестораны</button>
        <button className={`col-5 m-2 ${s.acc} p-1`} onClick={() => attraction_func('amenity=cinema')}>Кинотеатры</button>
        <button className={`col-8 m-2 ${s.acc} p-1`} onClick={()=>selected_attractions(attractions)}>Выбранные достопримечательности</button>

    </div>
}

export {Buttons}
