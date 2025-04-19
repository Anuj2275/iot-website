let lastUpdateTimestamp = 0;

async function updateData() {
    try {
        const response = await fetch('/api/latest');
        const data = await response.json();
        
        if (data.timestamp > lastUpdateTimestamp) {
            document.getElementById('temp').textContent = `${data.temp}°C`;
            document.getElementById('hum').textContent = `${data.hum}%`;
            document.getElementById('error').classList.add('hidden');
            lastUpdateTimestamp = data.timestamp;
        }
        
        // Check if data is older than 5 minutes
        const currentTime = Date.now();
        if (currentTime - lastUpdateTimestamp > 300000) {
            showError();
        }
    } catch (error) {
        showError();
    }
}

function showError() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.remove('hidden');
    document.getElementById('lastUpdate').textContent = 
        new Date(lastUpdateTimestamp).toLocaleString();
}

// Update every 2 seconds
setInterval(updateData, 2000);
updateData();
