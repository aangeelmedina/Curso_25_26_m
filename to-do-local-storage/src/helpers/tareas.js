import { uid } from "uid";

const TEXT_KEY=import.meta.env.VITE_TEXT_KEY;


export const getTareas = (clave) => console.table(JSON.parse(localStorage.getItem(clave)));


export const saveTareas = (arrayTarreas) => {
    try {
        if(!Array.isArray(arrayTarreas)){
            throw new Error(Error);
        }
        localStorage.setItem(TEXT_KEY,JSON.stringify(arrayTarreas));
    } catch (error) {
        throw new Error("Error Parseando la data");
    }
}



export const addTarea = (nombreTarea) => {
    const limpio = String(nombreTarea ?? "").trim()
    try{
        const nuevaTarea = {
            id: uid(),
            nombre: limpio,
            fecha: new Date().toIsoString(),
            completada: false
        }
        localStorage.setItem(TEXT_KEY,JSON.stringify(nuevaTarea));
    }catch{

    }
}



export const completarTarea = (id) => {
    if (localStorage.hasOwnProperty("tareas")){
        const tareas = JSON.parse(localStorage.getItem("tareas")).map(tarea =>{
            if(tarea.id === id){
                tarea.completada = true;
            }
            return tarea
        });
        saveTareas(tareas);
    }
}

export const desCompletarTarea = (id) => {
    if (localStorage.hasOwnProperty("tareas")){
        const tareas = JSON.parse(localStorage.getItem("tareas")).map(tarea =>{
            if(tarea.id === id){
                tarea.completada = false;
            }
            return tarea
        });
        saveTareas(tareas);
    }
}

export const buscarCompletadas=()=>{
    try{

    const tareas = getTareas();
    return tareas.filter(tarea => tarea.completada === true);

    }catch(error){
        throw new Error("Error al buscar las tareas completadas ⛔");
    }

}

export const buscarnOCompletadas=()=>{
    try{

    const tareas = getTareas();
    return tareas.filter(tarea => tarea.completada === false);

    }catch(error){
        throw new Error("Error al buscar las tareas NO  completadas ⛔");
    }
}

export const buscarPorNombre=(nombre)=>{
    try{
        if(!nombre || typeof nombre !== "string") throw new Error("Error, el nombre debe ser un string válido");
        const tareas = getTareas();
        const formatoCorrectoNombre = nombre.trim().toLowerCase();
        return tareas.filter(tarea => tarea.nombre.toLowerCase().includes(formatoCorrectoNombre));
        
    }catch(error){
        throw new Error("Error al buscar las tareas por nombre ⛔");
    }
}

export const borrarTodasLasTareas=()=>{
    try {
        localStorage.removeItem(TEXT_KEY);
        console.info("Todas las tareas eliminadas correctamente ✅");
    } catch (error) {
        throw new Error ("Error al eliminar todas las tareas")
    }
}
