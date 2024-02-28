import { FiltererMetadata } from '../data/filterer';
import { numberMatchesEquality } from '../../../../dcd/shared/data/src/libs/utility/filter-matcher';
import { MockListItem } from './ListItems';

export const EXAMPLE_FILTERER_METADATA = new Map<string, FiltererMetadata<MockListItem>>([
  [
    'id',
    {
      label: 'ID',
      type:'number',
      matcher:(item, filter) => numberMatchesEquality(item.id, filter.value, filter.equality)
    }
  ]
]);
