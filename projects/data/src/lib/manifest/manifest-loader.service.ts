import { Injectable } from '@angular/core';

import { Destiny2Service } from 'bungie-api-angular';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { nowPlusMinutes } from '../utility/date-utils';
import { ManifestDatabaseService } from './manifest-database.service';

export const STATUS_EXTRACTING_TABLES = 'extracting tables';
export const STATUS_UNZIPPING = 'unzipping';
export const STATUS_DONE = 'done';
const MANIFEST_PATH_KEY = 'MANIFEST_PATH_KEY';
const MANIFEST_PATH_EXP_KEY = 'MANIFEST_PATH_EXP_KEY';

const VERSION = 'v2';

export interface CachedManifest {
  id: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class ManifestLoaderService {
  constructor(private d2service: Destiny2Service, private db: ManifestDatabaseService) {}
  private getManifestFromCache(language: string) {
    const jsonPath = window.localStorage.getItem(MANIFEST_PATH_KEY);
    const jsonPathExp = window.localStorage.getItem(MANIFEST_PATH_EXP_KEY);
    if (jsonPathExp && jsonPath) {
      const jsonDate = new Date(jsonPathExp);
      if (jsonDate < nowPlusMinutes(-60)) {
        return of(jsonPath);
      }
    }
    return this.getManifest(language).pipe(
      map((x) => {
        window.localStorage.setItem(MANIFEST_PATH_KEY, x);
        window.localStorage.setItem(MANIFEST_PATH_EXP_KEY, new Date().toString());
        return x;
      })
    );
  }

  private getManifest(language: string) {
    return this.d2service.destiny2GetDestinyManifest().pipe(
      map((response) => {
        return response.Response.jsonWorldContentPaths[language];
      })
    );
  }

  pruneTables(obj, keys) {
    if (!keys.length) {
      return obj;
    }

    return keys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: obj[key]
      };
    }, {});
  }

  requestDefinitionsArchive(dbPath, tableNames) {
    // TODO This takes about a second and a half to execute
    return this.db.getValues('manifest').then((cachedValue) => {
      const versionKey = `${VERSION}:${dbPath}`;

      if (cachedValue && cachedValue.length > 0 && cachedValue.find((x) => x.id === versionKey)) {
        this.db.closeDatabase('manifest');
        return cachedValue.find((x) => x.id === versionKey);
      }

      return fetch(`https://www.bungie.net${dbPath}`).then((x) => {
        return x.json().then((y) => {
          const prunedTables = this.pruneTables(y, tableNames);
          const dbObject = { id: versionKey, data: prunedTables };
          this.db.update('manifest', 'allData', [dbObject]).then((db) => {
            this.db.closeDatabase('manifest');
          });

          return dbObject;
        });
      });
    });
  }

  public loadManifestData(language: string = 'en', tableNames): Observable<CachedManifest> {
    return this.getManifestFromCache(language).pipe(
      take(1),
      switchMap((path) => this.requestDefinitionsArchive(path, tableNames))
    );
  }
}
