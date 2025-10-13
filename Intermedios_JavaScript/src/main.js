

//----------------------------- INICIO DE LA APLICACIÓN ---------------------------

import { products } from "./data/data";
import { newData } from "./Helpers/myFuction";



const newDataArray = (array) => array
.map((product)=>newData(product));


console.log(newDataArray(products));