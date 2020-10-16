export default (value: string) =>
  value.length < 20 ? value : `${value.slice(0, 16)}...`;
