const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Carga variables .env

const connectDB = require('./db');
const Turno = require('./models/Turno');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Primero conectamos a MongoDB
connectDB().then(() => {
  console.log("🔧 Iniciando backend...");

  // Rutas API

  // Obtener todos los turnos
  app.get('/api/turnos', async (req, res) => {
    try {
      const turnos = await Turno.find();
      res.json(turnos);
    } catch (error) {
      console.error('❌ Error al obtener turnos:', error.message);
      res.status(500).json({ error: 'Error al obtener los turnos' });
    }
  });

  // Crear nuevo turno
  app.post('/api/turnos', async (req, res) => {
    try {
      console.log('Datos recibidos para nuevo turno:', req.body); // para debug
      const nuevoTurno = new Turno(req.body);
      await nuevoTurno.save();
      console.log('🆕 Turno creado:', nuevoTurno);
      res.status(201).json(nuevoTurno);
    } catch (error) {
      console.error('❌ Error al crear turno:', error.message);
      res.status(500).json({ error: 'Error al crear el turno' });
    }
  });

  // Editar turno (confirmar / cancelar)
  app.put('/api/turnos/:id', async (req, res) => {
    try {
      const turnoActualizado = await Turno.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!turnoActualizado) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      console.log('✏️ Turno editado:', turnoActualizado);
      res.json(turnoActualizado);
    } catch (error) {
      console.error('❌ Error al editar turno:', error.message);
      res.status(500).json({ error: 'Error al editar el turno' });
    }
  });

  // Eliminar turno
  app.delete('/api/turnos/:id', async (req, res) => {
    try {
      const eliminado = await Turno.findByIdAndDelete(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ error: 'Turno no encontrado' });
      }
      console.log('🗑️ Turno eliminado, id:', req.params.id);
      res.status(204).end();
    } catch (error) {
      console.error('❌ Error al eliminar turno:', error.message);
      res.status(500).json({ error: 'Error al eliminar el turno' });
    }
  });

  // Levantamos el servidor solo después de conectar DB
  app.listen(PORT, () => {
    console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('🔴 No se pudo iniciar el backend:', err);
});
