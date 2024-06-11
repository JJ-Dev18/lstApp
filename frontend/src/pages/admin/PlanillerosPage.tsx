import { apiEndpoints, columnsAdminCrud } from '../../utils/crudActionsAdmin';
import CrudTable from './components/crudtable/CrudTable';

const PlanillerosPage = () => {


  return (
    <CrudTable
      apiEndpoint={apiEndpoints.planilleros}
      columns={columnsAdminCrud.planilleros}
      model="Planilleros"
     
    />
  );
};

export default PlanillerosPage;
