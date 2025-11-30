const PORT = import.meta.env.VITE_PORT
const VITE_URL = import.meta.env.VITE_URL
const URL_PORT = `${VITE_URL}:${PORT}`

export default async function ejercicio3() {
    try {
        const response = await fetch(`${URL_PORT}/peliculas`);
        const data = await response.json();
        console.log(data);

        const containerEj3 = document.createElement("div")

        const tituloDiv = document.createElement("div");
        const tituloTexto = document.createElement("h1");
        tituloTexto.textContent="🎬 Películas"

        tituloDiv.appendChild(tituloTexto);
        containerEj3.appendChild(tituloDiv);

        const divContenido = document.createElement("div");
        divContenido.className = "movies-container";


        data.forEach(pelicula => {
            const tarjeta = document.createElement("div")
            tarjeta.className =  "movie-card"

            const imagenPeli = document.createElement("img");
            imagenPeli.className = "movie-image";
            imagenPeli.src = pelicula.imagen;
            imagenPeli.alt = `Imagen de la película ${pelicula.titulo}`;

            const tituloPeli = document.createElement("p");
            tituloPeli.className = "movie-title";
            tituloPeli.textContent = pelicula.titulo;

            const añoPeli = document.createElement("p");
            añoPeli.className = "movie-year";
            añoPeli.textContent= pelicula.año

            const rating = document.createElement("p");
            rating.className = "movie-rating";
            rating.innerHTML = `
                ${pelicula.rating < 2 ? "" : Math.floor(pelicula.rating) < 4 ? "⭐" : Math.floor(pelicula.rating) < 6 ? "⭐⭐" : Math.floor(pelicula.rating) < 8 ?" ⭐⭐⭐" : Math.floor(pelicula.rating) < 9 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐" } <br>
                ${pelicula.rating}/10
            `;
            
            tarjeta.appendChild(imagenPeli);
            tarjeta.appendChild(tituloPeli)
            tarjeta.appendChild(añoPeli)
            tarjeta.appendChild(rating)

            divContenido.appendChild(tarjeta);

        });
        containerEj3.appendChild(divContenido);

        const app = document.getElementById("app")
        app.appendChild(containerEj3);

        return containerEj3;

    } catch (error) {
        
    }
}
