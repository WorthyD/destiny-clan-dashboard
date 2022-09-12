export class BaseDefinitionService<T> {
  definitions: T[];
  initializeCache(defs: T[]) {
    this.definitions = defs;
  }
}
