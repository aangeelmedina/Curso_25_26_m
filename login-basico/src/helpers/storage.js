import { ENV } from "../config/env"


// Crear funcion initialStorage que reciba una array de usuarios y los guarde en el localStorage

/**
 * @description Funcion que recibe un array de objetos y los inserta en el localStorage
 * @param {Object} array 
 */
export function initialStorage(array){
    localStorage.setItem(ENV.VITE_STORAGE_KEY, JSON.stringify(array));
    console.log("Usuarios metidos correctamente");
}

// Crea una funcion getStorage que se traiga todos los usuarios que esten almacenados en usuarios
/**
 * @description funcion que devuelve el array de usuarios del localStorage
 * @returns array de usuarios
 */
export const getStorage = () =>{
    return JSON.parse(localStorage.getItem(ENV.VITE_STORAGE_KEY));
} 

// funcion setUsuario()
/**
 * @description Funcion que añada un objeto usuario en el localStorage
 * @param {Object} ObjetoUser 
 */
export const setUsuario = (ObjetoUser) => {
    try{
        initialStorage([...getStorage(), ObjetoUser]);
        return true;
    } catch{
        return false;
    }
    
}
