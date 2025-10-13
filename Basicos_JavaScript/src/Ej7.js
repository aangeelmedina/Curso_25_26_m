// 

const usuario = {
    nombre: "Angel",
    email: "ejemplo@correo.es",
    activo: true
}




function validarCamposRequeridos(objeto,camposRequeridos){
    const claves = Object.keys(objeto);
    return camposRequeridos.every((campo) =>{
        return claves.includes(campo)
    })
}

// cuantos litros totales han caido en los meses de enero y abril

const precipitaciones = {
    enero: 110,
    febrero: 98,
    marzo: 120,
    abril: 50
}

const totalLitros = Object.values(precipitaciones)
    .reduce((acc,litros)=>Number(acc+litros),0);

// calcular la precipitacion maxima

const precipitacionMax = Math.max(...Object.values(precipitaciones));

// obtener pares clave valor en forma de array

const configuracion = {
    tema: "oscuro",
    idioma: "EN",
    notificaciones: true
}

const entradas = Object.entries(configuracion);


// filtrar los campos sensibles
const usuario2 = {
    nombre: "Angel",
    email: "ejemplo@correo.es",
    password: "iofoiwhfouwfh",
    activo: true
}

Object.entries(usuario2).filter([password]=usuario2);

// crear funcion llamada mostrar persona : Quiero que obtengais el username y las dos primeras redes sociales que el usuario tenga 
const usuario3 = {
    id : 1,
    info : {
        username: "angel",
        redes: ["twitter","github","Likelind"]
    }
}

const {info : {username,redes :[r1,r2]}} = usuario3;

const data4 = {
    id: 101,
    usuario: {
        perfil: {
            nombre: "Lucia",
            edad: 18,
            direccion: {
                ciudad: "Granada",
                pais: "España"
            },
        },
        activo: true
    },
};

const {usuario:{perfil:{nombre,edad=0}}}=data4;


const products = [
  {
    id: 1,
    nombre: "laptop",
    price: 1001,
    fabricante: {
      nombre: "HP",
      pais: "Usa",
      contacto: {
        email: "info@hp.com",
        tlf: "+1 657 414 414"
      }
    },
    especificaciones: {
      ram: "16GB",
      cpu: "Intel i7"
    }
  },
  {
    id: 2,
    nombre: "smartphone",
    price: 799,
    fabricante: {
      nombre: "Samsung",
      pais: "Corea del Sur",
      contacto: {
        email: "support@samsung.com",
        tlf: "+82 2 2053 3000"
      }
    },
    especificaciones: {
      ram: "8GB",
      cpu: "Exynos 2100"
    }
  },
  {
    id: 3,
    nombre: "tablet",
    price: 499,
    fabricante: {
      nombre: "Apple",
      pais: "Usa",
      contacto: {
        email: "support@apple.com",
        tlf: "+1 800 275 2273"
      }
    },
    especificaciones: {
      ram: "6GB",
      cpu: "Apple M1"
    }
  },
  {
    id: 4,
    nombre: "monitor",
    price: 299,
    fabricante: {
      nombre: "Dell",
      pais: "Usa",
      contacto: {
        email: "info@dell.com",
        tlf: "+1 800 624 9897"
      }
    },
    especificaciones: {
      resolucion: "4K",
      tamaño: "27 pulgadas"
    }
  },
  {
    id: 5,
    nombre: "impresora",
    price: 199,
    fabricante: {
      nombre: "Canon",
      pais: "Japón",
      contacto: {
        email: "support@canon.jp",
        tlf: "+81 3 3758 2111"
      }
    },
    especificaciones: {
      tipo: "Láser",
      velocidad: "30 ppm"
    }
  },
  {
    id: 6,
    nombre: "teclado mecánico",
    price: 129,
    fabricante: {
      nombre: "Logitech",
      pais: "Suiza",
      contacto: {
        email: "info@logitech.com",
        tlf: "+41 21 863 55 11"
      }
    },
    especificaciones: {
      switches: "Cherry MX Blue",
      conexion: "USB-C"
    }
  },
  {
    id: 7,
    nombre: "mouse inalámbrico",
    price: 59,
    fabricante: {
      nombre: "Razer",
      pais: "Singapur",
      contacto: {
        email: "support@razer.com",
        tlf: "+65 6505 2188"
      }
    },
    especificaciones: {
      dpi: "20000",
      conexion: "Bluetooth"
    }
  },
  {
    id: 8,
    nombre: "smartwatch",
    price: 349,
    fabricante: {
      nombre: "Garmin",
      pais: "Usa",
      contacto: {
        email: "info@garmin.com",
        tlf: "+1 913 397 8200"
      }
    },
    especificaciones: {
      pantalla: "AMOLED",
      bateria: "14 días"
    }
  },
  {
    id: 9,
    nombre: "auriculares",
    price: 179,
    fabricante: {
      nombre: "Sony",
      pais: "Japón",
      contacto: {
        email: "support@sony.jp",
        tlf: "+81 3 6748 2111"
      }
    },
    especificaciones: {
      tipo: "Over-Ear",
      cancelacionRuido: "Activa"
    }
  },
  {
    id: 10,
    nombre: "consola de videojuegos",
    price: 499,
    fabricante: {
      nombre: "Microsoft",
      pais: "Usa",
      contacto: {
        email: "support@microsoft.com",
        tlf: "+1 800 642 7676"
      }
    },
    especificaciones: {
      almacenamiento: "1TB SSD",
      gpu: "RDNA 2"
    }
  }
]

// Crea una funcion que extraiga los datos 


const newData= (array) => {
    const {
        nombre,
        fabricante : {
            nombre:nombreFabricante,
            contacto
        },
        especificaciones: {ram}
    } = array;


    return{
        nombre,
        fabricante,
        especificaciones
    }
}

const newDataArray = (array) =>{ array
    .map((product)=>newData(product))};


