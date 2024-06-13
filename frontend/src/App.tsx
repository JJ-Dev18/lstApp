import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import useStore from './store/store';
import { Role } from './interfaces/auth';
import { Skeleton } from '@chakra-ui/react';
import EquiposPage from './pages/admin/EquiposPage';
import CategoriasPage from './pages/admin/CategoriasPage';
import { JugadoresPage } from './pages/admin/JugadoresPage';
import { GruposPage } from './pages/admin/GruposPage';
import PlanillerosPage from './pages/admin/PlanillerosPage';
import PartidosPage from './pages/admin/PartidosPage';
const NotFound = lazy(() => import('./pages/public/NotFound'));
const Partidos = lazy(() => import('./pages/planilero/Partidos'));
const Marcador = lazy(() => import('./components/marcador/Marcador'));
const RoleProtectedRoute = lazy(() => import('./pages/public/RoleProtectedRoute'));
const UnauthorizedPage = lazy(() => import('./pages/public/UnAuthorized'));
const Home = lazy(() => import('./pages/public/Home'));
const LayoutAdministrador = lazy(() => import('./components/layout/LayoutAdministrado'));
const Login2 = lazy(() => import('./pages/public/Login2'));
const TournamentsList = lazy(() => import('./pages/admin/TournamentsLists'));
const Dashboard = lazy(() => import('./pages/admin/DashboardContent'));
const Welcome = lazy(() => import('./pages/admin/Welcome'));
const Register = lazy(() => import('./pages/public/Register'));




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
      <Suspense fallback={<Skeleton />}>

      <Routes>
         <Route path="/" element={<Navigate to="/inicio" />} />
         <Route path="/inicio" element={<Home />} />
        
        <Route path="/login" element={<Login2 />} />
        <Route path="/register" element={<Register />} />

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
          <Route path="/admin/inicio" element={<Welcome />} />
          <Route path="/admin/dashboard" element={<Dashboard/>} />
         
          <Route path="/admin/planilleros" element={<PlanillerosPage/>} />
          <Route path="/admin/categorias" element={<CategoriasPage/>} />
          <Route path="/admin/equipos" element={<EquiposPage/>} />
          <Route path="/admin/equipos/:equipoId/jugadores" element={<JugadoresPage/>} />
         
          <Route path="/admin/partidos" element={<PartidosPage/>} />
          {/* <Route path="/admi/neventos" element={<CrudTable apiEndpoint={apiEndpoints.eventos} columns={columnsAdminCrud.eventos} model="Evento" />} /> */}
          <Route path="/admin/grupos" element={<GruposPage/>}/>
          {/* <Route path="/admin/estadisticas" element={<CrudTable apiEndpoint={apiEndpoints.estadisticas} columns={columnsAdminCrud.estadisticas} model="Estadistica" />} /> */}
          <Route path="/admin/torneos" element={<TournamentsList/>} />
          
        
          <Route path="/admin" element={<Navigate to="/admin/inicio" />}/>
          </Route>
        </Route>
    
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
