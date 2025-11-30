/**

Lógica principal de la aplicación
Este archivo puede contener la inicialización y configuración global*/

import { dataJSONPromise,dataJSONasync,getWeather } from "./helpers/ejercicio-01";



// Función de inicialización
export function initializeApp() {
    getWeather();
}