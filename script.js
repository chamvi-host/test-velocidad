function startTest() {
    const fileUrl = 'https://codeload.github.com/chamvi-host/PSX/zip/refs/heads/main'; // Archivo de prueba
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy CORS
    const fullUrl = proxyUrl + fileUrl;

    const startButton = document.getElementById('startButton');
    const startTime = Date.now();
    const progressBar = document.getElementById('progressBar');
    const result = document.getElementById('result');
    const progressContainer = document.getElementById('progressContainer');
    const speedMbpsElement = document.getElementById('speedMbps');
    const speedMBElement = document.getElementById('speedMB');

    // Deshabilitar el botón durante el test
    startButton.disabled = true;

    // Mostrar barra de progreso
    progressContainer.style.visibility = 'visible';
    progressBar.style.width = '0%';
    result.textContent = '';

    // Crear la solicitud
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fullUrl, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            const downloaded = event.loaded;
            const total = event.total;
            const timeElapsed = (Date.now() - startTime) / 1000; // Tiempo transcurrido en segundos
            const downloadSpeedMBps = (downloaded / timeElapsed) / 1024 / 1024; // en MB/s
            const downloadSpeedMbps = downloadSpeedMBps * 8; // Convertir a Mbps

            // Actualizar la barra de progreso
            progressBar.style.width = `${(downloaded / total) * 100}%`;

            // Mostrar la velocidad
            speedMbpsElement.textContent = `${downloadSpeedMbps.toFixed(2)} `;
            speedMBElement.textContent = `${downloadSpeedMBps.toFixed(2)} `;
        }
    };

    xhr.onload = function () {
        // Verificar si la descarga fue exitosa
        if (xhr.status === 200) {
            const responseSize = xhr.response.size || xhr.getResponseHeader("Content-Length");
            if (responseSize && responseSize > 0) {
                progressBar.classList.add('completed');
                result.textContent = 'Test completado con éxito.';
            } else {
                result.textContent = 'No se pudo verificar la descarga completa.';
            }
        } else {
            result.textContent = `Error: Código de estado ${xhr.status}`;
        }
        startButton.disabled = false; // Habilitar el botón
    };

    xhr.onerror = function () {
        result.textContent = 'Error en la descarga. Verifica tu conexión.';
        startButton.disabled = false;
    };

    xhr.send();
}
