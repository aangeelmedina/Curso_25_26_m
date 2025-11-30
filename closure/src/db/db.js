import Database from 'better-sqlite3';

export const db = new Database('carrito'); // Si no existe, la crea

// Crear tablas
db.exec(
    `CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS carrito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cantidad INTEGER NOT NULL,
    );
    
    CREATE TABLE IF NOT EXISTS lineaCarrito (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carrito_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    
    FOREIGN KEY(carrito_id) REFERENCES carrito(id),
    FOREIGN KEY(producto_id) REFERENCES productos(id)
    );
    `
);
