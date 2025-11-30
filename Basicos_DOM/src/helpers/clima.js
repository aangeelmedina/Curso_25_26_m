import { getWeatherImage } from "../utils/getImg";

export default function clima() {
    let weatherContainer;
    let favouritesContainer;

    const getCache = () => {
        return JSON.parse(localStorage.getItem("cacheClima")) || {};
    };

    const setCache = (cache) => {
        localStorage.setItem("cacheClima", JSON.stringify(cache));
    };

    const saveToCache = (city, data) => {
        const cache = getCache();
        cache[city.toLowerCase()] = data;
        setCache(cache);
    };

    const getFromCache = (city) => {
        const cache = getCache();
        return cache[city.toLowerCase()] || null;
    };

    const feching = async (url) => {
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Error al obtener los datos haciendo fetch');
            }
            const finalData = await response.json();
            return finalData;
        }catch(error){
            console.log(error);
        }
    }

    const removeFromFavourites = (city) => {
        let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
        favs = favs.filter(c => c !== city);
        localStorage.setItem("favoritos", JSON.stringify(favs));
        favouriteCard();
    };

    const header = () => {
        const headerContainer = document.createElement('header');
        headerContainer.classList.add('header-container');
        
        const headerTitle = document.createElement('h1');
        headerTitle.classList.add('header-title');
        headerTitle.textContent = 'Weather API';
        
        const headerImg = document.createElement('img');
        headerImg.classList.add('header-logo');
        headerImg.src = "./public/img/logoApiWeather.png";
        headerImg.alt = "Logo Weather API";
        
        headerContainer.appendChild(headerTitle);
        headerContainer.appendChild(headerImg);
        return headerContainer;
    }

    const main = () =>{
        const containerMain = document.createElement("div");
        containerMain.classList.add('main-container');

        containerMain.appendChild(searchCard());
        
        weatherContainer = document.createElement("div");
        weatherContainer.classList.add('weather-container');
        containerMain.appendChild(weatherContainer);
        
        favouritesContainer = document.createElement("div");
        favouritesContainer.classList.add('favourites-container');
        containerMain.appendChild(favouritesContainer);
        
        favouriteCard();

        return containerMain;
    }

    const footer = () => {
        const footerContainer = document.createElement("footer");
        footerContainer.classList.add("footer-container");

        const footerText = document.createElement("p");
        footerText.classList.add("footer-text")
        footerText.textContent = "© 2025 Angel Weather App. Todos los derechos reservados.";

        footerContainer.appendChild(footerText);

        return footerContainer;
    }


    const searchCard = () =>{
        const card = document.createElement("div");
        card.classList.add('search-card');

        const tituloSearch = document.createElement("h3");
        tituloSearch.classList.add('search-title');
        tituloSearch.textContent="Buscar Ciudad"

        const formSearch = document.createElement("form");
        formSearch.classList.add('search-form');

        const inputNombre = document.createElement("input");
        inputNombre.classList.add('search-input');
        inputNombre.type = "text";
        inputNombre.placeholder = "Busca una ciudad";

        const boton = document.createElement("button");
        boton.classList.add('search-button');
        boton.textContent = "🔍 Buscar";
        boton.type = "submit";

        formSearch.appendChild(inputNombre);
        formSearch.appendChild(boton);

        card.appendChild(tituloSearch);
        card.appendChild(formSearch);

        formSearch.addEventListener("submit", async function(event) {
            event.preventDefault(); 

            const city = inputNombre.value.trim();

            const cached = getFromCache(city);
            if (cached) {
                console.log("♻️ Usando cache:", city);
                weatherCard(cached);
                return;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf200f80d91f3450bd37084f75e03603&units=metric&lang=es`;
            const data = await feching(url);

            if (data) {
                saveToCache(city, data);
                console.log("💾 Guardando en cache:", city);
                weatherCard(data);
            }
        });

        return card;
    }

    const weatherCard = (climaActual = {}) =>{
        const containerCard = document.createElement("div");
        containerCard.classList.add('weather-card');

        if (Object.keys(climaActual).length === 0) {
            console.log("El objeto está vacío");
            return containerCard;
        }
        
        console.log(climaActual);
        
        const tituloCiudad = document.createElement("h3");
        tituloCiudad.classList.add('weather-city-title');
        tituloCiudad.textContent=climaActual.name;

        const weatherImg = document.createElement('img');
        weatherImg.classList.add('weather-icon');
        weatherImg.src = getWeatherImage(climaActual);
        weatherImg.alt = "img tiempo";

        const temp = document.createElement("p");
        temp.classList.add('weather-info');
        temp.textContent = `🌡️ temperatura: ${climaActual.main.temp}`;

        const viento = document.createElement("p");
        viento.classList.add('weather-info');
        viento.textContent = `🌬️ viento: ${climaActual.wind.speed}`;

        const humedad = document.createElement("p");
        humedad.classList.add('weather-info');
        humedad.textContent = `💦 humedad: ${climaActual.main.humidity}`;

        containerCard.appendChild(tituloCiudad);
        containerCard.appendChild(weatherImg);
        containerCard.appendChild(temp);
        containerCard.appendChild(viento);
        containerCard.appendChild(humedad);

        containerCard.addEventListener("dblclick",function(event){
            event.preventDefault();
            
            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            // ✅ Comprobar si ya existe
            if(favoritos.includes(climaActual.name)) {
                alert(`${climaActual.name} ya está en favoritos`);
                return;
            }

            // Añadir el nuevo elemento
            favoritos.push(climaActual.name);

            // Guardar el array actualizado
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            favouriteCard();
        })

        weatherContainer.innerHTML = "";
        weatherContainer.appendChild(containerCard);
    }

    const favouriteCard = () =>{
        const containerFav = document.createElement("div");
        containerFav.classList.add('favourite-card');
        
        let favs = JSON.parse(localStorage.getItem("favoritos")) || [];
        containerFav.innerHTML=' ';

        const tituloFav = document.createElement("h3");
        tituloFav.classList.add('favourite-title');
        tituloFav.textContent="Ciudades Favoritas"

        containerFav.appendChild(tituloFav);

        const contenidoFav = document.createElement("div");
        contenidoFav.classList.add('favourite-content');

        if(favs.length>0){
            favs.forEach((ciudad) =>{
                const item = document.createElement('li');
                item.classList.add('favourite-item');
                item.textContent = `📍 ${ciudad}`;

                item.addEventListener('click', async () => {
                    console.log('🔍 Buscando favorito:', ciudad);
                    const cached = getFromCache(ciudad);
                    if (cached) {
                        console.log("♻️ Usando cache:", ciudad);
                        weatherCard(cached);
                        return;
                    }
                });

                item.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    if(confirm(`¿Eliminar ${ciudad} de favoritos?`)){
                        removeFromFavourites(ciudad);
                    }
                });

                contenidoFav.appendChild(item);
            })

            containerFav.appendChild(contenidoFav);
            
        } else {
            const emptyMsg = document.createElement('p');
            emptyMsg.classList.add('empty-favourites');
            emptyMsg.textContent = 'No hay ciudades favoritas';
            containerFav.appendChild(emptyMsg);
        }

        favouritesContainer.innerHTML = "";
        favouritesContainer.appendChild(containerFav);
    } 

    const render = () => {
        const containterClima = document.createElement("div");
        containterClima.classList.add('weather-app');
        containterClima.appendChild(header());
        containterClima.appendChild(main());
        containterClima.appendChild(footer())

        return containterClima;
    }

    return {
        render
    }
}