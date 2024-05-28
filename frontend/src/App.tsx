import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import Login from './pages/public/Login';
import Logout from './pages/public/Logout';
import ProtectedRoute from './pages/public/ProtectedRoute';
import NotFound from './pages/public/NotFound';
import Register from './pages/public/Register';
import Partidos from './pages/planilero/Partidos';
import Marcador from './components/marcador/Marcador';
import useStore from './store/store';

const App: React.FC = () => {
  const checkToken = useStore((state) => state.checkToken);

  useEffect(() => {
    const verifyToken = async () => {
      await checkToken();
    };
    verifyToken();
  }, [checkToken]);
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/partidos/:partidoId" element={<Marcador /> }/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
