const express = require("express");
const app = express();
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//socket.io
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    console.log("Usuario conectado");
    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
    socket.on("registro", (msg) => {
        console.log(msg);
        io.emit("actualizacion", msg)
    })

});
//rutas
const usuarioRoutes = require("./Enlace a Datos/routes/usuarioRoutes");
const dashboardRoutes = require("./Enlace a Datos/routes/dashboardRoutes");
app.use("/api", usuarioRoutes);
app.use("/api", dashboardRoutes);
server.listen("3000");
console.log("server up localhost:3000");