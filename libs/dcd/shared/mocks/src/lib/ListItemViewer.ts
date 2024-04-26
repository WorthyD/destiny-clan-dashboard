import { ViewerMetadata } from '../data/viewer';
import { MockListItem } from './ListItems';
export const EXAMPLE_VIEWER_METADATA = new Map<string, ViewerMetadata<MockListItem>>([
  [
    'id',
    {
      label: 'id',
      plainText: (item) => `${item.id}`,
      render: (item) => ({ styles: { fontWeight: 'bold' }, text: `${item.id}` })
    }
  ],
  [
    'isPublic',
    { label: 'Is Public', plainText: (item) => `${item.isPublic}`, render: (item) => ({ text: `${item.isPublic}` }) }
  ],
  [
    'name',
    {
      label: 'Names',
      tooltip: 'testing tooltip',
      plainText: (item) => `${item.name}`,
      render: (item) => ({ text: `${item.name}` })
    }
  ],
  [
    'startDate',
    {
      label: 'Start Date',
      plainText: (item) => `${new Date(item.startDate).toDateString()}`,
      render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` })
    }
  ]
]);
