const fileUrl = 'https://cors-anywhere.herokuapp.com/https://proof.ovh.net/files/1Gb.dat'; // Usando CORS Anywhere como proxy
const progressBar = document.getElementById('progressBar');
const resultDiv = document.getElementById('result');
const progressContainer = document.getElementById('progressContainer');
const consoleOutput = document.getElementById('consoleOutput');

async function startTest() {
    resultDiv.innerHTML = "Calculando velocidad...";
    progressBar.style.width = '0%';
    progressContainer.style.visibility = 'visible';

    const startTime = new Date().getTime();

    logToConsole('Iniciando test de velocidad...');

    try {
        const response = await fetch(fileUrl);
        const reader = response.body.getReader();
        let downloaded = 0;
        const contentLength = +response.headers.get('Content-Length');

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            downloaded += value.length;

            const progress = (downloaded / contentLength) * 100;
            progressBar.style.width = `${progress}%`;

            const currentTime = new Date().getTime();
            const durationInSeconds = (currentTime - startTime) / 1000; 
            const speedMbps = (downloaded * 8) / (1024 * 1024 * durationInSeconds);

            resultDiv.innerHTML = `
                <p>Velocidad de descarga: <span style="color: #00ff00">${speedMbps.toFixed(2)}</span> Mbps</p>
            `;
            logToConsole(`Progreso: ${progress.toFixed(2)}% | Velocidad: ${speedMbps.toFixed(2)} Mbps`);
        }

        progressBar.style.width = '100%';
        resultDiv.innerHTML += `<p>Test completado.</p>`;

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        logToConsole(`Error: ${error.message}`);
    }
}

// Función para imprimir el "log" al estilo hacker en la consola
function logToConsole(message) {
    const timestamp = new Date().toISOString();
    consoleOutput.textContent += `[${timestamp}] ${message}\n`;
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Desplazarse al final
}
