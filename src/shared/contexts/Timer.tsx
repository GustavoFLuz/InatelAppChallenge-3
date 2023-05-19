import React, { createContext, useEffect, useState } from 'react'

export const TimerContext = createContext(0);

interface TimerProviderProps {
    children: React.ReactNode
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1000);
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <TimerContext.Provider value={timer}>
        {children}
      </TimerContext.Provider>
    );
}
