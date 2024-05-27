import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('planillero1@example.com');
  const [password, setPassword] = useState('planillero123');
  const navigate = useNavigate();
  console.log( "api url ", import.meta.env.VITE_API_URL )
  console.log( "api url ", import.meta.env.VITE_API_URL_SOCKET )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email,password)
      if(response.error){
        window.alert(response.error)
        console.log(response.error)
      }else{
        navigate('/events');
      }
      // window.alert()
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <button onClick={() => navigate('/auth/google')}>Iniciar Sesión con Google</button>
      </form>
      <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
};

export default Login;
