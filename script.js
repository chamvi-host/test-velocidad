const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const fileUrl = 'https://proof.ovh.net/files/1Gb.dat'; // Archivo alternativo sin restricciones de CORS
const fullUrl = proxyUrl + fileUrl;

async function startTest() {
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    resultDiv.innerHTML = "Calculando velocidad...";

    // Inicia la barra de progreso en 0
    progressBar.style.width = '0%';
    progressContainer.style.visibility = 'visible';

    const startTime = new Date().getTime();

    try {
        const response = await fetch(fullUrl);
        const reader = response.body.getReader();
        let downloaded = 0;
        const contentLength = +response.headers.get('Content-Length');
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            downloaded += value.length;

            // Calcula el progreso en porcentaje
            const progress = (downloaded / contentLength) * 100;
            progressBar.style.width = `${progress}%`;

            // Calcula la velocidad de la descarga
            const currentTime = new Date().getTime();
            const durationInSeconds = (currentTime - startTime) / 1000; // en segundos
            const speedMbps = (downloaded * 8) / (1024 * 1024 * durationInSeconds);

            // Muestra la velocidad
            resultDiv.innerHTML = `
                <p>Velocidad de descarga: <span style="color: #00ff00">${speedMbps.toFixed(2)}</span> Mbps</p>
            `;
        }

        // Finaliza la prueba
        progressBar.style.width = '100%';
        resultDiv.innerHTML += `<p>Test completado.</p>`;

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
