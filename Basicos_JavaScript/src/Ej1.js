//---------- Declarar Variables -----------


//---------- Declarar Funciones------------

/*
Descripcion: Funcion que suma dos numero
Parametros:
    - a : numero 1
    - b : numero 2
Retorno: Te da la suma de a y b
*/

/**
 * Descripcion: Funcion que suma dos numero
 * @param {number} [a=0] - Primer numero a sumar
 * @param {number} [b=0] - Segundo numero a sumar
 * @returns {number} - Resultado de las sumas
 */
function suma(a,b){
    return a+b;
}


function saludar(nombre){
    return `bienvenido ${nombre ?? "Usuario"}`;
}



const aprobados = (nota=0) =>  "tienes un: "+(nota>=9 ? "sobresaliente" : nota>=5 ? "aprobado" :  "suspenso");


//-------- Inicializar aplicacion ---------

console.log(suma(2,2));

console.log(saludar("angel"))

console.log(aprobados(5));