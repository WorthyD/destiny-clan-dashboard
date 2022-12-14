import { combineLatest, EMPTY, Observable, startWith, take } from 'rxjs';

export interface ExporterMetadata<T = any, C = any> {
  label: string;
  text: (item: T, context: C) => string | null;
}
export type ExporterContextProvider<T, C> = Observable<(item: T) => C>;

export interface ExporterOptions<T, C> {
  metadata?: Map<string, ExporterMetadata<T, C>>;
  contextProvider?: ExporterContextProvider<T, C>;
  // initialState?: SorterState;
}

export class Exporter<T = any, C = any> {
  private metadata: Map<string, ExporterMetadata<T, C>>;
  private contextProvider: ExporterContextProvider<T, C>;

  constructor(options: ExporterOptions<T, C> = {}) {
    this.metadata = options.metadata || new Map();
    this.contextProvider = options.contextProvider || EMPTY.pipe(startWith(() => null));
  }

  exportData(name: string, items$: Observable<T[]>): void {
    combineLatest([items$, this.contextProvider])
      .pipe(take(1))
      .subscribe(([items, context]) => {
        const keys = [];
        this.metadata.forEach((value, key) => keys.push(key));
        const formattedObj = items.map((item) => {
          const obj = {};
          keys.forEach((key) => {
            const config = this.metadata.get(key);
            obj[config.label] = config.text(item, context(item));
          });
          return obj;
        });
        downloadCSV({ filename: `${name}-${new Date().getTime()}` }, formattedObj);
      });
  }
}

function downloadCSV(args, stockData) {
  let data, filename, link;
  let csv = convertArrayOfObjectsToCSV({
    data: stockData
  });
  if (csv == null) {
    return;
  }

  filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
function convertArrayOfObjectsToCSV(args) {
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function (item) {
    ctr = 0;
    keys.forEach(function (key) {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
