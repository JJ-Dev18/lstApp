import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { validarLoginUsuario } from './validations/auth';
import { validarCampos } from '../middlewares/validar-campos';

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
          rol: 'administrador', // O el rol que desees por defecto
        },
      });
     console.log(user)
      // Generar un token JWT
      const token = jwt.sign({ id: user.id, email: user.email, nombre : user.nombre, rol : user.rol }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
  
      res.status(201).json({user , token });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario' , error2 : error});
      console.log(error)
    }
  
});

router.post('/login', validarLoginUsuario, validarCampos ,async (req :Request, res :Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.usuario.findUnique({ where: { email }, include :{
      torneos: true 
    } });
    console.log(user,"user")
    if (!user || !user.password) {
      return res.status(200).json({ error: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ error: 'password inválido' });
    }
    const token = jwt.sign({ id: user.id, nombre: user.nombre, email: user.email, rol : user.rol, torneos : user.torneos.length }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ user : { id:user.id, nombre : user.nombre , email: user.email, rol : user.rol, torneos : user.torneos.length }, token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' , error2:error});
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
router.get('/check-token', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log(token,"token")
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    const decoded :any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.usuario.findFirst({
      where : { id : decoded.id},
      include: { torneos : true }
    })
    return res.status(200).json({ message: 'Token is valid', user : {  id: user?.id, nombre: user?.nombre, email: user?.email, rol : user?.rol, torneos : user?.torneos.length} });
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid or has expired' });
  }
});
export default router;
