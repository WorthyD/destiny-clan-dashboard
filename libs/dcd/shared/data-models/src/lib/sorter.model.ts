import { Observable } from "rxjs/internal/Observable";

export interface SorterState {
  sort: string;
  reverse: boolean;
}

export type SortComparator<T, C> = (a: T, b: T, context: C) => number;

export interface SorterMetadata<T = any, C = any> {
  label: string;
  comparator: SortComparator<T, C>;
}

export type SorterContextProvider<C> = Observable<C>;

export interface SortLabel {
  id: string;
  label: string;
}
export interface SorterOptions<T, C> {
  metadata?: Map<string, SorterMetadata<T, C>>;
  contextProvider?: SorterContextProvider<C>;
  initialState?: SorterState;
}
