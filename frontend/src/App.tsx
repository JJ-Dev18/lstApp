import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import NotFound from './pages/public/NotFound';
import Partidos from './pages/planilero/Partidos';
import Marcador from './components/marcador/Marcador';
import useStore from './store/store';
import RoleProtectedRoute from './pages/public/RoleProtectedRoute';
import UnauthorizedPage from './pages/public/UnAuthorized';
import { Role } from './interfaces/auth';
import Home from './pages/public/Home';
import Dashboard from './pages/admin/Dashboard';
import LayoutAdministrador from './components/layout/LayoutAdministrado';
import Login2 from './pages/public/Login2';

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
         <Route path="/" element={<Navigate to="/inicio" />} />
         <Route path="/inicio" element={<Home />} />
        
        <Route path="/login" element={<Login2 />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        <Route element={<RoleProtectedRoute allowedRoles={[Role.PLANILLERO]} />}>
          <Route path="/planillero" element={<Partidos />} />
          <Route path="/partidos/:partidoId" element={<Marcador />} />
        </Route>
        
        {/* <Route element={<RoleProtectedRoute allowedRoles={['planillero']} />}>
          <Route path="/planillero" element={<PlanilleroPage />} />
        </Route> */}
        
        {/* <Route element={<RoleProtectedRoute allowedRoles={[Role.ADMIN]} />}>
          <Route path="/administrador" element={
            <LayoutAdministrador>
              <Dashboard />
            </LayoutAdministrador>
          } />
        </Route> */}
          <Route element={<RoleProtectedRoute allowedRoles={[Role.ADMIN]} />}>
          <Route  element={<LayoutAdministrador />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />}/>
          </Route>
        </Route>
        
        {/* <Route element={<RoleProtectedRoute allowedRoles={['espectador']} />}>
          <Route path="/espectador" element={<EspectadorPage />} />
        </Route> */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
