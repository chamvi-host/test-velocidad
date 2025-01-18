function startTest() {
    const fileUrl = 'https://codeload.github.com/chamvi-host/PSX/zip/refs/heads/main'; // Archivo de prueba
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy CORS
    const fullUrl = proxyUrl + fileUrl;

    const startTime = Date.now();
    const progressBar = document.getElementById('progressBar');
    const result = document.getElementById('result');
    const progressContainer = document.getElementById('progressContainer');
    const speedMbpsElement = document.getElementById('speedMbps');
    const speedMBElement = document.getElementById('speedMB');

    // Mostrar barra de progreso
    progressContainer.style.visibility = 'visible';
    progressBar.style.width = '0%';

    // Función para medir el progreso de la descarga
    let xhr = new XMLHttpRequest();
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
            speedMBElement.textContent = `${(downloadSpeedMBps).toFixed(2)} `;
        }
    };

    xhr.onload = function () {
        // Al completar la descarga
        result.textContent = 'Test completado.';
    };

    xhr.onerror = function () {
        result.textContent = 'Error en la descarga.';
    };

    xhr.send();
}
