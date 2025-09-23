// Crear un juego de un dado que utilizando una funcion llamada tirar dado permita tirar un dado de 6 caras con valores del 1-6.
// ademas crar una funcion llamada simular que le pase como parametro el numero de tiradas y me  diga que nimero se ha repetido mas veces

//---------- Declarar Variables -----------
let numeros = [0,0,0,0,0,0];

//---------- Declarar Funciones------------
function tirarDado(){
    return Math.floor((Math.random()*6)+1);
}

function simular(a){
    let posicion =0;
    let maximo=0;
    for(i=0;i<a;i++){
        num=tirarDado();
        numeros[num-1]+=1;
    }
    for(j=0;j<numeros.length;j++){
        if(numeros[j]>maximo){
            maximo=numeros[j];
            posicion=j+1;
        }
    }
    console.log(numeros);
    return "El numero que se ha repetido mas veces: "+posicion;
}

//-------- Inicializar aplicacion ---------

console.log(simular(20));