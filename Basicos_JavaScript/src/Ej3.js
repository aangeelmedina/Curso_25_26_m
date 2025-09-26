/*
Gestion bancaria revolut
El ejercicio consiste en llevar un pequeño sistema bancario con js que permita: crear cuentas con titular y saldo
depositar dinero de una cuenta
retirar dinero de una cuenta(siempre que tenga saldo suficiente)
consutar el saldo de una cuenta 
trasferir dinero de dos cuentas validadndo que tienes dinero para hacerlo
mantener un listado de cuentas y buscar cuentas por titular
Cuando creemos una cuenta se debe generar un numero de cuenta(IBAN)
 
*/

//---------- Declarar Variables -----------
let cuentas=[];
let dineroCuenta=0;

//---------- Declarar Funciones------------
function generarIBAN(){
    let iban="ES";
    for(let i=0;i<10;i++){
        iban+=Math.floor(Math.random()*10);
    }
    return iban;
}



function crearCuenta(titular,saldo){
    const cuenta = {
        titular: titular,
        saldo: saldo,
        IBAN: generarIBAN()
    }

    cuentas.push(cuenta);

    console.log("Cuenta creada con exito numero de iban: "+cuenta.IBAN);
    return cuenta;
}

function depositar(iban,dinero){
    cuentas.forEach(cuenta =>{
        if(cuenta.IBAN==iban){
            cuenta.saldo+=dinero;
        }
    })

    return "Dinero depositado con exito saldo actual: "+dineroCuenta;
}

function consultarSaldo(iban){
    for(let i=0;i<cuentas.length;i++){
        if(cuentas[i].IBAN==iban){
            dineroCuenta=cuentas[i].saldo;
        }
    }
    return dineroCuenta;
}

function retirarDinero(dinero,iban){
    if(consultarSaldo(iban)<dinero){
        console.log("Error no se puede sacar mas dinero del que tienes");
    }else{
        cuentas.forEach(cuenta => {
            if(cuenta.IBAN == iban){
                cuenta.saldo-=dinero
            }
        })
    }
}

function transferir(origenIBAN,destinoIBAN,dinero){
    if(consultarSaldo(origenIBAN)<dinero){
        console.log("No se puede transferir")
    }else{
        retirarDinero(dinero,origenIBAN);
        depositar(destinoIBAN,dinero);
    }
}

function buscarPorTitular(titular){
    let cuentaTitutar=0;
    cuentas.forEach(cuenta =>{
        if(cuenta.titular == titular){
            cuentaTitutar = cuenta;
        }
    })

    return cuentaTitutar;
}

function test(){
    // Crear cuentas
    let cuenta1 = crearCuenta("Angel", 500);
    let cuenta2 = crearCuenta("Maria", 300);

    // consultar saldo
    console.log(consultarSaldo(cuenta1.IBAN) == 500 ? "✅ Test Cunsulta de saldo OK" : "❌ Test consulta de saldo FAIL");

    // Depositar
    depositar(cuenta1.IBAN, 200); 
    console.log(cuenta1.saldo == 700 ? "✅ Test deposito OK" : "❌ Test deposito FAIL");

    // Retirar
    retirarDinero(100,cuenta1.IBAN);
    console.log(cuenta1.saldo == 600 ? "✅ Test retiro OK" : "❌ Test retiro FAIL");
    retirarDinero(1000000,cuenta1.IBAN);
    console.log(cuenta1.saldo == 600 ? "✅ Test retiro fallido OK" : "❌ Test retiro fallido FAIL");

    // Transferencia
    transferir(cuenta1.IBAN, cuenta2.IBAN, 200);
    console.log(cuenta1.saldo == 400 && cuenta2.saldo == 500 ? "✅ Test transferencia OK" : "❌ Test transferencia FAIL");
    transferir(cuenta1.IBAN, cuenta2.IBAN, 20000000);
    console.log(cuenta1.saldo == 400 && cuenta2.saldo == 500 ? "✅ Test transferencia fallida OK" : "❌ Test transferencia fallida FAIL");

    // Busqueda por titular
    console.log(buscarPorTitular("Angel"));

}



//-------- Inicializar aplicacion ---------
test();
