import { Observable } from 'rxjs/internal/Observable';
import { DateFilter, Filter, FilterType, NumberFilter, StateFilter, TextFilter } from './filter-types.model';

export type TextFilterAutocomplete<T = any, C = any> = (items: T[], c: C) => string[];

export interface TextFiltererMetadata<T = any, C = any> {
  label: string;
  type: 'text';
  matcher: (item: T, q: TextFilter, c: C) => boolean;
  autocomplete?: TextFilterAutocomplete<T, C>;
}

export interface NumberFiltererMetadata<T = any, C = any> {
  label: string;
  type: 'number';
  matcher: (item: T, q: NumberFilter, c: C) => boolean;
}

export interface DateFiltererMetadata<T = any, C = any> {
  label: string;
  type: 'date';
  matcher: (item: T, q: DateFilter, c: C) => boolean;
}

export interface StateFiltererMetadata<T = any, C = any> {
  label: string;
  type: 'state';
  matcher: (item: T, q: StateFilter, c: C) => boolean;
  states: string[];
}

export type FiltererMetadata<T = any, C = any> =
  | TextFiltererMetadata<T, C>
  | NumberFiltererMetadata<T, C>
  | DateFiltererMetadata<T, C>
  | StateFiltererMetadata<T, C>;

export interface FiltererState {
  filters: Filter[];
  search: string;
}

export interface FilterOption {
  id: string;
  label: string;
  type: FilterType;
}

export type FiltererContextProvider<M> = Observable<M>;

export interface FiltererOptions<T, C> {
  metadata?: Map<string, FiltererMetadata<T, C>>;
  contextProvider?: FiltererContextProvider<C>;
  initialState?: FiltererState;
  tokenizeItem?: (item: T) => string;
}
