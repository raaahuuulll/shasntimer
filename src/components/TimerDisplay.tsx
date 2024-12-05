import React from 'react';
import { formatTime } from '../utils/timerUtils';

interface TimerDisplayProps {
  time: number;
  isRunning: boolean;
}

export function TimerDisplay({ time, isRunning }: TimerDisplayProps) {
  return (
    <div className={`text-center ${isRunning ? 'mb-0' : 'mb-8'}`}>
      <div className={`font-mono font-bold ${isRunning ? 'text-8xl md:text-9xl' : 'text-6xl'} transition-all`}>
        {formatTime(time)}
      </div>
    </div>
  );
}