import { canciones } from "../db/data";
const VITE_CATALOGO = import.meta.env.VITE_CATALOGO;
const VITE_PLAYLIST = import.meta.env.VITE_PLAYLIST
const VITE_INDICE = import.meta.env.VITE_INDICE;

function guardar(clave,map){
    const valor = Array.from(map.values());
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperar(clave) {
    const mapa = new Map();
    const datos = JSON.parse(localStorage.getItem(clave)) || [];
    datos.forEach((o) => mapa.set(o.id || o.termino, o));
    return mapa;
}

export function crearCatalogo(){
    const mapaCanciones = new Map();
    canciones.forEach((c) =>{
        mapaCanciones.set(c.id,{ ...c, historialReproduccion: [] })
    })
    guardar(VITE_CATALOGO,mapaCanciones);
    return mapaCanciones;
}

export function reproducirCancion(idCancion){
    const catalogo = recuperar(VITE_CATALOGO);
    if(!catalogo.has(idCancion)) throw new Error(`La canción con ID ${idCancion} no existe`);
    catalogo.get(idCancion).reproducciones++;
    catalogo.get(idCancion).historialReproduccion.push({
        fecha: new Date().toISOString(),
        timestamp: Date.now
    })

    guardar(VITE_CATALOGO,catalogo);
    return catalogo.get(idCancion);
}

function guardarSet(clave,valor){
    const arrayValor = Array.from(valor); 
    localStorage.setItem(clave,JSON.stringify(arrayValor));
}

export function gestionarPlaylists(){
    const biblioteca = new Map();

    function crear(nombrePlaylist){
        if(biblioteca.has(nombrePlaylist)) return false;
        biblioteca.set(nombrePlaylist,new Set());
        guardarSet(VITE_PLAYLIST,biblioteca.get(nombrePlaylist));
        return true;
    }

    function agregar(nombrePlaylist, idCancion){
        if(!biblioteca.has(nombrePlaylist)) throw new Error('Error no existe la playlist');
        const catalogo = recuperar(VITE_CATALOGO);
        if(!catalogo.has(idCancion)) throw new Error('Error no existe la cancion');
        const sn = !(biblioteca.get(nombrePlaylist).has(idCancion));
        biblioteca.get(nombrePlaylist).add(idCancion);
        guardarSet(VITE_PLAYLIST,biblioteca.get(nombrePlaylist))
        return sn;
    }

    function eliminar(nombrePlaylist, idCancion){
        if(!biblioteca.has(nombrePlaylist)) throw new Error('Error no existe la playlist');
        const sn = biblioteca.get(nombrePlaylist).has(idCancion);
        biblioteca.get(nombrePlaylist).delete(idCancion)
        guardarSet(VITE_PLAYLIST,biblioteca.get(nombrePlaylist));
        return sn;
    }

    function obtener(nombrePlaylist){
        if(!biblioteca.has(nombrePlaylist)) throw new Error('Error no existe la playlist');
        const cancionesArray = [];
        biblioteca.get(nombrePlaylist).forEach((valor) =>{
            cancionesArray.push(canciones.find((c) => c.id === valor))
        })
        return cancionesArray;
    }

    function listar(){
        return [...biblioteca.keys()];
    }

    return { crear,agregar,eliminar,obtener,listar }

}

export function construirIndiceBusqueda(){
    const catalogo = recuperar(VITE_CATALOGO);
    const indice = new Map()
    const terminos = ['titulo','artista','album','genero','año']
        catalogo.forEach((cancion) => {
            terminos.forEach((t) => {
            const clave = cancion[t]
            if(clave){
                const claveFinal = clave.toString().toLowerCase().split(" ")
                claveFinal.forEach((c) =>{
                    if(!indice.has(c)){
                        indice.set(c,new Set());
                    }
                    indice.get(c).add(cancion.id)
                })
            }
            
        })
    })

    const indiceFinal = new Map();
    for (const [clave, valor] of indice.entries()) {
        indiceFinal.set(clave,{termino: clave,ids: [...valor]})
    }
    guardar(VITE_INDICE,indiceFinal);
    return indice;
}


export function buscarCanciones(termino, filtros = {}){
    const indice = recuperar(VITE_INDICE);
    const arrayCanciones = [];
    indice.get(termino.toLowerCase()).ids.forEach((id) => arrayCanciones.push(recuperar(VITE_CATALOGO).get(id)))
    arrayCanciones.sort((a,b) => b.reproducciones - a.reproducciones);

    return arrayCanciones.filter((c) =>{
        // Si existe filtro de género, compara exactamente (ignorando mayúsculas)
        if (filtros.genero && c.genero.toLowerCase() !== filtros.genero.toLowerCase()) {
            return false;
        }

        // Si existe filtro de año mínimo
        if (filtros.añoMin && c.año < filtros.añoMin) {
            return false;
        }

        // Si existe filtro de año máximo
        if (filtros.añoMax && c.año > filtros.añoMax) {
            return false;
        }

        // Si existe filtro de duración máxima
        if (filtros.duracionMax && c.duracion > filtros.duracionMax) {
            return false;
        }

        // Si llega hasta aquí → pasa todos los filtros existentes
        return true;
    })
}

export function generarEstadisticasMusicales(){
    const catalogo = recuperar(VITE_CATALOGO);
    let total = 0;
    catalogo.forEach((valor) => total+=valor.duracion);
    const reproduciones = [];
    // Recolectamos las reproducciones
    catalogo.forEach((valor) => reproduciones.push(valor.reproducciones));
    // Calculamos el máximo
    const maxRepros = Math.max(...reproduciones);
    const setArtistas = new Set()
    catalogo.forEach((c) => setArtistas.add(c.artista));
    let totalAños = 0;
    catalogo.forEach((valor) => totalAños+=valor.año);
    
    return {
        totalCanciones: catalogo.size,
        duracionTotal: (total/60).toFixed(2),
        cancionMasReproducida: Array.from(catalogo.values()).find(c => c.reproducciones === maxRepros),
        generosPorCantidad: Array.from(catalogo.values()).reduce((acc,c) =>{
            acc[c.genero] = (acc[c.genero] || 0) + 1;
            return acc;
        },{}),
        artistasUnicos: Array.from([...setArtistas]),
        añoPromedio: Math.round(totalAños/catalogo.size),
        distribucionDecadas: Array.from(catalogo.values()).reduce((acc,c) =>{
            acc[Math.floor(c.año / 10) * 10 + "s"] = (acc[Math.floor(c.año / 10) * 10 + "s"] || 0) + 1;
            return acc;
        },{})
    }
}

export function  generarRecomendaciones(idCancionBase, cantidad = 3){
    const catalogo = recuperar(VITE_CATALOGO);
    if(!catalogo.has(idCancionBase)) throw new Error('No existe la cancion base');
    const canciones = [];
    catalogo.forEach((clave) => {
        let puntuacion = 0;
        const razones = [];
        if(clave.id !== idCancionBase && clave.artista === catalogo.get(idCancionBase).artista){
            puntuacion+=5
            razones.push('mismo artista')
        }
        if(clave.id !== idCancionBase && clave.genero === catalogo.get(idCancionBase).genero){
            puntuacion+=3
            razones.push('mismo género')
        }
        if(clave.id !== idCancionBase && clave.año >= catalogo.get(idCancionBase).año - 5 && clave.año <= catalogo.get(idCancionBase).año + 5){
            puntuacion+=2
            razones.push('año de lanzamiento está en un rango de ±5 años')
        }
        if(clave.id !== idCancionBase && clave.año >= catalogo.get(idCancionBase).duracion - 60 && clave.duracion <= catalogo.get(idCancionBase).duracion + 60){
            puntuacion+=2
            razones.push('año de lanzamiento está en un rango de ±5 años')
        }
        canciones.push({
            cancion: clave,
            puntuacion: puntuacion,
            razones: razones
        })
    })
    canciones.sort((a,b) => b.puntuacion - a.puntuacion)
    return canciones.slice(0,cantidad);
    
}