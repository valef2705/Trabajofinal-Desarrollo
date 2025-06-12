const express = require('express');
const cors = require('cors');
const fs = require('fs');

console.log("🔧 Iniciando backend...");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const DATA_PATH = './turnos.json';

// Función para leer turnos de forma segura
function leerTurnos() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      fs.writeFileSync(DATA_PATH, '[]', 'utf8');
      return [];
    }
    const contenido = fs.readFileSync(DATA_PATH, 'utf8').trim();
    if (!contenido) {
      return [];
    }
    return JSON.parse(contenido);
  } catch (error) {
    console.error('❌ Error al leer turnos:', error.message);
    return [];
  }
}

// Función para guardar turnos de forma segura
function guardarTurnos(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error al guardar turnos:', error.message);
    return false;
  }
}

// Obtener todos los turnos
app.get('/api/turnos', (req, res) => {
  console.log('📥 [GET] Leyendo archivo de turnos...');
  const data = leerTurnos();
  res.json(data);
});

// Crear nuevo turno
app.post('/api/turnos', (req, res) => {
  const data = leerTurnos();
  const nuevoTurno = { id: Date.now(), ...req.body };
  data.push(nuevoTurno);
  if (guardarTurnos(data)) {
    console.log('🆕 Turno creado:', nuevoTurno);
    res.status(201).json(nuevoTurno);
  } else {
    res.status(500).json({ error: 'Error interno al guardar el turno' });
  }
});

// Editar turno (confirmar / cancelar)
app.put('/api/turnos/:id', (req, res) => {
  const data = leerTurnos();
  const id = req.params.id; // ahora se trata como string
  const index = data.findIndex(t => t.id.toString() === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body }; // mantiene id original
    if (guardarTurnos(data)) {
      console.log('✏️ Turno editado:', data[index]);
      res.json(data[index]);
    } else {
      res.status(500).json({ error: 'Error interno al guardar el turno editado' });
    }
  } else {
    res.status(404).json({ error: 'Turno no encontrado' });
  }
});

// Eliminar turno
app.delete('/api/turnos/:id', (req, res) => {
  let data = leerTurnos();
  const id = req.params.id;
  const longitudAntes = data.length;
  data = data.filter(t => t.id.toString() !== id);
  if (data.length === longitudAntes) {
    return res.status(404).json({ error: 'Turno no encontrado' });
  }
  if (guardarTurnos(data)) {
    console.log('🗑️ Turno eliminado, id:', id);
    res.status(204).end();
  } else {
    res.status(500).json({ error: 'Error interno al eliminar el turno' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
