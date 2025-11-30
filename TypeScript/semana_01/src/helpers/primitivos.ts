// Primitivos en typeScript

// 1º String
let nombre: string = "Angel Ortega";
let mensaje : string = `Hola ${nombre}`;

function procesarTexto(texto:string):string {
    return texto.trim().toUpperCase();

}

console.log(procesarTexto(mensaje));

// 2º Number

// Crear una funcion que se llame calcular precioFinal que lo voy a pasa un precio y un descuento

function calcularPrecioFinal(precio:number, descuento:number, impuesto:number):number {
    return (precio*(1+(impuesto/100)))*(1-(descuento/100))
}

console.log(calcularPrecioFinal(80,3,21));

// cualquier tipo any (No usar salvo)
// funcion que verifique que lo que se pasa como parametro sea un numero
// NO es infinito, !isNaN

function esNumero(nuemro:any):boolean{
    return typeof nuemro === "number" && isFinite(nuemro) && !isNaN(nuemro);
}

// calcular el promedio total

function calcularPromedio(numeros:number[]):number{
    if(numeros.length === 0){
        throw new Error("ERROR")
    }
    const suma = numeros.reduce((acc,numero) =>{
        return acc+numero;
    },0);
    return suma/numeros.length;
}

function calcularExtremos(numeros:number[]):{ min:number , max:number }{
    if(numeros.length === 0){
        throw new Error("ERROR")
    }
    const min:number = Math.min(...numeros);
    const max:number= Math.max(...numeros);

    return { min , max };
}


// 3º Booleanos

// comprobar si es correcto el email

