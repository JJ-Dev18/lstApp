import React, { useState } from 'react';
import Joyride, { Step, CallBackProps } from 'react-joyride';
import { Button } from '@chakra-ui/react';

const steps: Step[] = [
  {
    target: '.navbar-logo',
    content: 'Este es el logo de nuestra aplicación.',
  },
  {
    target: '.navbar-toggle',
    content: 'Aquí puedes cambiar entre los modos claro y oscuro.',
  },
  {
    target: '.welcome-message',
    content: 'Este es el mensaje de bienvenida a la aplicación.',
  },
];

const Tutorial: React.FC = () => {
  const [run, setRun] = useState(false);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setRun(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setRun(true)} colorScheme="teal">
        Iniciar Tutorial
      </Button>
      <Joyride
        steps={steps}
        continuous
        scrollToFirstStep
        showProgress
        showSkipButton
        run={run}
        callback={handleJoyrideCallback}
      />
    </div>
  );
};

export default Tutorial;
