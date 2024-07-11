import { SortComparator, SortLabel, SorterContextProvider, SorterMetadata, SorterOptions, SorterState } from '@dcd/shared/data-models';
import {combineLatest, EMPTY, Observable, ReplaySubject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';



function sortItems<T, C>(
    items: T[], comparator: SortComparator<T, C>, reverse: boolean, context: C) {
  items.sort((a, b) => comparator(a, b, context));

  if (reverse) {
    items.reverse();
  }

  return items;
}



export class Sorter<T = any, C = any> {
  private metadata: Map<string, SorterMetadata<T, C>>;

  private contextProvider: SorterContextProvider<C>;

  state = new ReplaySubject<SorterState>(1);

  constructor(options: SorterOptions<T, C> = {}) {
    this.metadata = options.metadata || new Map();
    this.state.next(options.initialState || {sort: this.getSorts()[0].id, reverse: false});
    //@ts-ignore
    this.contextProvider = options.contextProvider || EMPTY.pipe(startWith(null));
  }

  sort(): (items$: Observable<T[]>) => Observable<T[]> {
    return (items$: Observable<T[]>) => {
      return combineLatest([items$, this.state, this.contextProvider])
          .pipe(map(([items, state, context]) => {
            const sortMetadata = this.metadata.get(state.sort);
            if (!sortMetadata) {
              throw new Error(`No configuration set up for sort ${state.sort}`);
            }

            return sortItems(items, sortMetadata.comparator, state.reverse, context);
          }));
    };
  }

  getSorts(): SortLabel[] {
    const sorts: SortLabel[] = [];
    this.metadata.forEach((value, key) => sorts.push({id: key, label: value.label}));
    return sorts;
  }

  setState(state: SorterState) {
    this.state.next({...state});
  }

  isEquivalent(otherState?: SorterState): Observable<boolean> {
    return this.state.pipe(map(state => {
      if (!otherState) {
        return false;
      }
      return state.sort === otherState.sort && state.reverse === otherState.reverse;
    }));
  }
}
