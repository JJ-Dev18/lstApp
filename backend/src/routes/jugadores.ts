import express from 'express';
import prisma from '../config/database';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { Jugador } from '@prisma/client';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No se ha proporcionado ningún archivo');
  }

  const workbook = xlsx.readFile(file.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: Jugador[] = xlsx.utils.sheet_to_json(sheet);

  try {
    await prisma.jugador.createMany({
      data : data,
      skipDuplicates: true,
      // where: { id },
      // update: { nombre, posicion, fotoUrl: fotoUrl },
      // create: { nombre, numero, posicion, fotoUrl: fotoUrl }
    });
    // for (let row of data) {
    //   const { nombre, numero, posicion, fotoUrl ,equipoId } = row;
    // }
    res.send('Datos ingresados exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar los datos');
  } finally {
    fs.unlinkSync(file.path); // Elimina el archivo temporal
  }
});

export default router;