let maxSpeed = 0;
let minSpeed = Infinity;

function startTest() {
    const fileUrl = 'https://proof.ovh.net/files/1Gb.dat'; // Reemplaza este enlace con uno válido
    const startTime = Date.now();
    const progressBar = document.getElementById('progressBar');
    const result = document.getElementById('result');
    const progressContainer = document.getElementById('progressContainer');
    const maxSpeedElement = document.getElementById('maxSpeed');
    const minSpeedElement = document.getElementById('minSpeed');

    // Mostrar barra de progreso
    progressContainer.style.visibility = 'visible';
    progressBar.style.width = '0%';

    // Función para medir el progreso de la descarga
    let xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function (event) {
        if (event.lengthComputable) {
            const downloaded = event.loaded;
            const total = event.total;
            const timeElapsed = (Date.now() - startTime) / 1000; // Tiempo transcurrido en segundos
            const downloadSpeed = (downloaded / timeElapsed) / 1024 / 1024; // en MB/s

            // Convertir MB/s a Mbps
            const downloadSpeedMbps = downloadSpeed * 8;

            // Actualizar la barra de progreso
            progressBar.style.width = `${(downloaded / total) * 100}%`;

            // Actualizar las velocidades más alta y baja
            if (downloadSpeedMbps > maxSpeed) {
                maxSpeed = downloadSpeedMbps;
            }

            if (downloadSpeedMbps < minSpeed) {
                minSpeed = downloadSpeedMbps;
            }

            // Mostrar las velocidades
            maxSpeedElement.textContent = `${maxSpeed.toFixed(2)} Mbps`;
            minSpeedElement.textContent = `${minSpeed.toFixed(2)} Mbps`;
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
