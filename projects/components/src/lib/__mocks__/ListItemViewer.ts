import { ViewerMetadata } from '../data/viewer';
import { MockListItem } from './ListItems';
export const EXAMPLE_VIEWER_METADATA = new Map<string, ViewerMetadata<MockListItem>>([
  ['id', { label: 'id', render: (item) => ({ styles: { fontWeight: 'bold' }, text: `${item.id}` }) }],
  ['isPublic', { label: 'Is Public', render: (item) => ({ text: `${item.isPublic}` }) }],
  ['name', { label: 'Name', render: (item) => ({ text: `${item.name}` }) }],
  ['startDate', { label: 'Start Date', render: (item) => ({ text: `${new Date(item.startDate).toDateString()}` }) }]
]);
