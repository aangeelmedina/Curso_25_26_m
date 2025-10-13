//--------------------------------- IMPORTACIONES -----------------------------------------------

import { dbTarea } from "./db/db";
import { addTarea, completarTarea, getTareas, saveTareas } from "./helpers/tareas";
const TEXT_KEY=import.meta.env.VITE_TEXT_KEY;



//--------------------------------- INICIO DE LA APLICACION ---------------------------------

saveTareas(dbTarea,"tareas");

completarTarea(1);

addTarea("Tarea 11");

getTareas("tareas");