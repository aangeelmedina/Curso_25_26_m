import { tareas } from "../db/data";

const PORT = import.meta.env.VITE_PORT
const VITE_URL = import.meta.env.VITE_URL
const URL_PORT = `${VITE_URL}:${PORT}`


export async function crearEjercicio2(){
    try {
        const response = await fetch(`${URL_PORT}/tareas`);
        const data = await response.json();

        const containerEj2 = document.createElement("div");

        const ejercicio2Lista = document.createElement("ul");

        data.forEach(tarea => {
            const elementoLista = document.createElement("li")
            elementoLista.textContent = tarea.completada ? `✅ ${tarea.texto}` : `❌ ${tarea.texto}`
            elementoLista.classList.add("task-item");
            ejercicio2Lista.appendChild(elementoLista);
        });

        containerEj2.appendChild(ejercicio2Lista);

        const app = document.getElementById("app");

        app.appendChild(containerEj2);

        return containerEj2;

    } catch (error) {
        console.error("Error:", error);
        return "Error al cargar el mensaje";
    }
        
}

export function ejercicio2SinFeching(){
    
    const containerEj2 = document.createElement("div");

    const ejercicio2Lista = document.createElement("ul");

    tareas.forEach(tarea => {
        const elementoLista = document.createElement("li")
        elementoLista.textContent = tarea.completada ? `✅ ${tarea.texto}` : `❌ ${tarea.texto}`
        elementoLista.classList.add("task-item");
        ejercicio2Lista.appendChild(elementoLista);
    });

    containerEj2.appendChild(ejercicio2Lista);

    const app = document.getElementById("app");

    app.appendChild(containerEj2);

    return containerEj2;
}

