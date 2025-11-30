import feching from "../utils/feching";

const PORT = import.meta.env.VITE_PORT
const VITE_URL = import.meta.env.VITE_URL
const URL_PORT = `${VITE_URL}:${PORT}`


export default function ejercicio4() {
    try {
        const data = feching("alojamientos");
        console.log(data);

        const containerEj4 = document.createElement("div")

        const divTitulo = document.createElement("div");
        const textoTitulo = document.createElement("h1");
        textoTitulo.textContent="🏠 Alojamientos";

        divTitulo.appendChild(textoTitulo);

        containerEj4.appendChild(divTitulo);

        const containerTabla = document.createElement("div");
        containerTabla.className = "table-container";

        const tabla = document.createElement("table");


        const thead = document.createElement("thead");
        const filaHead = document.createElement("tr");

        const thNombre = document.createElement("th");
        thNombre.textContent = "Nombre";

        const thUbicacion = document.createElement("th");
        thUbicacion.textContent = "Ubicación";

        const thPrecio = document.createElement("th");
        thPrecio.textContent = "Precio";

        const thRating = document.createElement("th");
        thRating.textContent = "Rating";

        filaHead.appendChild(thNombre);
        filaHead.appendChild(thUbicacion);
        filaHead.appendChild(thPrecio);
        filaHead.appendChild(thRating);

        thead.appendChild(filaHead);
        tabla.appendChild(thead);
        
        const tbody = document.createElement("tbody");

        data.forEach(alojamiento => {
            const fila = document.createElement("tr");

            const alojamientoNombre = document.createElement("td");
            alojamientoNombre.textContent = alojamiento.nombre;

            const alojamientoUbicacion = document.createElement("td");
            alojamientoUbicacion.textContent = alojamiento.ubicacion;

            const alojamientoPrecio = document.createElement("td");
            alojamientoPrecio.className = "price"
            alojamientoPrecio.textContent = alojamiento.precio;

            const alojamientoRating = document.createElement("td");
            alojamientoRating.textContent="rating"
            alojamientoRating.textContent = alojamiento.rating < 2 ? "⭐" :  alojamiento.rating < 3 ? "⭐⭐" :  alojamiento.rating < 4 ? "⭐⭐⭐" :  alojamiento.rating < 5 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐";

            fila.appendChild(alojamientoNombre);
            fila.appendChild(alojamientoUbicacion);
            fila.appendChild(alojamientoPrecio);
            fila.appendChild(alojamientoRating);

            tbody.appendChild(fila);

        });
        tabla.appendChild(tbody);
        containerTabla.appendChild(tabla);
        containerEj4.appendChild(containerTabla);   

        const app = document.getElementById("app");

        app.appendChild(containerEj4);

        return containerEj4;

    } catch (error) {
        console.log(error);
    }
}
