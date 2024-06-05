import routes from './routes';

interface Route {
  name: string;
  path: string;
  description?: string;
}

const searchRoutes = (term: string): Route[] => {
  if (!term) return [];
  return routes.filter((route:Route) =>
    route.name.toLowerCase().includes(term.toLowerCase()) ||
    (route.description && route.description.toLowerCase().includes(term.toLowerCase()))
  );
};

export default searchRoutes;
