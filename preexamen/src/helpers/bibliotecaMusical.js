import { canciones } from "../db/data";

const CATALOGO= 'catalogo';
const PLAYLIST = 'playlist';
const INDICE ='indiceBusqueda';

function guardar(clave, myMap) {
    const valor = Array.from(myMap.values());
    localStorage.setItem(clave, JSON.stringify(valor));
}

function recuperar(clave) {
    const mapa = new Map();
    const datos = JSON.parse(localStorage.getItem(clave)) || [];
    datos.forEach((o) => mapa.set(o.id, o));
    return mapa;
}

export function crearCatalogo() {
    const catalogo = new Map();

    canciones.forEach((c) => {
        catalogo.set(c.id, { ...c, historialReproduccion: [] });
    });

    guardar(CATALOGO, catalogo);
    return catalogo;
}

export function reproducirCancion(idCancion) {
    const mapa = recuperar(CATALOGO);

    if (!mapa.has(idCancion)) {
        throw new Error(`La canción con ID ${idCancion} no existe`);
    }

    const cancion = mapa.get(idCancion);
    cancion.reproducciones++;
    cancion.historialReproduccion.push({
        fecha: new Date().toISOString(),
        timestamp: Date.now()
    });

    mapa.set(idCancion, cancion);
    guardar(CATALOGO, mapa);

    return mapa.get(idCancion);
}





function guardarPlaylist(clave,valor){
    const arrayValor = Array.from(valor); 
    localStorage.setItem(clave,JSON.stringify(arrayValor));
}



export function gestionarPlaylists(){
    const playList = new Map()

    function crear(nombrePlaylist){
        if(playList.has(nombrePlaylist)) throw new Error('Ya existe la playlist');
        playList.set(nombrePlaylist,new Set())
        guardarPlaylist(nombrePlaylist,playList.get(nombrePlaylist));
    }

    function agregar(nombrePlaylist, idCancion){
        if(!playList.has(nombrePlaylist)) throw new Error('no existe la playlist');

        if(!recuperar(CATALOGO).has(idCancion)) throw new Error('no existe la cancion');

        playList.get(nombrePlaylist).add(idCancion);

        guardarPlaylist(nombrePlaylist,playList.get(nombrePlaylist));
        
    }

    function eliminar(nombrePlaylist, idCancion){
        if(!playList.has(nombrePlaylist)) throw new Error('no existe la playlist');
        playList.get(nombrePlaylist).delete(idCancion);

        guardarPlaylist(nombrePlaylist,playList.get(nombrePlaylist));
    }

    function obtener(nombrePlaylist){
        const cancion = [];
        if(!playList.has(nombrePlaylist)) throw new Error('no existe la playlist');
        playList.get(nombrePlaylist).forEach((p) =>{
            cancion.push(recuperar(CATALOGO).get(p))
        })
        return cancion;
    }

    function listar(){
        return Array.from(playList.keys())
    }

    return { crear,agregar,eliminar,obtener,listar }

}

//funcion que pase como parametro artista y me devuelva el nombre de las canciones que tiene dicho artista
//Crear una funcion que le pase como parametro max o min y obtenga ordenadas por el nombre de la cancion las 5 canciones mas o menos reproducidas
//Crear una funcion reset que poga todos los contadores de las canciones a 0, 
//Crear una funcion total reproducciones que obtenga el total de reproducciones de mi catalogo

export function  construirIndiceBusqueda(){
    const catalogo = recuperar(CATALOGO);
    const indice = new Map();
    const terminos = ['titulo','artista','album','genero','año']
    catalogo.forEach((c) =>{
        terminos.forEach((t) =>{
            // Obtenemos la cadena del campo actual
            const clave = c[t]
            if(clave){
                // Convertimos a minúsculas y separamos en palabras
                const claves = clave.toString().toLowerCase().split(" ")

                // Recorremos cada palabra y la añadimos al índice
                claves.forEach((palabra) => {
                if (!indice.has(palabra)) {
                    indice.set(palabra, new Set()); // Creamos una nueva entrada
                }
                    indice.get(palabra).add(c.id); // Añadimos el objeto actual
                });
            }
        })
    })
    const indiceFinal = new Map();
    for (const [clave, valor] of indice.entries()) {
        indiceFinal.set(clave,{termino: clave,ids: [...valor]})
    }
    guardar(INDICE,indiceFinal);
    return indice;
}

export function buscarCanciones(termino, filtros = {}){
    const busquedas = JSON.parse(localStorage.getItem('indiceBusqueda'))
    const ids=[]; 
    const busquedasFiltradas = busquedas.filter((b)=> b.termino === termino)
    busquedasFiltradas.forEach((f) => f.ids.forEach((id) => ids.push(id)));
    console.log(ids);
    const canciones = []
    ids.forEach((p) =>{
        canciones.push(recuperar(CATALOGO).get(p))
    })

    canciones.sort((a,b) => b.reproducciones-a.reproducciones);

    return canciones.filter(c => {
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
    });

}

export function generarEstadisticasMusicales(){
    const catalogo = recuperar(CATALOGO);
    function totalCanciones(){
        return catalogo.size;
    }
    function duracionTotal(){
        let total = 0;
        catalogo.forEach((clave) => total+=clave.duracion)
        return (total/60).toFixed(2);
    }
    function cancionMasReproducida(){
        const reproduciones = [];

        // Recolectamos las reproducciones
        catalogo.forEach((valor) => reproduciones.push(valor.reproducciones));

        // Calculamos el máximo
        const maxRepros = Math.max(...reproduciones);

        // Buscamos la canción con ese número de reproducciones
        const cancion = Array.from(catalogo.values()).find(c => c.reproducciones === maxRepros);
        return cancion
    }

    function generosPorCantidad(){
        const generos = Array.from(catalogo.values())
            .reduce((acc, c) => {
                acc[c.genero] = (acc[c.genero] || 0) + 1;
                return acc
            },{});
        return generos;
    }
    function artistasUnicos(){
        const setArtistas = new Set()
        catalogo.forEach((valor) => setArtistas.add(valor.artista));
        return setArtistas.size
    }

    function añoPromedio(){
        const año = Array.from(catalogo.values())
            .reduce((acc, c) => acc+=c.año,0);
        return Math.round(año/catalogo.size)
    }
    function distribucionDecadas(){
        const decadas = Array.from(catalogo.values())
            .reduce((acc, c) => {
                acc[Math.floor(c.año / 10) * 10 + "s"] = (acc[Math.floor(c.año / 10) * 10 + "s"] || 0) + 1;
                return acc
            },{});
        return decadas;
    }

    return { totalCanciones,duracionTotal,cancionMasReproducida,generosPorCantidad,artistasUnicos,añoPromedio,distribucionDecadas }

}

export function  generarRecomendaciones(idCancionBase, cantidad = 3){
    const catalogo = recuperar(CATALOGO);
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