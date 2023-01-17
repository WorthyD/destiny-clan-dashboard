//! MARKED FOR DELETION 1/12/2023
// import { Injectable } from '@angular/core';
// import { AppIndexedDb, StoreId } from '../db/app-indexed-db';

// @Injectable({
//   providedIn: 'root'
// })
// export class ManifestDatabaseService {

//   private database: AppIndexedDb;

//   getValues(repository: string): Promise<any[]> {
//     return this.getDatabase(repository).getAllData('allData');
//   }

//   closeDatabase(repository: string) {
//     return this.getDatabase(repository).close();
//   }

//   update(repository: string, type: StoreId, entities: any[]): Promise<void> {
//     return this.getDatabase(repository).updateValues(entities, type);
//   }

//   remove(repository: string, type: StoreId, ids: string[]): Promise<void> {
//     return this.getDatabase(repository).removeValues(ids, type);
//   }

//   removeAll(repository: string, type: StoreId) {
//     return this.getDatabase(repository).removeAllValues(type);
//   }

//   private getDatabase(repository: string) {
//     if (this.database && this.database.name === repository) {
//       return this.database;
//     }

//     if (this.database) {
//       this.database.close();
//     }

//     this.database = new AppIndexedDb(repository);
//     return this.database;
//   }
// }
