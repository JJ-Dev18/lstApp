import { apiEndpoints, columnsAdminCrud } from '../../utils/crudActionsAdmin';
import CrudTable from './components/crudtable/CrudTable';

const CategoriasPage = () => {


  return (
    <CrudTable
      apiEndpoint={apiEndpoints.categorias}
      columns={columnsAdminCrud.categorias}
      model="Categoria"
     
    />
  );
};

export default CategoriasPage;
