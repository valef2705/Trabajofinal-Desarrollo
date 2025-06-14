const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '../../.env' }); // Sube 2 niveles para cargar backend/.env

const connectDB = require('./db');
const turnoRoutes = require('./routes/turnos');

const app = express();
const PORT = process.env.TURNOS_PORT || 4001;

app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB
connectDB();

// Montar las rutas bajo /api/turnos (como usa el frontend)
app.use('/api/turnos', turnoRoutes);

app.listen(PORT, () => {
  console.log(`✅ Microservicio de turnos escuchando en http://localhost:${PORT}`);
});
