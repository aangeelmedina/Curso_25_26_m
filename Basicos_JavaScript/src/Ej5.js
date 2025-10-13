// .at <------ acceso con indices negativos

const frutas = ["🍇","🍈","🍉","🍊","🍋‍🟩"];

console.log(frutas.at(-2))
console.log(frutas.slice(-2))

// splice -->  frutas.splice(1,2) corta desde la posicion 1 2 elmentos 

// concat <------ se utiliza para concatenar 2 o mas arrays

// SET <------ otro tipo de dato formado por datos unicos sin orden

// reduce <----- se utiliza para reducir un array a un unico valor

// Realizar la multiplicación de todo el array
const pesos=[1,2,3,4,5,74,3,2,4,6,43,2,4,6,32,5,56];


pesos.reduce((multiplicar,peso)=>multiplicar*peso, 1);

// Encontrar el máximo de un array, y el mínimo

pesos.reduce((maximo,peso)=>peso > maximo ? peso : maximo, pesos[0]); // <------ esto es maximo
pesos.reduce((minimo,peso)=>peso < minimo ? peso : minimo, pesos[0]);

// Dado un array que sea [manzana, platano, naranja, manzana, manzana, platano, pera, pera], devolverme un objeto clave - valor que me diga nombre de la fruta: número de repeticiones
const frutas2 = ["manzana", "platano", "naranja", "manzana", "manzana", "platano", "pera", "pera"];

frutas2.reduce((acc,fruta) =>{
    acc[fruta]=(acc[fruta] || 0) +1
    return acc
},{});

// Dado el sigueinte array bidimensional, se pide aplanar dicho array en un array.

const bidimensional = [
  [1, 2, 3],
  [4, 5],
  [6, 7, 8, 9]
];

bidimensional.reduce((acc,alimento) => acc.concat(alimento),[]);




// array de objetos 
const usuarios = [
    {id:1, nombre:"Angel",edad:18, data: {books:100}},
    {id:2, nombre:"Pepe",edad:14, data: {books:50}},
    {id:3, nombre:"Manolo",edad:18, data: {books:20}},
    {id:4, nombre:"Laura",edad:19, data: {books:20}},
    {id:5, nombre:"Antonio",edad:15, data: {books:0}},
];

// dame la informacion del usuario cuyo nombre es Angel

usuarios.find(usuario => usuario.nombre.toLowerCase==="angel");

// dame todos los usuarios cuya edad es igual o mayor a 18

usuarios.find(usuario => Number(usuario.edad) >= 18) ?? {};


//devolver un array con solo los nombres de usuarios que tengan en su biblioteca mas de 20 libros

usuarios.reduce((acc,usuario) => usuario.data.books>20 ? [...acc,usuario.nombre] : acc,[]);

//obtener el valor promedio total de todos los libros si suponemos un precio medio de 28€

usuarios.reduce((acc,usuario) => acc+=(usuario.data.books)*28,0);

// decirme que usuarios no tienen libros

usuarios.reduce((acc,usuario) => usuario.data.books===0 ? [...acc,usuario.nombre] : acc,[]);


const productos = [
  { id: 1, nombre: 'Laptop', precio: 1200, stock: 5, categoria: 'Tecnología' },
  { id: 2, nombre: 'Camiseta', precio: 35, stock: 15, categoria: 'Ropa' },
  { id: 3, nombre: 'Monitor', precio: 300, stock: 0, categoria: 'Tecnología' },
  { id: 4, nombre: 'Libro', precio: 20, stock: 50, categoria: 'Literatura' },
  { id: 5, nombre: 'Móvil', precio: 800, stock: 10, categoria: 'Tecnología' },
  { id: 6, nombre: 'Pantalón', precio: 60, stock: 5, categoria: 'Ropa' },
];

// Se pide:
// 1.- Obtener un array con los nombres de todos los productos que están agotados.

productos.reduce((acc,producto) => producto.stock===0 ? [...acc,producto.nombre] : acc,[]);

// 2.- Calcular el valor total del inventario (precio * stock) de todos los productos.

productos.reduce((acc,producto) => acc+=(producto.precio*producto.stock),0);

// 3.- Filtrar los productos que pertenecen a la categoría 'Tecnología' y tienen un precio mayor a 500.

productos.filter(producto => producto.categoria==="Tecnología" && producto.precio>500);

// 4.- Crear un nuevo array de productos aplicando un descuento del 10% a todos los productos de la categoría 'Ropa'.

productos.map(producto => producto.categoria==="Ropa" ? {...producto, precio: producto.precio*0.9} : producto);