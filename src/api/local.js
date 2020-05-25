export const save = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

export const load = () => {
  return JSON.parse(localStorage.getItem('data'));
};
