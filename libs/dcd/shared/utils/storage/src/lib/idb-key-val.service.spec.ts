import { create } from 'domain';
import { IdbKeyValService } from './idb-key-val.service';
import { get, set, createStore, UseStore } from 'idb-keyval';
jest.mock('idb-keyval', () => ({
  get: jest.fn(),
  set: jest.fn(),
  createStore: jest.fn(),
  UseStore: jest.fn()
}));

describe('IdbKeyvalService', () => {
  it('should be created', () => {
    const service: IdbKeyValService = new IdbKeyValService();

    expect(service).toBeTruthy();
  });
});
