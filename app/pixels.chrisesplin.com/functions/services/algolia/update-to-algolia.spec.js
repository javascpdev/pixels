jest.mock('./algolia-utilities');

const { v4: uuid } = require('uuid');
const context = require('../../utilities/dev-context');
const algoliaUtilities = require('./algolia-utilities')(context);
const { initIndex, saveObject, deleteObject } = algoliaUtilities;
const updateToAlgolia = require('./update-to-algolia');
const initIndexMock = initIndex;
const saveObjectMock = saveObject();
const deleteObjectMock = deleteObject();

describe('updateToAlgolia', () => {
  beforeEach(() => {
    initIndexMock.mockReset();
    saveObjectMock.mockReset();
    deleteObjectMock.mockReset();
  });

  describe('deleted record', () => {
    let indexName;
    let objectID;
    let record;

    beforeEach(async () => {
      indexName = uuid();
      objectID = uuid();
      record = null;

      await updateToAlgolia({ environment: context.environment, indexName, objectID, record });
    });

    it('should call initIndex', () => {
      expect(initIndexMock).toHaveBeenCalledWith(indexName);
    });

    it('should call deletePrevious', () => {
      expect(deleteObjectMock).toHaveBeenCalledWith(objectID);
    });

    it('should NOT call saveObject', () => {
      expect(saveObjectMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('new or updated record', () => {
    let indexName;
    let objectID;
    let record;

    beforeEach(async () => {
      indexName = uuid();
      objectID = uuid();
      record = { test: uuid() };

      await updateToAlgolia({ environment: context.environment, indexName, objectID, record });
    });

    it('should call initIndex', () => {
      expect(initIndexMock).toHaveBeenCalledWith(indexName);
    });

    it('should NOT call deletePrevious', () => {
      expect(deleteObjectMock).toHaveBeenCalledTimes(0);
    });

    it('should call saveObject', () => {
      expect(saveObjectMock).toHaveBeenCalledWith({
        objectID,
        ...record,
      });
    });
  });
});
