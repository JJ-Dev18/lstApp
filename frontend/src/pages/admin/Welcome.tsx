/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4E1Yj2o9HJ1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Button, useBreakpointValue } from '@chakra-ui/react';
import useStore from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { desktopSteps, mobileSteps } from '../../utils/stepsTour';


export default function Welcome() {
  // const { run, stepIndex, startTour, stopTour, setStepIndex  } = useStore();
  const {  startTour } = useStore();
  const user = useStore( (state) => state.user)
  const navigate = useNavigate()
  const isMobile = useBreakpointValue({ base: true, md: false });
  const start = () => {
    if(user?.torneos && user?.torneos > 0 ){
        navigate('/admin/torneos')
    }else{
      if (isMobile) {
        startTour(mobileSteps);
      } else {
        startTour(desktopSteps);
      }
      
    }
  }

  



  
  return (
    
    <div className="flex flex-col items-center justify-center h-[70vh] px-4 md:px-6 overflow-x-hidden">
      <div className="max-w-md space-y-4 text-center">
       
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">¡Bienvenido a nuestra plataforma {user?.nombre}!</h1>
        <p className="text-gray-500 md:text-xl dark:text-gray-400">
        Supervisa torneos, actualiza estadísticas y mantén a todos informados en tiempo real.</p>
        <Button
          id="start"
          onClick={start}
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          
        >
         Empecemos ! 
        </Button>
      
      </div>
    </div>
  
    
  )
}