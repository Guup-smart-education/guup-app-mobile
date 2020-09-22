import {useState, useEffect} from 'react';

const useCountDown = (expires: number) => {
  const [expire, setExpire] = useState(expires);
  const resetCountDown = () => {
    setExpire(expires);
  };
  const stopCountDown = () => {
    setExpire(0);
  };
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    const cleanup = () => clearInterval(timer);
    if (expire <= 0) {
      cleanup();
      return;
    }
    return cleanup;
  });
  const tick = () => setExpire(expire - 1);
  const min = Math.floor(expire / 60);
  const count = expire - min * 60;
  return {
    countDown: `0${min}:${count >= 10 ? count : `0${count}`}`,
    resetCountDown,
    stopCountDown,
  };
};

export default useCountDown;
