import { Observable } from "rxjs/internal/Observable";

export interface GrouperState {
  group: string;
}

export class Group<T> {
  id: string = '';
  title: string = '';
  items: T[] = [];
}

export interface GrouperMetadata<T = any, C = any> {
  label: string;
  groupingFunction: (items: T[]) => Group<T>[];
  titleTransform?: (title: string, c: C) => string;
}

export interface GroupLabel {
  id: string;
  label: string;
}

export interface GrouperOptions<T, C> {
  metadata?: Map<string, GrouperMetadata<T, C>>;
  contextProvider?: Observable<C>;
  initialState?: GrouperState;
}
