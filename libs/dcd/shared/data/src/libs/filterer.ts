// TODO: Unit test

import { DateFilter, Filter, FilterOption, FiltererMetadata, FiltererOptions, FiltererState, NumberFilter, StateFilter, TextFilter } from '@dcd/shared/data-models';
import { combineLatest, EMPTY, Observable, of, ReplaySubject } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';



/** Default and naive tokenize function that combines the item's property values into a string. */
const DEFAULT_TOKENIZE_ITEM = (data: any) => {
  return Object.keys(data)
    .reduce((currentTerm: string, key: string) => {
      return currentTerm + (data as { [key: string]: any })[key] + '☺';
    }, '')
    .toLowerCase();
};

export class Filterer<T = any, C = any> {
  private readonly metadata: Map<string, FiltererMetadata<T, C>>;

  private contextProvider: Observable<C | null>;

  private readonly tokenizeItem: (item: T) => string;

  state = new ReplaySubject<FiltererState>(1);

  constructor(options: FiltererOptions<T, C> = {}) {
    this.metadata = options.metadata || new Map();
    this.state.next(options.initialState || { filters: [], search: '' });
    this.contextProvider = options.contextProvider || EMPTY.pipe(startWith(null));
    this.tokenizeItem = options.tokenizeItem || DEFAULT_TOKENIZE_ITEM;
  }

  /** Gets a stream that returns the items and updates whenever the filters or search changes. */
  filter(): (items: Observable<T[]>) => Observable<T[]> {
    return (items$: Observable<T[]>) => {
      return combineLatest(items$, this.state, this.contextProvider).pipe(
        map(([items, state, contextProvider]) => {
          const filters = state.filters;
          const search = state.search;
          const filteredItems = filterItems(items, filters, contextProvider, this.metadata);
          return searchItems(filteredItems, search, this.tokenizeItem);
        })
      );
    };
  }

  setState(state: FiltererState) {
    this.state.next({ ...state });
  }

  isEquivalent(otherState?: FiltererState): Observable<boolean> {
    return this.state.pipe(
      map((state) => {
        if (!otherState) {
          return false;
        }

        const filtersEquivalent = JSON.stringify(state.filters.sort()) === JSON.stringify(otherState.filters.sort());
        const searchEquivalent = state.search === otherState.search;

        return filtersEquivalent && searchEquivalent;
      })
    );
  }

  getFilterOptions(): FilterOption[] {
    const filterOptions: FilterOption[] = [];
    this.metadata.forEach((value, key) => {
      filterOptions.push({ id: key, label: value.label, type: value.type });
    });
    return filterOptions;
  }

  getStateFilterOptions(id: string): string[] {
    const filtererMetadata = this.metadata.get(id);
    if (!filtererMetadata) {
      return [];
    }

    if (filtererMetadata.type !== 'state') {
      throw Error(`Cannot get state options for filters with type ${filtererMetadata.type}`);
    }

    return filtererMetadata.states;
  }

  transformTextFilterOptions(id: string): (items: Observable<T[]>) => Observable<string[]> {
    const filtererMetadata = this.metadata.get(id);
    if (!filtererMetadata) {
      return () => of([]);
    }

    if (filtererMetadata.type !== 'text') {
      throw Error(`Cannot get text options for filters with type ${filtererMetadata.type}`);
    }

    return (items$: Observable<T[]>) => {
      return combineLatest(items$, this.contextProvider).pipe(
        map(([items, context]) => {
          if (!filtererMetadata.autocomplete) {
            return [];
          }
          return filtererMetadata.autocomplete(items, context as C);
        })
      );
    };
  }

  add(filter: Filter) {
    this.state.pipe(take(1)).subscribe((state) => {
      const filters = state.filters.slice();
      filters.push(filter);
      this.setState({ ...state, filters });
    });
  }

  remove(filter: Filter) {
    this.state.pipe(take(1)).subscribe((state) => {
      const filters = state.filters.slice();
      const index = state.filters.indexOf(filter);

      if (index !== -1) {
        filters.splice(index, 1);
        this.setState({ ...state, filters });
      }
    });
  }
}

/** Utility function to filter the items. May be used to synchronously filter items. */
export function filterItems<T, M>(
  items: T[],
  filters: Filter[] = [],
  context: M | null,
  metadata: Map<string, FiltererMetadata<T, M>>
) {
  return items.filter((item) => {
    return filters.every((filter) => {
      const filterMetadata = metadata.get(filter.id);
      if (!filterMetadata || !filterMetadata.matcher) {
        throw Error('Missing matcher for ' + filter.id);
      }

      switch (filterMetadata.type) {
        case 'text':
          return filterMetadata.matcher(item, filter as TextFilter, context as M);
        case 'date':
          return filterMetadata.matcher(item, filter as DateFilter, context as M);
        case 'number':
          return filterMetadata.matcher(item, filter as NumberFilter, context as M);
        case 'state':
          return filterMetadata.matcher(item, filter as StateFilter, context as M);
      }
    });
  });
}

export function searchItems<T>(items: T[], search: string, tokenizeItem: (item: T) => string): T[] {
  return !search
    ? items
    : items.filter((item) => {
        const tokens = search.split(' OR ');
        return tokens.some((token) => {
          return tokenizeItem(item).indexOf(token.toLowerCase()) !== -1;
        });
      });
}
