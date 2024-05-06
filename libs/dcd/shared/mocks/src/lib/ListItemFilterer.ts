//import { FiltererMetadata } from '../data/filterer';
import { FiltererMetadata } from '@dcd/shared/data-models';
import { numberMatchesEquality } from '@dcd/shared/data';
import { MockListItem } from './ListItems';

export const EXAMPLE_FILTERER_METADATA = new Map<string, FiltererMetadata<MockListItem>>([
  [
    'id',
    {
      label: 'ID',
      type: 'number',
      matcher: (item, filter) => numberMatchesEquality(item.id, filter.value, filter.equality)
    }
  ]
]);
