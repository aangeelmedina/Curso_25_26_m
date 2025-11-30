import { crearCatalogo,reproducirCancion,gestionarPlaylists,construirIndiceBusqueda,buscarCanciones,generarEstadisticasMusicales,generarRecomendaciones } from "./helpers/bibliotecaMusical";


app();

function app(){
    const catalogo = crearCatalogo();
    console.log(`Catálogo creado con ${catalogo.size} canciones`);

    try {
        const cancion = reproducirCancion(1);
        console.log(`Reproduciendo: ${cancion.titulo} - ${cancion.artista}`);
        console.log(`Total reproducciones: ${cancion.reproducciones}`);

        reproducirCancion(1); // Segunda reproducción
        reproducirCancion(999); // ID que no existe
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }

    const playlists = gestionarPlaylists();
    // Crear playlists
    playlists.crear("Rock Classics");
    playlists.crear("Favoritas");
    // Agregar canciones
    playlists.agregar("Rock Classics", 1); // Bohemian Rhapsody
    playlists.agregar("Rock Classics", 3); // Stairway to Heaven
    playlists.agregar("Rock Classics", 6); // Hotel California
    playlists.agregar("Favoritas", 1);
    playlists.agregar("Favoritas", 2);
    // Listar playlists
    console.log("Playlists disponibles:", playlists.listar());
    // Obtener canciones de una playlist
    const misRocks = playlists.obtener("Rock Classics");
    console.log(`\nPlaylist "Rock Classics" tiene ${misRocks.length} canciones:`);
    misRocks.forEach(cancion => {
    console.log(` - ${cancion.titulo} (${cancion.artista})`);
    });
    // Eliminar canción de playlist
    playlists.eliminar("Rock Classics", 1);
    console.log(`\nDespués de eliminar, quedan ${playlists.obtener("Rock Classics").length} canciones`);

    const indice = construirIndiceBusqueda();
    console.log(`Índice construido con ${indice.size} términos únicos`);
    console.log(`El término "rock" aparece en ${indice.get("rock").size} canciones`);
    console.log(`El término "queen" aparece en ${indice.get("queen").size} canciones`);

    // Búsqueda simple
    const resultados1 = buscarCanciones("rock");
    console.log(`Búsqueda "rock": ${resultados1.length} resultados`);
    resultados1.forEach(c => console.log(` - ${c.titulo} (${c.genero})`));
    // Búsqueda con filtros
    const resultados2 = buscarCanciones("rock", {
        añoMin: 1970,
        añoMax: 1980
    });
    console.log(`\nBúsqueda "rock" años 70: ${resultados2.length} resultados`);
    resultados2.forEach(c => console.log(` - ${c.titulo} - ${c.año}`));

    // Búsqueda con múltiples filtros
    const resultados3 = buscarCanciones("rock", {
        genero: "Rock",
        duracionMax: 400
    });
    console.log(`\nBúsqueda "rock" género Rock, max 400s: ${resultados3.length} resultados`);

    const stats = generarEstadisticasMusicales();
    console.log("=== ESTADÍSTICAS MUSICALES ===");
    console.log(`Total de canciones: ${stats.totalCanciones}`);
    console.log(`Duración total: ${stats.duracionTotal} minutos`);
    console.log(`Canción más reproducida: ${stats.cancionMasReproducida.titulo}`);
    console.log(`Artistas únicos: ${stats.artistasUnicos}`);
    console.log(`Año promedio: ${stats.añoPromedio}`);
    console.log("\nGéneros:");
    console.table(stats.generosPorCantidad);
    console.log("\nDistribución por década:");
    console.table(stats.distribucionDecadas);

    // Primero reproducimos algunas canciones para simular historial
    reproducirCancion(1); // Bohemian Rhapsody
    reproducirCancion(3); // Stairway to Heaven
    // Generamos recomendaciones basadas en Bohemian Rhapsody (ID 1)
    const recomendaciones = generarRecomendaciones(1, 5);
    console.log("Si te gustó 'Bohemian Rhapsody', te recomendamos:\n");
    recomendaciones.forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.cancion.titulo} - ${rec.cancion.artista}`);
    console.log(` Puntuación: ${rec.puntuacion} puntos`);
    console.log(` Razones: ${rec.razones.join(", ")}`);
    console.log();
    });

}

