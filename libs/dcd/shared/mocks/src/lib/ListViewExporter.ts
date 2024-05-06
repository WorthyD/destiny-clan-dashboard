//import {ex} from '@dcd/shared/models';
//import { ExporterMetadata } from '../data/exporter';
import { ExporterMetadata } from '@dcd/shared/data-models';
import { MockListItem } from './ListItems';

export const EXAMPLE_EXPORTER_METADATA = new Map<string, ExporterMetadata<MockListItem>>([
  ['id', { label: 'Id', text: (item) => item.id.toString() }],
  ['startDate', { label: 'Start Date', text: (item) => new Date(item.startDate).toDateString() }]
]);
