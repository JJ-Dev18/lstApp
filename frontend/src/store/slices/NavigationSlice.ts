import { As } from '@chakra-ui/react';
import { FaBox, FaGamepad, FaUsers } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { VscUngroupByRefType } from 'react-icons/vsc';
import { HiTable } from "react-icons/hi";

interface Link{
    href: string ;
    label : string;
    icon : As | undefined
  
}
export interface NavigationSlice {
  links: Link[];
  setLinksAdmin : () => void ;
  setLinksPlanillero : () => void 

}
const linksAdmin = [
    // { href: "/admin/torneos", label: "Torneos", icon: FaHome },
    // { href: "/admin/dashboard", label: "Dashboard", icon: FaHome },
    { href: "/admin/categorias", label: "Categorias", icon: MdCategory },
    { href: "/admin/equipos", label: "Equipos", icon: FaBox },
    { href: "/admin/planilleros", label: "Planilleros", icon: FaUsers },
    { href: "/admin/grupos", label: "Grupos", icon: VscUngroupByRefType },
    { href: "/admin/partidos", label: "Partidos", icon: FaGamepad },
    { href: "/admin/posiciones", label: "Posiciones", icon: HiTable },

    // { href: "/admin/estadísticas", label: "Estadísticas", icon: FaChartBar },
    // { href: "/admin/clasificación", label: "Clasificación", icon: FaCog },
  
   
];

const linksPlanillero = [
    { href: "/planillero/partidos", label: "Partidos", icon: FaGamepad },

]

export const createNavigationSlice =(set: any): NavigationSlice => ({
    links: [],
    setLinksAdmin : () => set({
        links : linksAdmin
    }),
    setLinksPlanillero : () => set({
        links : linksPlanillero
    })
   
})