import { useNavigate } from 'react-router-dom';
import { Action } from '../pages/admin/components/crudtable/CrudTable';
import { RiTeamFill } from "react-icons/ri";
export const useAdditionalActions = () => {
  const navigate = useNavigate();

  const handleViewPlayers = (team: any) => {
    console.log(team,'team handleviewplayers')
    navigate(`/admin/equipos/${team.id}/jugadores`);
  };

  const actions: { [key: string]: Action[] } = {
    equipos: [
      {
        name: 'Jugadores',
        icon: <RiTeamFill />, // Aquí nos aseguramos de que ViewIcon se usa como un valor
        callback: handleViewPlayers,
      }
    ],
    // Puedes agregar más modelos y sus acciones aquí
  };

  return actions;
};
