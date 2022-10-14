const formatTimer = (timer: number): string => {
  const seconds = Math.floor(timer % 60);
  const getSeconds = seconds <= 9 ? `0${seconds}` : seconds;
  const minutes: number | bigint | any = `0${Math.floor(timer / 60)}`;

  return `${minutes}:${getSeconds}`;
};

export default formatTimer;
