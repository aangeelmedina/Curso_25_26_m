//import buscadorRickYmorty from "./helpers/buscadorRickYmorty";
import clima from "./helpers/clima";
import { pintarEjercicio1 } from "./helpers/ejercicio1";
import { crearEjercicio2, ejercicio2SinFeching } from "./helpers/ejercicio2";
import ejercicio3 from "./helpers/ejercicio3";
import ejercicio4 from "./helpers/ejercicio4";
import ejercicio4v2 from "./helpers/ejercicio4v2";
import ejercicio5 from "./helpers/ejercicio5";


export default async function createApp() {
    //pintarEjercicio1();
    //crearEjercicio2();
    //ejercicio2SinFeching();
    //ejercicio3();
    //ejercicio4();
    //ejercicio5();

    const app = document.getElementById("app");
    app.appendChild(clima().render());
} 