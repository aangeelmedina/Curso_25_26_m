import { alojamientos } from "../db/data";
import feching from "../utils/feching";

const PORT = import.meta.env.VITE_PORT
const VITE_URL = import.meta.env.VITE_URL
const URL_PORT = `${VITE_URL}:${PORT}`

export default function ejercicio4v2() {
    const notfeching = async () => await feching("alojamientos");


    const renderTable = (data) => {
        const containerTabla = document.createElement("div");
        containerTabla.classList.add("table-container");
        const tabla = document.createElement("table");
        // thead
        const thead = document.createElement("thead");
        const filaHead = document.createElement("tr");
        ["Nombre", "Ubicación", "Precio", "Rating"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            filaHead.appendChild(th);
        });
        thead.appendChild(filaHead);
        tabla.appendChild(thead);

        // tbody
        const tbody = document.createElement("tbody");
        data.forEach(alojamiento => {
            const fila = document.createElement("tr");

            //nombre
            const alojamientoNombre = document.createElement("td");
            alojamientoNombre.textContent = alojamiento.nombre;
            fila.appendChild(alojamientoNombre);

            //ubicacion
            const alojamientoUbicacion = document.createElement("td");
            alojamientoUbicacion.textContent = alojamiento.ubicacion;
            fila.appendChild(alojamientoUbicacion);

            //precio
            const alojamientoPrecio = document.createElement("td");
            alojamientoPrecio.textContent = `${alojamiento.precio} €`;
            alojamientoPrecio.classList.add("price");  
            fila.appendChild(alojamientoPrecio);

            //rating
            const alojamientoRating = document.createElement("td");
            alojamientoRating.classList.add("rating");
            alojamientoRating.textContent = "⭐".repeat(Math.floor(alojamiento.rating));
            fila.appendChild(alojamientoRating);

            tbody.appendChild(fila);
        })
        tabla.appendChild(tbody);
        containerTabla.appendChild(tabla);
        return containerTabla;
    }

    const render = async () => {
        const containerEj4 = document.createElement("div");

        const divTitulo = document.createElement("div");
        const textoTitulo = document.createElement("h1");
        textoTitulo.textContent="🏠 Alojamientos";

        divTitulo.appendChild(textoTitulo);

        containerEj4.appendChild(divTitulo);
        const data = await notfeching();

        containerEj4.appendChild(renderTable(data));
        return containerEj4;
    };

    return{
        render
    }
}
