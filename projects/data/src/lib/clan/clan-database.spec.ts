import { deleteDB } from 'idb';
import { AppIndexedDb, StoreId } from '../db/clan-indexed-db';
import { ClanDatabase } from './clan-database';

fdescribe('Clan Database', () => {
  let clanDB: ClanDatabase;
  let database: AppIndexedDb;
  const databaseName = 'UnitTestDB';
  const storeId: StoreId = StoreId.ClanDetails;

  const testData = [
    { id: '1', data: { name: 'testing 1' }, createDate: new Date() },
    { id: '2', data: { name: 'testing 2' }, createDate: new Date() },
    { id: '3', data: { name: 'testing 3' }, createDate: new Date() },
    { id: '4', data: { name: 'testing 4' }, createDate: new Date() }
  ];

  const prePopulateDB = () => {
    return database.updateValues(testData, storeId);
  };

  beforeEach(() => {
    database = new AppIndexedDb(databaseName);
    clanDB = new ClanDatabase();
  });

  afterEach((done) => {
    // database.purgeDatabase().then(() => {
    //   console.log('deleted');
    //   done();
    // });
    done();
  });

  describe('getAll', () => {
    beforeEach((done) => {
      prePopulateDB().then(() => {
        done();
      });
    });
    it('should get everything', (done) => {
      clanDB.getAll(databaseName, storeId).then((result) => {
        expect(result.length).toBe(4);

        done();
      });
    });
  });

  describe('getById', () => {
    it('should get everything', (done) => {
      clanDB.getAll(databaseName, storeId).then((result) => {
        expect(result.length).toBe(4);

        done();
      });
    });
  });

  // describe('update', () => {});

  // describe('remove', () => {});

  // describe('removeAll', () => {});

  // describe('deleteDatabase', () => {});
});
