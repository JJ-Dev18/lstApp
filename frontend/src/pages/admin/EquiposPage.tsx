
import EquiposTable from './components/equipos/EquiposTable';

const EquiposPage = () => {

  return (
    <EquiposTable/>
    // <CrudTable
    //   apiEndpoint={apiEndpoints.equipos}
    //   columns={columnsAdminCrud.equipos}
    //   model="Equipo"
    //   additionalActions={additionalActions['equipos']}
    // />
  );
};

export default EquiposPage;
