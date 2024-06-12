import { Request, Response } from "express";
import { actualizarPlanillero, createPlanillero, eliminarPlanillero, obtenerPlanillero, obtenerPlanilleros, obtenerPlanillerosPorTorneo } from "../controllers/planilleroController";
import { ensureAuthenticated } from "../middlewares/auth";

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un planillero
router.post('/:torneoId',ensureAuthenticated, createPlanillero);

// Obtener todos los planilleros
router.get('/:torneoId', ensureAuthenticated,obtenerPlanillerosPorTorneo);
router.get('/',ensureAuthenticated, obtenerPlanilleros);
router.delete('/:id', ensureAuthenticated,eliminarPlanillero);
router.get('/:id',ensureAuthenticated,obtenerPlanillero);
router.put('/:id',ensureAuthenticated, actualizarPlanillero);

// Obtener un planillero por ID

// Actualizar un planillero

// Eliminar un planillero

export default router
