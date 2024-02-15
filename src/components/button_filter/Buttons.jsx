import mod from './Button.module.css'
const Buttons=({center,set_attractions,set_position,attractions})=>
{

    const attraction_func = async (name_attr) => {
        try {
          const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node(around:1000,${center.lat},${center.lng})[${name_attr}];out;`);
          const data = await response.json();
          console.log(data.elements);
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
        }
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(attraction)}&format=json&limit=${attraction.length}`);
        const data = await response.json();

          console.log(data);
          if (data.length === 0) {
            alert('Мы не смогли найти ваши избранные достопримечательности, приносим своё прощение!');
            return
          }
          set_attractions(data);
          const attractions_lat_lon = data.map(element => {
            return {
              lat: parseFloat(element.lat),
              lng: parseFloat(element.lon),
            };
          });
          set_position(attractions_lat_lon);
      }
      
      



    return <div className={`${mod.Buttons_Filters} col-7`}>
        <button className='col-2' onClick={() => attraction_func('tourism=museum')}>Музеи</button>
        <button className='col-2' onClick={() => attraction_func('leisure=park')}>Парки</button>
        <button className='col-2' onClick={() => attraction_func('amenity=restaurant')}>Рестораны</button>
        <button className='col-2' onClick={() => attraction_func('amenity=cinema')}>Кинотеатры</button>
        <button className='col-3' onClick={()=>selected_attractions(attractions)}>Выбранные достопримечательности</button>

    </div>
}

export {Buttons}
