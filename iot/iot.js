const API_BASE = "http://localhost:3000";

async function getData() {
    const res = await fetch(`${API_BASE}/data`);
    const data = await res.json();

    document.getElementById("temp").innerText = data.temperature + " °C";
    document.getElementById("parking").innerText = data.parking + " Slots";
    document.getElementById("lightStatus").innerText = data.light ? "ON" : "OFF";
    document.getElementById("mode").innerText = data.mode ? data.mode.toUpperCase() : "UNKNOWN";
}

async function toggleLight() {
    await fetch(`${API_BASE}/toggle-light`);
    getData();
}

async function toggleMode() {
    await fetch(`${API_BASE}/mode`);
    getData();
}

setInterval(getData, 2000);