import { imagesData } from "../data/images";
import createImageModal from "./ImageModal";

export function createImageCard(imagen,onImageClick,onFavoriteToggle){
    // contenedor principal

    const card = document.createElement("div")
    card.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group relative'
    card.dataset.imageId = imagen.id

    // Imagen
    const img = document.createElement("img")
    img.src = imagen.url;
    img.alt = imagen.title;
    img.className = 'w-full h-64 object-cover group-hover:opacity-90 transition-opacity'
    //img.onerror=() => img.src="Aqui iria la url de una imagen que simbolice no disponible"

    card.appendChild(img)

    //gestionar el corazon de favoritos
    
    const corazon = document.createElement("p");
    corazon.textContent='🤍'
    corazon.className = `
        absolute top-2 right-2
        text-2xl cursor-pointer
        select-none
        transition-transform duration-200
        hover:scale-110 active:scale-95
        bg-white
        rounded-full
        p-0.5
    `;

    card.appendChild(corazon);

    //informacion de la Imagen
    const infoContainer = document.createElement("div")
    infoContainer.className='p-4 bg-white'

    const title =document.createElement("h3")
    title.className='font-bold text-lg text-gary-800 mb-2'
    title.textContent=imagen.title
    infoContainer.appendChild(title)

    const author = document.createElement("p")
    author.className='font-semibold text-sm text-gray-600'
    author.textContent=`Realizado por: ${imagen.author}`
    infoContainer.appendChild(author)

    //meter informacion
    card.appendChild(infoContainer)

    //evento de la tarjeta
    card.onclick = () =>{
        if(onImageClick){
            onImageClick(imagen.id)
        }
    }

    //evento del Corazon
    corazon.onclick = (e) =>{
        //IMPORTANTE: ‼️SI NO PONEMOS stopPropagation() siempre que le demos al corazón se abrir la imagen modal‼️
        e.stopPropagation();
        corazon.textContent = corazon.textContent === "❤️" ? "🤍" : "❤️";
        if (onFavoriteToggle) {
            onFavoriteToggle(imagen.id);
        }
    }

    //retornar el componente
    return{
        element: card,
        //funciones
    }

}

export function createImageGrid(images,onImageClick,onFavoriteToggle){
    // Creamos un Map Privado que guarde las tarjetas

    const cards = new Map();
    const grid = document.createElement("div")
    grid.className = 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6'

    // Crear Cada tajeta con createImageCard
    images.forEach(image => {
        const cardComponent = createImageCard(image,onImageClick,onFavoriteToggle)
        cards.set(image.id,image)
        grid.appendChild(cardComponent.element)
    });

    return{
        element: grid,
    }
}