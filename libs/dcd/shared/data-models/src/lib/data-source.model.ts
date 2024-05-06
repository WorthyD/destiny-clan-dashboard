import { Observable } from "rxjs/internal/Observable";

export interface DataSourceMetadata<T> {
  label: string;
  type: string;
  accessor: (item: T) => any;
}

export interface DataLabel {
  id: string;
  label: string;
}

export interface DataSourceOptions<T> {
  data?: Observable<T[]>|T[];
  metadata?: Map<string, DataSourceMetadata<T>>;
}
