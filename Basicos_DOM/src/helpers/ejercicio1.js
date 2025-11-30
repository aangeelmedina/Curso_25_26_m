
const PORT = import.meta.env.VITE_PORT
const VITE_URL = import.meta.env.VITE_URL
const URL_PORT = `${VITE_URL}:${PORT}`


export async function pintarEjercicio1() {
    try {
        const response = await fetch(`${URL_PORT}/bienvenida`);
        const data = await response.json();

        const containerEj1 = document.createElement("div");

        const ejercicio1Texto = document.createElement("p");
        ejercicio1Texto.classList.add("welcome-message");

        const app = document.getElementById("app");

        ejercicio1Texto.textContent = data.texto;

        containerEj1.appendChild(ejercicio1Texto);
        app.appendChild(containerEj1);

        return containerEj1;


    } catch (error) {
        console.error("Error:", error);
        return "Error al cargar el mensaje";
    }
}





