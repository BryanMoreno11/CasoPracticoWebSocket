//variables
let usuarios_diario = [];
const ctx = document.getElementById('realTimeChart').getContext('2d');
let realTimeChart = {};
import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const socket = io("http://localhost:3000");
//Llamadas
await graficarUsuariosRegistros();
socket.on("actualizacion", async() => {
    await actualizarGraficoUsuariosRegistros();
});
//Métodos
async function graficarUsuariosRegistros() {
    await obtenerUsuariosRegistroDiarios();
    const data = {
        labels: Object.keys(usuarios_diario),
        datasets: [{
            label: 'Usuarios en tiempo real',
            borderColor: 'rgb(75, 192, 192)',
            data: Object.values(usuarios_diario),
            fill: false,
        }],
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },

    };
    realTimeChart = new Chart(ctx, config);
}

async function actualizarGraficoUsuariosRegistros() {
    await obtenerUsuariosRegistroDiarios();
    realTimeChart.data.labels = Object.keys(usuarios_diario);
    realTimeChart.data.datasets[0].data = Object.values(usuarios_diario);
    realTimeChart.update();
}

async function obtenerUsuariosRegistroDiarios() {
    await fetch('http://localhost:3000/api/dashboard/usuariosregistro')
        .then(response => response.json())
        .then(response => usuarios_diario = response);

}