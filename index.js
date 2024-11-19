

// Función para mostrar el cargando
function showLoading() {
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.classList.remove("hidden");
}




// Función para ocultar el cargando
function hideLoading() {
    const loadingContainer = document.getElementById("loading-container");
    loadingContainer.classList.add("hidden");
}




// Función para mostrar el mensaje de error
function showError() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("hidden");

    // Ocultar mensaje de error automáticamente después de 10 segundos
    setTimeout(() => {
        errorMessage.classList.add("hidden");
    }, 10000);
}






// Función para ocultar el mensaje de error
function hideError() {
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.add("hidden");
}

document.getElementById("mostrar-certificado").addEventListener("click", function () {
    const cedula = document.getElementById("cedula").value;

    if (!cedula) {
        alert("Por favor, ingrese su cédula.");
        return;
    }

    showLoading();
    hideError();

    const url = `certificados/${cedula}.pdf`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Certificado no encontrado");
            }
            return response.blob();
        })
        .then((blob) => {
            const objectURL = URL.createObjectURL(blob);
            const certificadoContainer = document.getElementById("certificado-container");
            const certificadoCanvas = document.getElementById("certificado-canvas");
            const descargarCertificado = document.getElementById("descargar-certificado");

            certificadoContainer.classList.remove("hidden");
            descargarCertificado.href = objectURL;
            descargarCertificado.download = `${cedula}.pdf`;

            pdfjsLib.getDocument(objectURL).promise.then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    const scale = 1.5;
                    const viewport = page.getViewport({ scale });
                    certificadoCanvas.width = viewport.width;
                    certificadoCanvas.height = viewport.height;
                    const context = certificadoCanvas.getContext("2d");
                    page.render({
                        canvasContext: context,
                        viewport,
                    });
                });
            });

            hideLoading();
        })
        .catch(() => {
            hideLoading();
            showError();
        });
});
