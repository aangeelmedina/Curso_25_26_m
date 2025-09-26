// usos de los arrays 

const edades =[];

// usando constructor

const cp = new Array();
const cc = new Array("afgiyafg","iwhfowugf7gwf","fhuagfuiagf");

// acceder a un array

cc[0];

// añadir datos a un array

edades.push(19); // al final
edades.unshift(10); // al principio

// eliminar datos de un array

edades.pop(); // elimina el ultimo y retorna lo que ha eliminado 
edades.shift() // elimina el primero y retorna el valor

//***** slice para exraer partes de un array

edades.slice(1,6); // -1(el ultimo) (1) desde la posicion hasta el final

//****************** map  Tq <3

edades.map((edad) => edad*2);

//*************+ filter

edades.filter((edad) => edad>=18);



// dado un array de nombres crea una funcion que se llame mayusculas
// que haga que se pongan en mayusculas todos los elementos de la array que se pasen como prametro


// precios con iba que al pasarle una array de precios me los devuelva con el iva incluida


// crear una funcio que se llame impares cuadrado que pase un array de numeros y me devuelva solo los imares elevados al cuadrado

// crear una funcion que se llama normalizar email que le pasen un array de emails que pueden tener espacios al principio y al final y que los quite

// crea una funcion llamada filtrarLongitud que le pase como parametro nombres, un tamaño y me devuelva un array con los nombres cuyo tamaño es mayor o igual que el tamaño que le he puesto

// normalizar nombres propios que le pase como parametro un array de nombres y me los idevueva con la letra captal en mayuscula


const nombresTest = ["Angel","Pepe","Manolo","Laura","Antonio"];
 /**
  * 
  * @param {string[]} nombres - Se le pasa un array de nombres
  * @returns {string[]} - Retorna un array con los nombres en mayusculo de dicho array pasado como parámetro
  */
function mayusculas(arrays){
    return arrays.map((array) => array.toUpperCase());
}
console.log(mayusculas(nombresTest));


const preciosTest = [24.21,12.02,98,2];

function iva(arraySinIva){
    return arraySinIva.map((array) => array*1.21);
}

console.log(iva(preciosTest));


const numerosImparesTest = [2,3,4,5,6,7];
/**
 * 
 * @param {number[]} numeros - Se le pasa un array de números 
 * @returns  {number[]} - Retorna un array de los números impares al cuadrado
 */
function impares(arrayNumero){
    return arrayNumero.filter((array) => (Math.pow(array,2)%2)===1);
}

console.log(impares(numerosImparesTest));


const emailsTest = ["buenas@gmail.com ", " hola@hola.hola ", " adios@adios.adios"]
/**
 * 
 * @param {string[]} emails - Recibe un array de emails 
 * @returns {string[]} - Retorna los emails pasados eliminando los espacios
 */
function emails(arrayEmail){
    return arrayEmail.map((email)=>email.trim())
}
console.log(emails(emailsTest));


const nombresLongitudTest = ["Angel","Braquiosaurio","Mew","Eustaquio"]
/**
 * 
 * @param {string[]} nombres - Recibe un array de nombres 
 * @param {number} longitud - Recibe un número que determina la longitud de los nombres a la que se va a filtrar 
 * @returns {string[]} - Retorna el array cuyo nombre cumpla la longitud establecida
 */
function filtrarLongitud(arrayNombres,longitud){
    return arrayNombres.filter((array) => array.length>=longitud);
}
console.log(filtrarLongitud(nombresLongitudTest,6));


const letraCapitalTest = ["anGeL ORTEGA", " GoNZaLo"]
/**
 * 
 * @param {string[]} nombres - Recibe un array de nombres que pueden incluir apellidos
 * @returns {string[]} - Retorna el array de nombres formalizados, es decir, con sus letras capitales en mayúscula
 */
function letraCapital(arrayNombres){
    return arrayNombres.map((nombre) => nombre.toLowerCase().split(" ")
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(" ") 
  );
}

console.log(letraCapital(letraCapitalTest));
