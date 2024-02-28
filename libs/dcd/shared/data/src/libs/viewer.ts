import { tryJSONParse } from '@destiny-clan-dashboard/shared/utils';
import { combineLatest, EMPTY, Observable, ReplaySubject } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

export interface ViewerState {
  views: string[];
}

interface RenderedViewWithText {
  text: string;
  classList?: string | string[];
  styles?: { [key in string]: string };
}
interface RenderedWithComponent {
  component: any;
  data: any;
  classList?: string | string[];
  styles?: { [key in string]: string };
}

interface RenderedViewWithChildren {
  children: RenderedView[];
  classList?: string | string[];
  styles?: { [key in string]: string };
}

export type RenderedView = RenderedViewWithText | RenderedViewWithChildren | RenderedWithComponent;

export interface ViewerMetadata<T = any, C = any> {
  label: string;
  tooltip?: string;
  isSticky?: boolean;
  labelClass?: string;
  plainText: (item: T, context: C) => string | null;
  render: (item: T, context: C) => RenderedView | null;
}

export interface ViewLabel {
  id: string;
  isSticky: boolean;
  label: string;
  tooltip?: string;
  labelClass?: string;
}

export type ViewerContextProvider<T, C> = Observable<(item: T) => C>;

export interface ViewerOptions<T, C> {
  metadata?: Map<string, ViewerMetadata<T, C>>;
  contextProvider?: ViewerContextProvider<T, C>;
  initialState?: ViewerState;
}

/** The viewer carries information to render the items to the view. */
export class Viewer<T = any, C = any> {
  private metadata: Map<string, ViewerMetadata<T, C>>;

  private contextProvider: ViewerContextProvider<T, C>;
  private stateKey = '';

  state = new ReplaySubject<ViewerState>(1);

  constructor(options: ViewerOptions<T, C> = {}, key: string = '') {
    let initialState = options.initialState;
    if (key !== '') {
      this.stateKey = key;
      initialState = this.getSavedState(key);
    }

    this.metadata = options.metadata || new Map();
    this.setState(initialState || { views: this.getViews().map((v) => v.id) }, false);
    this.contextProvider = options.contextProvider || EMPTY.pipe(startWith(() => null));
  }

  getViews(): ViewLabel[] {
    const views: ViewLabel[] = [];
    this.metadata.forEach((value, key) =>
      views.push({
        id: key,
        label: value.label,
        tooltip: value.tooltip,
        labelClass: value.labelClass,
        isSticky: value.isSticky || false
      })
    );
    return views;
  }

  toggle(view: string) {
    this.state.pipe(take(1)).subscribe((state) => {
      const views = state.views;

      const newViews = [...views];
      const index = views.indexOf(view);
      if (index !== -1) {
        newViews.splice(index, 1);
      } else {
        newViews.push(view);
      }

      this.setState({ views: newViews });
    });
  }

  setState(state: ViewerState, save: boolean = true) {
    // Remove any state keys that are not valid
    const views = state.views.filter((view) => !!this.metadata.get(view));
    if (this.stateKey !== '') {
      localStorage.setItem(this.stateKey, JSON.stringify({ views }));
    }
    this.state.next({ views });
  }

  isEquivalent(otherState?: ViewerState): Observable<boolean> {
    return this.state.pipe(
      map((state) => {
        if (!otherState) {
          return false;
        }
        const thisViews = state.views.slice().sort();
        const otherViews = otherState.views.slice().sort();

        return thisViews.length === otherViews.length && thisViews.every((v, i) => otherViews[i] === v);
      })
    );
  }

  getRenderedViews(item: T): Observable<RenderedView[]> {
    return combineLatest(this.state, this.contextProvider).pipe(
      map(([state, context]) => {
        const views = state.views.map((v) => this.metadata.get(v));
        return views.map((view) => view.render(item, context(item)));
      })
    );
  }

  getRenderedView(item: T, view: string): Observable<RenderedView> {
    return this.contextProvider.pipe(
      map((context) => {
        return this.metadata.get(view).render(item, context(item));
      })
    );
  }

  exportData(name: string, items$: Observable<T[]>): void {
    combineLatest([items$, this.state, this.contextProvider])
      .pipe(take(1))
      .subscribe(([items, state, context]) => {
        const keys = state.views.map((x) => x);
        const formattedObj = items.map((item) => {
          const obj = {};
          keys.forEach((key) => {
            const config = this.metadata.get(key);
            obj[config.label] = config.plainText(item, context(item));
          });
          return obj;
        });
        downloadCSV({ filename: `${name}-${new Date().getTime()}` }, formattedObj);
      });
  }

  getSavedState(key: string): ViewerState {
    let stateString = localStorage.getItem(key);

    if (stateString) {
      const state = tryJSONParse<ViewerState>(stateString);
      if (state && state.views && state.views.length > 0) {
        return state;
      }
    }
    return undefined;
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
    csv = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  }
  //data = encodeURI(csv);
  data = csv;

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

      // result += encodeURIComponent(item[key]);
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
