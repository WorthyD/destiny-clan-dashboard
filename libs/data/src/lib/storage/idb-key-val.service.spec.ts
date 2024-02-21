import { IdbKeyValService } from './idb-key-val.service';

describe('IdbKeyvalService', () => {
  it('should be created', () => {
    const service: IdbKeyValService = new IdbKeyValService();

    expect(service).toBeTruthy();
  });
});
