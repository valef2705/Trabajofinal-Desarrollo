const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../../.env' }); // Asegurate de que esta ruta sea correcta

const connectDB = require('./db');
const turnoRoutes = require('./routes/turnos');

const app = express();
const PORT = process.env.TURNOS_PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/turnos', turnoRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`✅ Microservicio de turnos escuchando en http://localhost:${PORT}`);
});
