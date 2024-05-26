import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';

const router = express.Router();

router.get('/healt', (req,res) =>  res.status(201).json({message : 'OK'}));

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email, rol: user.rol, googleId: user.googleId }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    res.redirect(`http://localhost:8080?token=${token}`);
  });

router.post('/register', async (req, res) => {
    const { email, password, nombre } = req.body;

    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.usuario.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el nuevo usuario
      const user = await prisma.usuario.create({
        data: {
          email,
          password: hashedPassword,
          nombre,
          rol: 'usuario', // O el rol que desees por defecto
        },
      });
  
      // Generar un token JWT
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
  
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario' , error2 : error});
      console.log(error)
    }
  
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

export default router;
