import { DataLabel, DataSourceMetadata, DataSourceOptions } from '@dcd/shared/data-models';
import { Observable, of } from 'rxjs';

export class DataSource<T = any> {
  private metadata: Map<string, DataSourceMetadata<T>>;

  data: Observable<T[]>;

  constructor(options: DataSourceOptions<T> = {}) {
    if (options.data instanceof Observable) {
      this.data = options.data as Observable<T[]>;
    } else if (Array.isArray(options.data)) {
      this.data = of(options.data);
    } else {
      this.data = of([]);
    }

    this.metadata = options.metadata || new Map();
  }

  getDataLabelsWithType(type: string): DataLabel[] {
    const dataLabelsWithType: DataLabel[] = [];
    this.metadata.forEach((value, key) => {
      if (value.type === type) {
        dataLabelsWithType.push({ id: key, label: value.label });
      }
    });
    return dataLabelsWithType;
  }

  getDataProperty<V = any>(id: string, item: T): V {
    return this.metadata?.get(id)?.accessor(item);
  }
}
