import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './database';
import { Usuario } from '@prisma/client';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
    let user: Usuario | null = await prisma.usuario.findUnique({
      where: { googleId: profile.id }
    });

    if (!user) {
      user = await prisma.usuario.create({
        data: {
          googleId: profile.id,
          nombre: profile.displayName,
          email: email,
          password: '',  // Deja este campo vacío ya que no se usa con Google
          rol: 'planillero'
        }
      });
    }

    done(null, user);
  } catch (err) {
    done(err, false);
  }
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.usuario.findUnique({ where: { id: Number(id) } });
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