function esCorrecto(email:string):boolean{
    const emailRegex : RegExp= /^[^\s@]+@+[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


interface permisosUsuarios{
    puedeLeer: boolean;
    puedeEscribir: boolean;
    puedeBorrar: boolean;
}

//Crear una funcion llamada obtenerPermisos que dependiendo de si el usuario es admin, 
//invitado o usuario cambie los permisos de la interface

type tipoUsuario= "invitado" | "usuario" | "administrador";

function obtenerPermisos(usuario:tipoUsuario):permisosUsuarios{
    switch(usuario){
        case "administrador":
            return {puedeLeer:true,puedeEscribir:true,puedeBorrar:true};
        case "invitado":
            return {puedeLeer:true,puedeEscribir:false,puedeBorrar:false};
        case "usuario":
            return {puedeLeer:true,puedeEscribir:true,puedeBorrar:false};
    }
}

// NULL UNDEFINED 
let posibleNombre: string| null="invitado";

// arrow function 

const duplicar= (numero:number):number=> {return numero*2;};

// crear una funcion que le pase como parametro un array de objetos y me devuelva si el usuario es mayor de edad

const usuarios = [
    { nombre: 'Juan', edad: 25 },
    { nombre: 'María', edad: 18 },
    { nombre: 'Pedro', edad: 15}
];

const mayorEdad = (usuarios: { nombre: string; edad: number; }[]) =>{
    return usuarios.filter(usuario => usuario.edad >= 18);
}

function procesarNumeros(numeros: number[]): number[] {
    return numeros
        .filter(numero => numero > 0) 
        .map(numero => numero * 2)     
        .sort((a, b) => b - a);       
}

const numerosEntrada = [1, -2, 3, 0, -4, 5, 8];
const numerosProcesados = procesarNumeros(numerosEntrada);

// Ejercicio Basico: Teniendo una interfaz de cliente crea una funcion que
// genere un map con la siguiente estructura:
/*
    idUsuario :{
    id: number;
    nombre: string;
    email: string;
}
*/ 
interface Cliente{
    id: number;
    nombre: string;
    email: string;
    telefono: string;
}

const clientes: Cliente[] = [
    { id: 1, nombre: 'angel', email: 'whdouwhduow@fhwufh.com', telefono: '12345678' },
    { id: 2, nombre: 'alex', email: 'whdouwhduow@fhwufh.com', telefono: '12345678' },
    { id: 3, nombre: 'gonzalo', email: 'whdouwhduow@fhwufh.com', telefono: '12345678' }
];

function generarMap(clientes: Cliente[]):Map<number,Cliente>{
    const map = new Map<number,Cliente>();
    clientes.forEach(cliente => {
        map.set(cliente.id,cliente);
    });
    return map;
}


//Calculadora simple: Crear una calculadora tipada que realice operaciones basicas, para ello 
//partimos de una interfaz llamada operacion formada por: tipo (sumar,restar,multiplicar y dividir)
// operando1 y operando2. Crear funcion llamada calculadora que le pasamos por parametro
// dos numeros y probarlo con 10 5 y 10 0
// Se podria ampliar a otras operaciones?


//-------------MAP------------------------ 
const edades = new Map<string, number>();
edades.set("Gonzalo",22);
// Para saber si existe la clave 
edades.has("Gonzalo")



interface Datos{
    nombre: string;
    email: string;
    cp:number;
}

//Para crear map con clave string y el valor sea tipo interface 

const usuarios2= new Map<string,Datos>();
usuarios2.set("Mario",{
    nombre:"Mario",
    email:"apuntesparamario@gmail.com",
    cp:18007
    }
)


//---------SET------------

const mySet = new Set<number>();
mySet.add(19);

//crear un sistema de categorias: 
// crear un map donde cada categoria tiene un set de productos
// llamar al map catalago 
// crear las sigueines funciones añadirProducto,MostrarCatalgo
// adicionalmente buscarProducto

const catalogo = new Map<string,Set<string>>();

function addProduct(categotia:string,product:string):void{
    //if(!catalogo.has(categotia)){
        catalogo.set(categotia,new Set<string>());
    //}
    // añadimos
        catalogo.get(categotia)?.add(product);

}

addProduct('Electronica','portatilHp');
addProduct('Electronica','portatilHp');
addProduct('Electronica','Mouse');
addProduct('Electronica','Teclado');
addProduct('Musica','Teclado');


function showCatalogo(): void{
    console.log("------------------------------------CATALOGO-----------------------------------------")
    for( const [categoria , productos] of catalogo){
        console.log(`Categoria: ${categoria} Numero de productos: ${productos.size} `);
        for (const producto of productos) {
            console.log(`-   ${producto}`);
        }
    }
}

function searchProduct(nameProduct:string): string[]{
    const categoriasEncontradas:string[] = [];
    for( const [categoria , productos] of catalogo){
        if(productos.has(nameProduct)){
            categoriasEncontradas.push(categoria);
        }
    }

    return categoriasEncontradas;
}


// crear un sistema de reservas de un restaurante que tenga un map con clave la hora de la reserva en formato yyyy-mm-dd
// y el valor es un set con el nombre de los clientes(DNI) que han reservado ese dia 

// Funciones: agragarReserva(),cancelarReserva(),MostrarReserva(),estadisticasDeReserva()

const restaurante = new Map<string, Set<string>>();

function agregaReserva(fecha: Date, nombre: string): void {
    const clave = fecha.toISOString().split('T')[0]; // yyyy-mm-dd
    if (!restaurante.has(clave)) {
        restaurante.set(clave, new Set<string>());
    }
    restaurante.get(clave)?.add(nombre);
}

function cancelarReserva(fecha: Date, nombre: string): void {
    const clave = fecha.toISOString().split('T')[0];
    if (restaurante.get(clave)?.has(nombre)) {
        restaurante.get(clave)?.delete(nombre);
        console.log(`Reserva cancelada con exito`);
    }else{
        console.log(`No existe reserva para ${nombre} en la fecha ${clave}`);
    }   
    
}

function mostrarReserva(fecha: Date, nombre: string): void {
    const clave = fecha.toISOString().split('T')[0];
    if (restaurante.get(clave)?.has(nombre)) {
        console.log(`Nombre de la reserva: ${nombre} | Fecha: ${clave}`);
    } else {
        console.log(`No existe reserva para ${nombre} en la fecha ${clave}`);
    }
}

function estadisticasDeReserva(): void {
    let total = 0;
    for (const [fecha, nombres] of restaurante) {
        console.log(`Reservas del ${fecha} -> ${nombres.size}`);
        total += nombres.size;
    }
    const media = restaurante.size > 0 ? total / restaurante.size : 0;
    console.log(`Reservas totales: ${total}`);
    console.log(`Media de reservas por día: ${media.toFixed(2)}`);
}
