import { imagesData } from "../data/images";
import { createImageGrid } from "./ImageCard";
import createImageModal from "./ImageModal";


export default function createGalleryApp() {

    // contenedor Principal
    const container = document.createElement("div")
    container.className = 'min-h-screen bg-gradient-to-br from-pink-700 via-white to-blue-700';

    //-------------------------HEADER-----------------------------
    const header = document.createElement("header")
    header.className = 'bg-white shadow-lg sticky top-0 z-40'
    
    const headerContentDiv = document.createElement("div")
    headerContentDiv.className='max-w-7xl mx-auto px-6 py-6'

    const headerTitle = document.createElement("h1")
    headerTitle.className='text-3xl font-bold text text-purple-800 mb-2'
    headerTitle.textContent = '🖼️ Galeria de Imagenes'

    const headerSubTitle = document.createElement("p")
    headerSubTitle.className='text-gray-600'
    headerSubTitle.textContent = 'Aprende closures, dunciones Fabrica y manipulacion del DOM'

    headerContentDiv.appendChild(headerTitle)
    headerContentDiv.appendChild(headerSubTitle)

    header.appendChild(headerContentDiv)

    
    //-------------------------MAIN-------------------------------
    
    const main = document.createElement("main")
    main.className = 'max-w-7xl mx-auto px-6 py-8'

    //contador Favoritos
    const counterComponent = document.createElement("h2")
    counterComponent.textContent= 'Aqui ira el componente FavoritosCounter'

    //Modal de imagen 
    const imageModal = document.createElement("h2");
    imageModal.textContent = "Imagen";

    // Función para abrir el modal
    const handleImageClick = (imageId) => {
        const modal = createImageModal(imageId);
        if (modal) {
            container.appendChild(modal.element);
        }
    };

    //grid de imagenes
    const gridComponent = document.createElement("h2")
    gridComponent.textContent = 'Aqui ira el componente grid con las imagenes'
    const imageComponent = createImageGrid(imagesData,handleImageClick);
    main.appendChild(imageComponent.element)

    //añadimos todo al main
    main.appendChild(counterComponent)
    main.appendChild(imageModal)
    main.appendChild(gridComponent)


    //-------------------------FOOTER-----------------------------

    const footer = document.createElement("footer")
    footer.className = 'bg-white shadow-lg sticky top-0 z-40'

    const footerContainerDiv = document.createElement("div")
    footerContainerDiv.className = 'max-w-7xl mx-auto px-6 py-6'

    const footerText = document.createElement("p")
    footerText.className='text-gray-600'
    footerText.textContent=`Angel Ortega Medina https://github.com/aangeelmedina`

    footerContainerDiv.appendChild(footerText)
    footer.appendChild(footerContainerDiv)



    // Añadimos Todo al container
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);
    return {    
        element : container,
    }
}
