import { useEffect, useState } from 'react';

type TimerProps = {
  targetTime: number;
  funcHandler?: Function;
}

function Timer({ targetTime, funcHandler }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        console.log('타이머 종료');
        funcHandler && funcHandler()
        clearInterval(intervalId);
      } else {
        setRemainingTime(timeDifference);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div>{formatTime(remainingTime)} 남음</div>;
};

export default Timer;