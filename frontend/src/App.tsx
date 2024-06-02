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
import LayoutAdministrador from './components/layout/LayoutAdministrado';
import Login2 from './pages/public/Login2';
import DashboardContent from './pages/admin/DashboardContent';
import CrudTable from './pages/admin/components/CrudTable';
import { apiEndpoints, columnsAdminCrud } from './utils/crudActionsAdmin';
import ChatComponent from './pages/admin/ChatComponent';



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
          <Route path="/admin/dashboard" element={<DashboardContent />} />
          <Route path="/admin/usuarios" element={<CrudTable apiEndpoint={apiEndpoints.usuarios} columns={columnsAdminCrud.usuarios} model="Usuario" />} />
          <Route path="/admin/categorias" element={<CrudTable apiEndpoint={apiEndpoints.categorias} columns={columnsAdminCrud.categorias} model="Categoria" />} />
          <Route path="/admin/equipos" element={<CrudTable apiEndpoint={apiEndpoints.equipos} columns={columnsAdminCrud.equipos} model="Equipo" />} />
          <Route path="/admin/jugadores" element={<CrudTable apiEndpoint={apiEndpoints.jugadores} columns={columnsAdminCrud.jugadores} model="Jugador" />} />
          <Route path="/admin/partidos" element={<CrudTable apiEndpoint={apiEndpoints.partidos} columns={columnsAdminCrud.partidos} model="Partido" />} />
          <Route path="/admi/neventos" element={<CrudTable apiEndpoint={apiEndpoints.eventos} columns={columnsAdminCrud.eventos} model="Evento" />} />
          <Route path="/admin/grupos" element={<CrudTable apiEndpoint={apiEndpoints.grupos} columns={columnsAdminCrud.grupos} model="GrupoClasificacion" />} />
          <Route path="/admin/estadisticas" element={<CrudTable apiEndpoint={apiEndpoints.estadisticas} columns={columnsAdminCrud.estadisticas} model="Estadistica" />} />
          <Route path="/admin/chat" element={<ChatComponent/>}/>
        
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />}/>
          </Route>
        </Route>
    
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
