

// - no puede estar vacia
// - password > 8 caracteres
// - username y password son correctos

import { getStorage, setUsuario } from "../helpers/storage";
import bcrypt from "bcryptjs"

export function validarCredentClient(username,password){
    username = username.trim();
    password = password.trim();

    if(!username || !password || password.length < 3){
        return false;
    }

    const users = getStorage();
    const user = users.find((user)=> user.username === username );

    if (!user) {
        return false; // usuario no encontrado
    }
    

    return bcrypt.compareSync(password ,user.password); // true



}
export function CreateCredentClient(username,password){
    username = username.trim();
    password = password.trim();

    if(!username || !password || password.length < 3){
        return false;
    }
    const users = getStorage();
    const user = users.find((user)=> user.username === username );

    if (user) {
        return false; // usuario encontrado no puede haber 2 iguales
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
        "id": (users.length + 1),
        "username" : username,
        "password" : hash
    };

    return setUsuario(newUser);



}