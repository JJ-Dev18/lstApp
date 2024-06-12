import React, { useEffect } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import CreateTournamentForm from '../../pages/admin/components/torneos/CreateTournamentForm';

const Tour: React.FC = () => {
  const navigate = useNavigate();
  const { setNavbarOpen,run, stepIndex, steps, stopTour, setStepIndex , setOpenForm , openForm, crearTorneo} = useStore();
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (run && !event.target.closest('.react-joyride__tooltip')) {
        event.stopPropagation();
        event.preventDefault();
      }
    };
  
    document.addEventListener('click', handleClickOutside, true);
  
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [run]);
  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { status, index, action, lifecycle } = data;

    console.log(action,lifecycle, "step index antes");

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      stopTour();
      setNavbarOpen(false)
      
    } else if (lifecycle === 'complete' && (action === 'next' || action === 'prev')) {
      const nextIndex = index + (action === 'next' ? 1 : -1);
      
      
      if (steps[nextIndex]?.target === '#torneoSubmit') {
          setOpenForm(true);

          await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar para asegurar que el modal esté abierto
      }
      if (steps[nextIndex]?.target === '#torneos' ) {
        await crearTorneo( {
            nombre : 'prueba torneo',
            numCategorias: 2,
            numEquipos: 2,
            numJugadores: 2
        })
        setOpenForm(false);
        // setNavbarOpen(true)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar para asegurar que el modal esté abierto
    }
    if (steps[nextIndex]?.target === '#torneos-mobile') {
      await crearTorneo( {
          nombre : 'prueba torneo',
          numCategorias: 2,
          numEquipos: 2,
          numJugadores: 2
      })
      setOpenForm(false);
      setNavbarOpen(true)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar para asegurar que el modal esté abierto
  }
    if (steps[nextIndex]?.target === '#select-0'){
      setNavbarOpen(false)
    }
    if (steps[nextIndex]?.target === '#Equipos-mobile'){
      setNavbarOpen(true)
    }
    // if (steps[nextIndex]?.target === '#Categorias-mobile'){
    //   setNavbarOpen(false)
    // }
        setStepIndex(nextIndex);
      if (steps[nextIndex]?.navigateTo) {
        navigate(steps[nextIndex].navigateTo);
        await new Promise(resolve => setTimeout(resolve, 500)); // Esperar para asegurar que el DOM esté actualizado
      }
    }
  };

  return (
    <>
    <Joyride
      steps={steps}
      stepIndex={stepIndex}
      continuous
      scrollToFirstStep
      showProgress
      
    //   showSkipButton
      run={run}
      styles={{
        options: {
          zIndex: 1500, // Asegura que el tooltip esté por encima del modal
        },
      }}
      callback={handleJoyrideCallback}
    />
    <CreateTournamentForm isOpen={openForm} onClose={()=> setOpenForm(false)}/>
    </>
  );
};

export default Tour;
