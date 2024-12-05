import React, { useState, useEffect, useRef } from 'react';
import { Timer as TimerIcon, X } from 'lucide-react';
import { calculateProgress, formatTime } from '../utils/timerUtils';
import { soundManager } from '../utils/soundUtils';
import { TimerDisplay } from './TimerDisplay';
import { TimerInput } from './TimerInput';
import { FeedbackButton } from './FeedbackButton';

interface TimerProps {
  initialMinutes: number;
}

export function Timer({ initialMinutes }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(initialMinutes.toString());
  const [soundInitialized, setSoundInitialized] = useState(false);
  const hasPlayedAlertRef = useRef(false);
  const hasPlayedBuzzerRef = useRef(false);
  
  useEffect(() => {
    let interval: number;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0 && !hasPlayedBuzzerRef.current) {
      soundManager.playBuzzer();
      hasPlayedBuzzerRef.current = true;
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const totalTime = parseInt(inputMinutes) * 60;
    const progress = calculateProgress(timeLeft, totalTime);
    
    if (isRunning && progress <= 0.20 && !hasPlayedAlertRef.current) {
      soundManager.playAlert();
      hasPlayedAlertRef.current = true;
    }
  }, [timeLeft, inputMinutes, isRunning]);

  const progress = calculateProgress(timeLeft, parseInt(inputMinutes) * 60);
  const backgroundColor = `rgb(${Math.round(255 * (1 - progress))}, ${Math.round(255 * progress)}, 0)`;

  const handleScreenClick = () => {
    if (isRunning) {
      setTimeLeft(parseInt(inputMinutes) * 60);
      hasPlayedAlertRef.current = false;
      hasPlayedBuzzerRef.current = false;
      soundManager.playTick();
    }
  };

  const handleStart = async () => {
    if (!soundInitialized) {
      await soundManager.initialize();
      setSoundInitialized(true);
    }
    setIsRunning(true);
    soundManager.playTick();
    hasPlayedAlertRef.current = false;
    hasPlayedBuzzerRef.current = false;
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(parseInt(inputMinutes) * 60);
    hasPlayedAlertRef.current = false;
    hasPlayedBuzzerRef.current = false;
  };

  const handleInputChange = (value: string) => {
    setInputMinutes(value);
    if (!isRunning) {
      setTimeLeft((parseInt(value) || initialMinutes) * 60);
    }
  };

  return (
    <div 
      className="min-h-screen w-full transition-colors duration-1000 relative"
      style={{ backgroundColor }}
      onClick={handleScreenClick}
    >
      {isRunning && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStop();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white/100 transition-colors"
        >
          <X className="w-6 h-6 text-red-500" />
        </button>
      )}
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
        <div className={`bg-white/90 backdrop-blur-sm rounded-2xl ${isRunning ? 'p-4' : 'p-8'} shadow-xl w-full max-w-md transition-all`}>
          {!isRunning && (
            <div className="flex items-center justify-center mb-8">
              <TimerIcon className="w-8 h-8 mr-2" />
              <h1 className="text-3xl font-bold">Timer</h1>
            </div>
          )}

          <TimerDisplay time={timeLeft} isRunning={isRunning} />
          
          {!isRunning && (
            <TimerInput
              value={inputMinutes}
              onChange={handleInputChange}
              onStart={handleStart}
            />
          )}
        </div>
      </div>
      
      <FeedbackButton />
    </div>
  );
}