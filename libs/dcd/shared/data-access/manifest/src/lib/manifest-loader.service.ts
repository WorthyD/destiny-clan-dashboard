// @ts-nocheck
// TODO: UPDate
import { Inject, Injectable } from '@angular/core';

import { Destiny2Service } from 'bungie-api-angular';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { WindowToken } from '@dcd/shared/tokens';
import { IdbKeyValService } from '@dcd/shared/utils/storage';
import { nowPlusMinutes } from '@dcd/shared/utils';

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
  constructor(
    private d2service: Destiny2Service,
    private db: IdbKeyValService,
    @Inject(WindowToken) private window: Window
  ) {}
  private getManifestFromCache(language: string) {
    const jsonPath = window.localStorage.getItem(MANIFEST_PATH_KEY);
    const jsonPathExp = window.localStorage.getItem(MANIFEST_PATH_EXP_KEY);
    if (jsonPathExp && jsonPath) {
      const jsonDate = new Date(jsonPathExp);
      if (jsonDate > nowPlusMinutes(-60)) {
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
        return response?.Response?.jsonWorldContentPaths?.[language];
      })
    );
  }

  pruneTables(obj: any, keys: any) {
    if (!keys.length) {
      return obj;
    }

    return keys.reduce((acc: any, key: any) => {
      return {
        ...acc,
        [key]: obj[key]
      };
    }, {});
  }

  requestDefinitionsArchive(dbPath: string, tableNames: string) {
    return this.db.get<any>('manifest').then((cachedValue) => {
      const versionKey = `${VERSION}:${dbPath}`;

      if (cachedValue && cachedValue.length > 0 && cachedValue.find((x) => x.id === versionKey)) {
        return cachedValue.find((x) => x.id === versionKey);
      }

      return this.window.fetch(`https://www.bungie.net${dbPath}`).then((x) => {
        return x.json().then((y) => {
          const prunedTables = this.pruneTables(y, tableNames);
          const dbObject = { id: versionKey, data: prunedTables };
          this.db.set('manifest', [dbObject]);

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
