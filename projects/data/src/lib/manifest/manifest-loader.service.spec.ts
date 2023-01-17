import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Destiny2Service } from 'bungie-api-angular';

import { ManifestLoaderService } from './manifest-loader.service';
import { IdbKeyValService } from '../storage';
import { WindowToken } from '../injection-tokens/window-token';
export const NO_WINDOW_MOCK = {
  fetch: () => {
    return new Promise((res, rej) => {
      res({
        json: () =>
          new Promise((res2, rej2) => {
            res2('res2');
          })
      });
    });
  }
};

describe('ManifestLoaderService', () => {
  let service: ManifestLoaderService;
  let apiService: Destiny2Service;

  let storageServiceSpy: jasmine.SpyObj<IdbKeyValService>;
  const idbKeySpy = jasmine.createSpyObj('IdbKeyValService', ['get', 'set']);

  let windowTokenSpy: jasmine.SpyObj<any>;
  const windowSpy = jasmine.createSpyObj('WindowToken', ['fetch']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: WindowToken, useValue: windowSpy },
        { provide: IdbKeyValService, useValue: idbKeySpy }
      ]
    });
    service = TestBed.inject(ManifestLoaderService);
    apiService = TestBed.inject(Destiny2Service);
    storageServiceSpy = TestBed.inject(IdbKeyValService) as jasmine.SpyObj<IdbKeyValService>;
    windowTokenSpy = TestBed.inject(WindowToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('requestDefinitionsArchive', () => {
    beforeEach(() => {
      windowTokenSpy.fetch.calls.reset();
      storageServiceSpy.get.calls.reset();
      storageServiceSpy.set.calls.reset();
    });
    it('return cached value', (done) => {
      storageServiceSpy.get.and.returnValue(
        new Promise((res, rej) => {
          res([{ id: 'v1:blah', data: [] }]);
        })
      );

      service.requestDefinitionsArchive('blah', []).then((x) => {
        expect(x).toBeTruthy();
        expect(windowTokenSpy.fetch).toHaveBeenCalledTimes(0);
        expect(storageServiceSpy.set).toHaveBeenCalledTimes(0);
        expect(storageServiceSpy.get).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should request new on with new version', (done) => {
      storageServiceSpy.get.and.returnValue(
        new Promise((res, rej) => {
          res([{ id: 'v1:blah', data: [] }]);
        })
      );
      windowTokenSpy.fetch.and.returnValue(
        new Promise((res, rej) => {
          res({
            json: () =>
              new Promise((res2, rej2) => {
                res2('res2');
              })
          });
        })
      );

      service.requestDefinitionsArchive('/v2:blah', []).then((x) => {
        expect(x).toBeTruthy();
        expect(windowTokenSpy.fetch).toHaveBeenCalledTimes(1);
        expect(storageServiceSpy.set).toHaveBeenCalledTimes(1);
        expect(storageServiceSpy.get).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
