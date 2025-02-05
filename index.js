const express = require('express');
const app = express();
const PORT = 5000
const routes = require('./routes');

const { DBconnect } = require('./config/config');


// Middleware
app.use(express.json());

// Rutas
app.use('/', routes);

// Conexión a la base de datos
DBconnect()

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app