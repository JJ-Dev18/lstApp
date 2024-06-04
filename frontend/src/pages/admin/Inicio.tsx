import useStore from '../../store/store'
import DashboardContent from './DashboardContent'
import Welcome from './Welcome'

export const Inicio = () => {
    const user = useStore( (state) => state.user)
  return (
    <>
     {
        user?.torneos && user?.torneos > 0 
        ? <DashboardContent/>
        : <Welcome/>
     }
    </>
  )
}
