const randomArrayValue = (arr: any[]) => {
  const indexResult = Math.floor(Math.random() * arr.length);

  return arr[indexResult];
};

export default randomArrayValue;
