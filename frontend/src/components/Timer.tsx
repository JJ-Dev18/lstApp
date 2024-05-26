import React, { useEffect, useState } from 'react';
import socket from '../api/socket';

interface TimerProps {
  partidoId: number;
  onTimeUpdate: (formattedTime: string) => void;
}

const Timer: React.FC<TimerProps> = ({ partidoId, onTimeUpdate }) => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleTimeUpdate = ({ partidoId: updatePartidoId, time: currentTime }: { partidoId: number; time: number }) => {
      if (updatePartidoId === partidoId) {
        setTime(currentTime);
        const formattedTime = formatTime(currentTime);
        onTimeUpdate(formattedTime);
      }
    };

    socket.on('timeUpdate', handleTimeUpdate);

    return () => {
      socket.off('timeUpdate', handleTimeUpdate);
    };
  }, [partidoId, onTimeUpdate]);

  const startTimer = () => {
    setIsActive(true);
    socket.emit('startTimer', { partidoId });
  };

  const pauseTimer = () => {
    setIsActive(false);
    socket.emit('pauseTimer', { partidoId });
  };

  const resetTimer = () => {
    setIsActive(false);
    socket.emit('resetTimer', { partidoId });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // useEffect(() => {
  //   // Reset time when partidoId changes
  //   setTime(0);
  //   setIsActive(false);
  // }, [partidoId]);

  return (
    <div>
      {isActive ? 'Active' : 'Inactive'}
      <h1>{formatTime(time)}</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
