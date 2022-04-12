const createDate = (d: string) => {
  const date = new Date(d);
  const getDay = date.getDate();
  const day = getDay > 9 ? getDay : `0${getDay}`;
  const getMonth = date.getMonth() + 1;
  const month = getMonth > 9 ? getMonth : `0${getMonth}`;
  const year = String(date.getFullYear()).slice(-2);
  const fullDate = `${day}/${month}/${year}`;

  return fullDate;
};

export default createDate;
