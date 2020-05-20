import constants from '~/constants';
import localforage from 'localforage';
import produce from 'immer';

export const getLoginRedirect = createGetter(constants.LOCALFORAGE.LOGIN_REDIRECT);
export const setLoginRedirect = createSetter(constants.LOCALFORAGE.LOGIN_REDIRECT);

function createArrayItemGetter(key) {
  const getter = createGetter(key);

  return async id => {
    const records = (await getter()) || [];

    return records.find(({ __id }) => __id == id);
  };
}

function createArrayItemSetter(key) {
  const getter = createGetter(key);
  const setter = createSetter(key);

  return async newRecord => {
    const records = (await getter()) || [];

    const index = records.findIndex(({ __id }) => __id == newRecord.__id);
    const updatedRecords = produce(records, draft => {
      draft[index] = newRecord;
    });

    return setter(updatedRecords);
  };
}

function createGetter(key) {
  return async () => localforage.getItem(key);
}

function createSetter(key) {
  return async value => localforage.setItem(key, value);
}
