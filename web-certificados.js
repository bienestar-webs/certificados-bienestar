







// Función para mostrar el cargando

function showLoading() {
    const loadingContainer = document.getElementById("loading-container");
    if (!loadingContainer) {
        console.error("El elemento 'loading-container' no existe en el DOM.");
        return;
    }
    loadingContainer.classList.remove("hidden");
}








// Función para ocultar el cargando

function hideLoading() {
    const loadingContainer = document.getElementById("loading-container");
    if (!loadingContainer) {
        console.error("El elemento 'loading-container' no existe en el DOM.");
        return;
    }
    loadingContainer.classList.add("hidden");
}








// Función para mostrar el mensaje de error

function showError(message = "Ocurrió un error") {
    const errorMessage = document.getElementById("error-message");
    if (!errorMessage) {
        console.error("El elemento 'error-message' no existe en el DOM.");
        return;
    }
    errorMessage.textContent = message; // Muestra el mensaje de error específico
    errorMessage.classList.remove("hidden");

    // Ocultar mensaje de error automáticamente después de 10 segundos
    setTimeout(() => {
        hideError(); // Usa la función ya creada
    }, 10000);
}








// Función para ocultar el mensaje de error

function hideError() {
    const errorMessage = document.getElementById("error-message");
    if (!errorMessage) {
        console.error("El elemento 'error-message' no existe en el DOM.");
        return;
    }
    errorMessage.classList.add("hidden");
}









// Temporizador para ocultar el certificado

let certificadoTimeout;
function mostrarCertificadoTemporalmente() {
    clearTimeout(certificadoTimeout);
    certificadoTimeout = setTimeout(() => {
        const certificadoContainer = document.getElementById("certificado-container");
        if (!certificadoContainer) {
            console.error("El elemento 'certificado-container' no existe en el DOM.");
            return;
        }
        certificadoContainer.classList.add("hidden");
        document.body.classList.remove("no-background");
    }, 20000);
}










// Evento principal asociado al botón "mostrar-certificado"

document.getElementById("mostrar-certificado").addEventListener("click", async function () {
    const cedula = document.getElementById("cedula");
    const certificadoContainer = document.getElementById("certificado-container");
    const certificadoCanvas = document.getElementById("certificado-canvas");
    const descargarCertificado = document.getElementById("descargar-certificado");

    // Validaciones iniciales
    if (!cedula || !certificadoContainer || !certificadoCanvas || !descargarCertificado) {
        console.error("Uno o más elementos necesarios no existen en el DOM.");
        return;
    }

    if (!cedula.value.trim()) {
        showError("Por favor, ingrese su número de documento.");
        return;
    }

    showLoading();
    hideError();

    const url = `certificados/${cedula.value.trim()}.pdf`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No se encontró un certificado para este documento. Por favor, acérquese a las oficinas de bienestar.");
        }
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);

        // Mostrar el certificado y preparar la descarga
        certificadoContainer.classList.remove("hidden");
        descargarCertificado.href = objectURL;
        descargarCertificado.download = `${cedula.value.trim()}.pdf`;

        // Usar pdfjsLib para mostrar el PDF en un canvas
        const pdf = await pdfjsLib.getDocument(objectURL).promise;
        const page = await pdf.getPage(1);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        certificadoCanvas.width = viewport.width;
        certificadoCanvas.height = viewport.height;
        const context = certificadoCanvas.getContext("2d");

        // Renderizar la página en el canvas
        await page.render({
            canvasContext: context,
            viewport,
        });

        hideLoading();
        // Quitar el fondo cuando se muestra el certificado
        document.body.classList.add("no-background");

        // Iniciar el temporizador para ocultar el certificado
        mostrarCertificadoTemporalmente();

    } catch (error) {
        hideLoading();
        showError(error.message || "Hubo un problema al cargar el certificado.");
    }
});







// SCRIPT PARA QUE AL PRESIONAR "ENTER" TAMBIÉN CARGUE LA IMG

document.addEventListener('keydown', (event) => {
    const mostrarCertificado = document.getElementById("mostrar-certificado");

    if (!mostrarCertificado) {
        console.error("El botón 'mostrar-certificado' no existe en el DOM.");
        return;
    }

    if (event.key === "Enter" && document.activeElement.id === "cedula") {
        event.preventDefault(); // Previene que el formulario se envíe
        mostrarCertificado.click(); // Simula el clic del botón
    }
});















// SCRIPT PARA ABRIR LA IMAGEN O CERTIFICADO EN UN MODAL Y PODERLA VIZUALIZAR Y DESCARGAR.




// Obtener referencias a los elementos
const certificadoCanvas = document.querySelector('#certificado-canvas');
const modal = document.querySelector('#modal');
const modalImage = document.querySelector('#modal-image');
const closeModal = document.querySelector('#close-modal');

// Función para abrir el modal
certificadoCanvas.addEventListener('click', () => {
    const certificadoDataURL = certificadoCanvas.toDataURL(); // Convierte el canvas a una imagen
    modalImage.src = certificadoDataURL; // Carga la imagen en el modal
    modal.classList.add('show'); // Activa el modal
});

// Función para cerrar el modal con animación
const closeWithAnimation = () => {
    // Añadir la clase de cierre, que activa la animación
    modal.classList.add('closing');
    
    // Esperar que termine la animación de cierre antes de ocultar el modal completamente
    setTimeout(() => {
        modal.classList.remove('show'); // Elimina la clase que hace visible el modal
        modal.classList.remove('closing'); // Elimina la clase de animación de cierre
    }, 600); // El tiempo debe coincidir con la duración de la animación (600ms)
};

// Evento para cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', closeWithAnimation);

// Evento para cerrar el modal al hacer clic fuera del contenido
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeWithAnimation();
    }
});
