const getFullDay = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const fullMonth = month > 9 ? month + 1 : `0${month + 1}`;
  const day = d.getDate();
  const fullDate = day > 9 ? day + 1 : `0${day + 1}`;
  const today = `${year}-${fullMonth}-${fullDate}`;

  return today;
};

export default getFullDay;
