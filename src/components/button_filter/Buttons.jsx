import mod from './Button.module.css'
const Buttons=({center,set_attractions,set_position})=>
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
      
      



    return <div className={mod.Buttons_Filters}>
        <button onClick={() => attraction_func('tourism=museum')}>Музеи</button>
        <button onClick={() => attraction_func('leisure=park')}>Парки</button>
        <button onClick={() => attraction_func('amenity=restaurant')}>Рестораны</button>
        <button onClick={() => attraction_func('amenity=cinema')}>Кинотеатры</button>

    </div>
}

export {Buttons}
