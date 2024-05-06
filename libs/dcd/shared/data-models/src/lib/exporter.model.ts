import { Observable } from "rxjs/internal/Observable";

export interface ExporterMetadata<T = any, C = any> {
  label: string;
  text: (item: T, context: C) => string | null;
}

export interface ExporterOptions<T, C> {
  metadata?: Map<string, ExporterMetadata<T, C>>;
  contextProvider?: ExporterContextProvider<T, C>;
  // initialState?: SorterState;
}
export type ExporterContextProvider<T, C> = Observable<(item: T) => C>;
