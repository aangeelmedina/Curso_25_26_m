/**
 * 
 * @param {Object} product -- objeto data
 * @returns {Object} -- objeto con informacion extraida
 */
export const newData= (array) => {
    const {
        nombre,
        fabricante : {
            nombre:nombreFabricante,
            contacto
        },
        especificaciones: {ram}
    } = array;
    // console.log(nombre)
    // console.log(ram)
    // console.log(contacto)
    // console.log(nombreFabricante)

    return{
        nombre,
        nombreFabricante,
        contacto,
        ram
    }
}

// añadir una funcion llamada maxRAM que le pase un array de productos 
// y me devuelva el nombre del producto que tenga la maxima ram


export const maxRAM = (array) =>{
    array.map((newData).reduce((max,actual) =>{
        ram.slice()
    },0))


}