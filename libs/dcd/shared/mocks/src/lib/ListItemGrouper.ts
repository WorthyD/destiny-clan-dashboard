import { getGroupByValue } from '@dcd/shared/data';
import { GrouperMetadata } from '@dcd/shared/data-models';

import { MockListItem } from './ListItems';

export const EXAMPLE_GROUPER_METADATA = new Map<string, GrouperMetadata<MockListItem>>([
  [
    'all',
    {
      label: 'All',
      groupingFunction: (items) => {
        return [{ id: 'all', title: 'All', items }];
      }
    }
  ],
  [
    'isPublic',
    {
      label: 'IsPublic',
      groupingFunction: (items) => getGroupByValue(items, 'isPublic')
    }
  ]
]);
