const numeros = [1,2,4,5,3,2,2,1,87,6,6,5];

// generar un objeto que tenga los siguientes campos 

/*
{
Valor: numero correspondiente
posicion : posicion dentro del array
esUltimo: array que me dice si es el ultimo (true/false)
}
*/

const resumenNumeros = numeros.map((numero,indice,array)=>{
    return {
        valor : numero,
        posicion : indice,
        esUltimo : array.length-1 === indice
    }
});

console.log(resumenNumeros);

const products = [
    {
        name: "laptop", price:1000, stock:5, active:true
    },
    {
        name: "Mouse logitech", price:28.55, stock: 0,active:false
    }
]

const resumenProductos = products.map((product)=>{
    return {
        name: product.name,
        originalPrice: product.price,
        priceVat: product.price*1.21,
        avaibleStock: product.stock > 0,
    }
})

console.log(resumenProductos);

// filtrame los productos que tienen stock y están activos 

const filtrarProductos = products.filter(product => product.stock>0 && product.active);

// buscar todos los datos de los laptops 

const filtrarLaptop = products.filter(product => product.name.toLowerCase().includes("laptop"));

console.log(filtrarLaptop);


function searchProduct(nameOfProduct,myArray){
    return myArray.filter(array => array.name.toLowerCase().includes(nameOfProduct.toLowerCase()));
}

// quiero crear una funcion que le pasee como parametro un array de productos,precio inicial , precio final 
// y nos devuelva productos cuyo precio esta en ese rango de valores

/**
 * 
 * @param {Array[]} arrayProducts 
 * @param {Number} initialPrice 
 * @param {Number} finalPrice 
 * @returns {Array[]}
 */
const filterPrice = (arrayProducts,initialPrice,finalPrice)=>{ 
    if((initialPrice >=0 && finalPrice >=0) && (initialPrice<finalPrice)){
        return arrayProducts.filter((array) => array.price>initialPrice && array.price<finalPrice);
    }
}

const carrito = [
    {
        name : "laptop", price:1000, count: 5
    },
    {
        name : "mouse", price:50, count: 10
    },
    {
        name : "monitor", price:300, count: 2
    },
    {
        name : "teclado", price:20, count: 5
    },
]

/**
 * @author: Angel Ortega Medina 
 * @param {Object[]} cart -- Carrito de objetos
 * @param {Number}vat -- Impuesto a aplicar
 * @return {Number} -- Total del carrito
 */
const totalShoppingCart = (cart = [],vat=1.21) =>{
    return cart.reduce((total,product)=>product.count>5 
    ? total+(product.price*vat)*0.95 
    : total+(product.price*vat),0)
};



const carrito2 = [
    {
        name:"laptop",
        price:100,
        count:5,
        category: "Electronica"
    },
    {
        name:"Teclado Mecánico",
        price: 28.56,
        count:1,
        category: "Electronica",

    },
    {
        name: "Polo Scalper",
        price: 218.6,
        count: 10,
        category: "Ropa"
    },
    {
        name: "Pantalon Stradivarius",
        price: 150,
        count: 2,
        category: "Ropa"
    },
]


// agrupar el carrito por categorias

// Agrupa el carrito por categorias
/**

{
Electronica [
]
}*/

const productsCategory = (carrito = []) =>{
    return carrito.reduce((group,product) =>{
        const categoryFilter = product.category;
        if(!group[categoryFilter]){
            group[categoryFilter] = [];
        }
        group[categoryFilter].push(product)
        return group;
    },{})
}

console.log(productsCategory(carrito2));


const votos = ["Ana", "carlos","Ana", "carlos","mario", "carlos","alex", "angel"];

// consultar votos

const countVote = (votos = []) => votos.reduce((total,voteName) =>{
    total[voteName]=(total[voteName] || 0)+1;
    return total;
}, {});


console.log(countVote(votos));

// buscar el usuario cuyo id sea 2
const user = [
    {
        id: 1, nombre: "Ana", rol: "Admin"
    },
    {
        id: 2, nombre: "Juan", rol: "Usuario"
    },
    {
        id: 3, nombre: "Alex", rol: "Admin"
    },
]

const findUsers = (users = [], id = 1) => {
    const user = users.find(user => Number(user.id) === Number(id));
    if (user) {
        return user.rol;
    } else {
        return "Error";
    }
};

console.log(findUsers(user,2));


const indexFinder = (userArray, id = 1) => {
    return user.findIndex(user => Number(user.id) === Number(id));
}

const numerosPares = [1,2,3,4,5,6,7];

const hayPares = numerosPares.some(numero => numero%2===0);

