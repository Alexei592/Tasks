const default_center={
    lat:53.9,
    lng:27.5667
}

export const getBrowserLocation =() => {
    return new Promise((resolve,reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const {latitude: lat ,longitude: lng} = position.coords;
                resolve({lat,lng});
              },
              () => {
                reject(default_center);
              },
            );
          } else {
            reject(default_center);
          }
    })
   
  }
  