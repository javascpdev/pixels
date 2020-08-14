const META_KEYS = new Set(['__id', '__path']);

export default function cleanRecord(record) {
  return cleanRecursively(record);
};

function cleanRecursively(value) {
  const { isArray, isFirestoreDelete, isFunction, isObject } = getTypes(value);
  let result = value;

  if (isFirestoreDelete) {
  } else if (isArray) {
    result = cleanArray(value);
  } else if (isObject) {
    result = cleanObj(value);
  } else if (isFunction) {
    result = undefined;
  }

  return result;
}

function cleanArray(array) {
  return array.filter((value) => !getTypes(value).isEmpty).map(cleanRecursively);
}

function cleanObj(obj) {
  const result = {};

  for (let key in obj) {
    const value = obj[key];
    const { isEmpty, isFunction } = getTypes(value);
    const isMeta = META_KEYS.has(key);
    const isValid = !isMeta && !isEmpty && !isFunction;

    if (isValid) {
      result[key] = cleanRecursively(value);
    }
  }

  return result;
}

function getTypes(value) {
  const isFirestoreDelete = value && value?.lc == 'FieldValue.delete';
  const isArray = !isFirestoreDelete && Array.isArray(value);
  const isEmpty = typeof value != 'boolean' && typeof value != 'number' && !value;
  const isFunction = typeof value == 'function';
  const isObject = !isArray && typeof value == 'object';

  return { isArray, isEmpty, isFirestoreDelete, isFunction, isObject };
}
