const express = require('express');
const Turno = require('../models/Turno');
const router = express.Router();

// Obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los turnos', error: err });
  }
});

// Crear un nuevo turno
router.post('/', async (req, res) => {
  try {
    const turno = new Turno(req.body);
    const turnoGuardado = await turno.save();
    res.status(201).json(turnoGuardado);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear turno', error: err });
  }
});

// Actualizar un turno existente
router.put('/:id', async (req, res) => {
  try {
    const turnoActualizado = await Turno.findByIdAndUpdate(
      req.params.id,
      {
        nombrePaciente: req.body.nombrePaciente,
        especialidad: req.body.especialidad,
        profesional: req.body.profesional,
        fecha: req.body.fecha,
        hora: req.body.hora,
        estado: req.body.estado || 'pendiente'
      },
      { new: true, runValidators: true }
    );
    if (!turnoActualizado) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.json(turnoActualizado);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar turno', error: err });
  }
});

// Eliminar un turno
router.delete('/:id', async (req, res) => {
  try {
    const resultado = await Turno.findByIdAndDelete(req.params.id);
    if (!resultado) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.json({ message: 'Turno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar turno', error: err });
  }
});

module.exports = router;
