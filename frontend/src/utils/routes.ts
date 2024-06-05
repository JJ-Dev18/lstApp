export interface Route {
    name: string;
    path: string;
    description?: string;
  }
  
  const routes: Route[] = [
    { name: 'Inicio', path: '/admin/inicio', description: 'Página principal' },
    { name: 'Torneos', path: '/admin/torneos', description: 'Listado de torneos' },
    { name: 'Equipos', path: '/admin/equipos', description: 'Listado de equipos' },
    { name: 'Partidos', path: '/admin/partidos', description: 'Listado de partidos' },
    // Agrega todas las rutas y secciones de tu aplicación aquí
  ];
  
  export default routes;
  