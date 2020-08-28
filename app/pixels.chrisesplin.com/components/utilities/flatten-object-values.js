export default function flattenObjectValues(obj) {
  const values = Object.values(obj);

  const arrays = values.map((value) => {
    const isObject = typeof value == 'object';

    return isObject ? flattenObjectValues(value) : value;
  });

  return arrays.flat();
}
