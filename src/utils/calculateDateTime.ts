const calculateDateTime = (d: number) => {
  const date = d !== undefined ? new Date(d) : new Date();
  const currHours = date.getHours();
  const currMinutes = date.getMinutes();
  const hours = currHours < 10 ? `0${currHours}` : currHours;
  const minutes = currMinutes < 10 ? `0${currMinutes}` : currMinutes;
  const time = `${hours} : ${minutes} PM`;

  return time;
};

export default calculateDateTime;
