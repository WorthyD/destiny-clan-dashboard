import { Destiny2Service } from 'bungie-api-angular';

import { ManifestLoaderService } from './manifest-loader.service';
import { IdbKeyValService } from '../storage';

jest.mock('bungie-api-angular');
jest.mock('../storage');
jest.mock('../injection-tokens/window-token');

const mockedIdbKeyValService = IdbKeyValService as jest.Mock<IdbKeyValService>;

describe('ManifestLoaderService', () => {
  let service: ManifestLoaderService;
  let apiService: Destiny2Service = new Destiny2Service(null, '', null);
  let windowSpy;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
    mockedIdbKeyValService.mockClear();
  });
  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should be created', () => {
    service = new ManifestLoaderService(apiService, new mockedIdbKeyValService(), window);
    expect(service).toBeTruthy();
  });
  describe('requestDefinitionsArchive', () => {
    it('return cached value', (done) => {
      const setFn = jest.fn();
      const getFnPromise = jest.fn().mockResolvedValue([{ id: 'v2:blah', data: [] }]);
      mockedIdbKeyValService.mockImplementation(() => {
        return {
          get: getFnPromise,
          set: setFn,
          defaultStore: null
        };
      });
      windowSpy.mockImplementation(() => ({
        fetch: jest.fn()
      }));

      service = new ManifestLoaderService(apiService, new mockedIdbKeyValService(), window);
      service.requestDefinitionsArchive('blah', []).then((x) => {
        expect(x).toBeTruthy();
        expect(window.fetch).toHaveBeenCalledTimes(0);
        expect(setFn).toHaveBeenCalledTimes(0);
        expect(getFnPromise).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('should request new on with new version', (done) => {
      const setFn = jest.fn();
      const getFnPromise = jest.fn().mockResolvedValue([{ id: 'v2:blah', data: [] }]);
      mockedIdbKeyValService.mockImplementation(() => {
        return {
          get: getFnPromise,
          set: setFn,
          defaultStore: null
        };
      });

      const fetchFunc = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve('res2')
        })
      );

      windowSpy.mockImplementation(() => ({
        fetch: fetchFunc
      }));

      service = new ManifestLoaderService(apiService, new mockedIdbKeyValService(), window);

      service.requestDefinitionsArchive('/v3:blah', []).then((x) => {
        expect(x).toBeTruthy();
        expect(fetchFunc).toHaveBeenCalledTimes(1);
        expect(setFn).toHaveBeenCalledTimes(1);
        expect(getFnPromise).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  // This will be a pain. Passing for now.
  describe('loadManifestData', () => {});
});
