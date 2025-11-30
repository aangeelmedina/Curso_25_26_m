

export default function buscadorRickYmorty() {


    window.addEventListener("load", () => {
        const spinner = document.getElementById("spinner");
        const app = document.getElementById("app");

        setTimeout(() => {
            spinner.style.display = "none";
            app.style.display = "block";
        }, 3000); // 3 segundos
    });

    const buscar = (nombre,containerFormulario) => {
        // Limpiar resultados anteriores
        containerFormulario.innerHTML = "";
        containerFormulario.appendChild(rederFormulario());

         // Verificar caché
            const cache = getCache('rickymortyCache');
            if (cache.has(nombre)) {
                const cachedData = cache.get(nombre);
                const cards = renderCard(cachedData);
                containerFormulario.appendChild(cards);
            }else{
                fechingPersonajes(nombre).then(data => {
                if (data && data.results) {
                    const cards = renderCard(data.results);

                    cache.set(nombre, data.results);
                    setCache('rickymortyCache', cache);

                    containerFormulario.appendChild(cards);
                } else {
                    const errorMsg = document.createElement("p");
                    errorMsg.textContent = "No se encontraron resultados 😢";
                    errorMsg.className = "text-red-400 mt-6 text-center";
                    return errorMsg;
                }
            });
            }
    }

    const fechingPersonajes = (nombre) => {
        return fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const renderCard = (personajes) => {
        const containerCards = document.createElement("div");
        personajes.forEach(personaje => {
            const card = document.createElement("div");
            const nombre = document.createElement("h2");
            nombre.textContent = personaje.name;
            const imagen = document.createElement("img");
            imagen.src = personaje.image;
            imagen.alt = personaje.name;
            card.appendChild(imagen);
            card.appendChild(nombre);
            containerCards.appendChild(card);
        });
        return containerCards;
    }

    const debounce = (fn,delay) => {
        let timeoutID;
        
        return (...args) =>{
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => fn(...args), delay);
        }
    };

    const getCache = (key) => {
        const cache = localStorage.getItem(key);
        // en forma de Map
        return cache ? new Map(JSON.parse(cache)) : new Map();
    }

    const setCache = (key, value) => {
        localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
    }

    const rederFormulario = () =>{
        const containerFormulario = document.createElement("div");

        // Crear el formulario
        const form = document.createElement("form");
        // Crear input 
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = "Busca un personaje";

        // Crear botón
        const boton = document.createElement("button");
        boton.textContent = "🔍 Buscar";
        boton.type = "submit";

        // Añadir elementos al formulario
        form.appendChild(inputNombre);
        form.appendChild(document.createElement("br"));
        form.appendChild(document.createElement("br"));
        form.appendChild(boton);

        containerFormulario.appendChild(form);
        const buscarDebounced = debounce(buscar, 700);

        // Manejar el evento de envío del formulario
        form.addEventListener("input", function(event) {
            //event.preventDefault(); // Evita que recargue la página
            //limpiar resultados anteriores
            
            const nombre = inputNombre.value.trim();
            if (nombre) {
                buscarDebounced(nombre,containerFormulario);
            }
            
        });

        return containerFormulario;
    }

    const render = () => {
        const containerBuscador = document.createElement("div");
        containerBuscador.appendChild(rederFormulario());
        return containerBuscador;
    }

    return {
        render
    }

}
