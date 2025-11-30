//Crear una funcion utilizando promise y otra async await que se traiga de   el title
// y la imagen
const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

// usando Promise

export function dataJSONPromise(){
    fetch(VITE_API_URL)
        .then((respuesta) => respuesta.json())
        .then((data) =>{
            console.log(`data obtenida de ${VITE_API_URL}`)
            console.log(data)
            console.log(data[0].title)
            console.log(data[0].url)
        })   
    .catch(error => console.error(error))
    .finally(mensaje => console.log(`cerrando JSONPromise`));
}


// con async

export async function dataJSONasync(){
    try {
        // Llama a la API usando fetch y espera a que la respuesta llegue
        const response = await fetch(VITE_API_URL);

        // Convierte la respuesta en formato JSON y espera a que termine
        const data = await response.json();

        // Desestructura el primer elemento del array para obtener el título y la URL de la imagen
        const { title, url } = data[0];
        console.log("Usando async");
        // Muestra en consola el título obtenido
        console.log("Título:", title);

        // Muestra en consola la URL de la imagen obtenida
        console.log("Imagen:", url);

    } catch (error) {
        // Captura cualquier error que ocurra durante la llamada a la API o al convertir JSON
        console.error("Error:", error);
    }
}

// crear una funcion que se le pase como parametro una ciudad y que devuelva la temperatura y humedad y viento
const city = 'London'
export function getWeather(){
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_API_KEY}`
    return fetch(URL)
        .then((respuesta) =>{
            if(!respuesta.ok){
                throw new Error('error respuesta');
            }
            return respuesta.json();
        })
        .then((data) => {
            const { temp,humidity } = data.main;
            const { speed } = data.wind;
            const { main } = data.weather[0]
            console.log(data)
            console.log(`temp: ${temp} \nhumedad: ${humidity} \nviento: ${speed} \nTiempo: 🌧️ ${main}`);
            return data;
        })
    .catch((error) => console.log(error))
    .finally(() => console.log('cerrando getWeather API'))
}