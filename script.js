const fileUrl = 'https://cors-anywhere.herokuapp.com/https://proof.ovh.net/files/1Gb.dat'; // Usando CORS Anywhere como proxy
const progressBar = document.getElementById('progressBar');
const resultDiv = document.getElementById('result');
const progressContainer = document.getElementById('progressContainer');
const speedValuesDiv = document.createElement('div');
speedValuesDiv.classList.add('speed-values');

async function startTest() {
    resultDiv.innerHTML = "Calculando velocidad...";
    progressBar.style.width = '0%';
    progressContainer.style.visibility = 'visible';
    speedValuesDiv.innerHTML = '';  // Limpiar valores anteriores

    const startTime = new Date().getTime();

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
            const speedMBps = (downloaded / (1024 * 1024 * durationInSeconds));

            resultDiv.innerHTML = `
                <p>Velocidad de descarga:</p>
                <div class="speed-values">
                    <span>${speedMbps.toFixed(2)} Mbps</span> | 
                    <span>${speedMBps.toFixed(2)} MB/s</span>
                </div>
            `;
        }

        progressBar.style.width = '100%';
        resultDiv.innerHTML += `<p>Test completado.</p>`;

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
