const randomArrayValue = <T extends unknown>(arr: T[]): T => {
  const indexResult = Math.floor(Math.random() * arr.length);

  return arr[indexResult];
};

export default randomArrayValue;
