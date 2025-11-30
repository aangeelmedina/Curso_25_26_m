

import { imagesData } from "../data/images";

export default function createImageModal(imageId) {
    const image = imagesData.find(image => image.id === imageId);
    if (!image) {
        return null;
    }

    // Fondo oscuro del modal   
    const modal = document.createElement("div");
    modal.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50 p-4";
    
    // Contenedor blanco para la imagen
    const modalContent = document.createElement("div");
    modalContent.className = "bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto relative";
    
    // Botón de cerrar (X)
    const closeButton = document.createElement("button");
    closeButton.className = "absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-2xl z-10 transition-colors";
    closeButton.innerHTML = "×";
    closeButton.setAttribute("aria-label", "Cerrar modal");
    
    // Contenedor de la imagen
    const imageContainer = document.createElement("div");
    imageContainer.className = "p-6";
    
    // Imagen
    const img = document.createElement("img");
    img.className = "w-full h-auto object-contain max-h-[70vh] rounded-lg";
    img.src = image.url;
    img.alt = image.title;
    
    // Ensamblar el modal
    imageContainer.appendChild(img);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(imageContainer);
    modal.appendChild(modalContent);
    
    // Función para cerrar el modal
    const closeModal = () => {
        modal.remove();
        document.removeEventListener("keydown", handleEscape);
    };
    
    // Cerrar con el botón X
    closeButton.onclick = (e) => {
        e.stopPropagation();
        closeModal();
    };
    
    // Cerrar al hacer clic en el fondo oscuro (fuera del contenido)
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Evitar que clics dentro del contenido cierren el modal
    modalContent.onclick = (e) => {
        e.stopPropagation();
    };
    
    // Cerrar con la tecla ESC
    const handleEscape = (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };
    document.addEventListener("keydown", handleEscape);
    
    return {
        element: modal,
        close: closeModal
    };
}