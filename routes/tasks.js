const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Crear una tarea
router.post('/create', async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la tarea' });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: 'Error al obtener las tareas' });
  }
});

// Obtener tarea por id
router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al obtener la tarea' });
  }
});

// Marcar tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar la tarea' });
  }
});

// Actualizar el título de una tarea
router.put('/id/:_id', async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;
