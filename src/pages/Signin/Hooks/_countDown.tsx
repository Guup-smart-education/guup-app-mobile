import {useState, useEffect} from 'react';

const useCountDown = (
  expires: number,
  setSigninDisable: (locked: number) => void,
) => {
  const [expire, setExpire] = useState(expires);
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    const cleanup = () => clearInterval(timer);
    if (expire <= 0) {
      setSigninDisable(0);
      cleanup();
      return;
    }
    return cleanup;
  });
  const tick = () => setExpire(expire - 1);
  const min = Math.floor(expire / 60);
  const count = expire - min * 60;
  setSigninDisable(expire);
  return {
    countDown: `0${min}:${count >= 10 ? count : `0${count}`}`,
  };
};

export default useCountDown;
