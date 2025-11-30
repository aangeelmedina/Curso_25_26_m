import { db } from "./db/db"

const app = () => {
    // Primera funcion closure
    const crearClosure = () => {
        let mensajeSecreto = "Este es un mensaje secreto"

        return () => {
            console.log("mensaje: ",mensajeSecreto)
        }
    }

    const miClosure = crearClosure();
    miClosure(); // Muestra el mensaje secreto


    // scope lexico
    let nivelGlobal = "soy global 🌍"
    const funcionExterna = () => {
        let nivelExterno = "soy externo 🌎"
        const funcionInterna = () => {
            let nivelInterno = "soy interno 🌏"
            console.log(nivelGlobal)   // Accede a nivelGlobal
            console.log(nivelExterno)  // Accede a nivelExterno
            console.log(nivelInterno)  // Accede a nivelInterno
        }
        funcionInterna();
    }
    funcionExterna();

    // crear un objeto publico que tengan las claves saldo y retirarDinero(cantidad) <----- retirar dinero saldo
    // ejercicio Encapsulacion
    const objetoPublico = {
        saldo: 1000,
        retirarDinero: function(cantidad){
            this.saldo -= cantidad;
        }
    }

    objetoPublico.retirarDinero(100);
    console.log(objetoPublico.saldo);

    const cuentaBancaria = (saldoInicial=0) => {
        // saldo ha de ser privado
        let saldo = saldoInicial;
        return {
            obtenerSaldo: () => saldo,
            depositar: (cantidad = 0) => {
                if(cantidad>0){ 
                    saldo+=cantidad;
                    return true;
                };
                return false;
            },
            retirar : (cantidad) => {
                if(cantidad < saldo) {
                    saldo-=cantidad
                    return true
                };
                return false
            }

        }
    }

    const cuenta= cuentaBancaria(1000);
    cuenta.depositar(100)
    console.log(cuenta.obtenerSaldo())

    //Crear un contador incrementar, decrementar, resetear y obtener el valor del contador.
    /*
    Ejercicio1: Crear dos contadores, uno que empiece en 10 y vaya hasta al 0,
    y otro que empiece en 0 y vaya hasta 10, ejemplificar un temporizador de un segundo.
    */

    const temporizador = (valorInicial=0) =>{
        let valor = valorInicial;
        return {
            incrementar: (cantidad) => valor+=cantidad, 
            decrementar: (cantidad) => cantidad<=valor ? valor-=cantidad : valor, 
            resetear: () => valor = valorInicial,
            obtenerValor: () => valor
        }
    }

    const contador1 = temporizador();
    console.log('=========================CONTADOR===========================')
    const id = setInterval(() => {
        contador1.incrementar(1);
        console.log(contador1.obtenerValor());
    }, 1000);

    setTimeout(() => clearInterval(id),10000)

    // vamos a ejemplificar un carrito de la compra persistente utilizando closure y estableciendo 
    // la persistencia de datos utilizando sqlite 3

    // ejemplificar un carrito que permita insertar productos, eliminar, calcular total 

    const carrito = (usuario) =>{
        let nombre = usuario;
        return {
            
        }
    }

}
export default app
