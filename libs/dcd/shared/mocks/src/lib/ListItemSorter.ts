import { SorterMetadata } from '@dcd/shared/data-models';
import { MockListItem } from './ListItems';
export const EXAMPLE_SORTER_METADATA = new Map<string, SorterMetadata<MockListItem>>([
  [
    'id',
    {
      label: 'ID',
      comparator: (a, b) => (a.id < b.id ? -1 : 1)
    }
  ],
  [
    'name',
    {
      label: 'Name',
      comparator: (a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    }
  ]
]);
