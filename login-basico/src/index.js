// IMPORTACIONES

import { initialApp } from "./app";
import bcrypt from "bcryptjs"

// FUNCION INICIAL

initialApp();

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("carlos", salt);
console.log(hash);