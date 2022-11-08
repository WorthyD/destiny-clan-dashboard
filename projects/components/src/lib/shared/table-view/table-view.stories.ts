import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { DataSource } from '../../data/data-source';
import { Filterer } from '../../data/filterer';
import { Sorter } from '../../data/sorter';
import { Viewer } from '../../data/viewer';
import { EXAMPLE_FILTERER_METADATA } from '../../__mocks__/ListItemFilterer';
import { MockListItem, MOCK_LIST_ITEMS } from '../../__mocks__/ListItems';
import { EXAMPLE_SORTER_METADATA } from '../../__mocks__/ListItemSorter';
import { EXAMPLE_VIEWER_METADATA } from '../../__mocks__/ListItemViewer';
import { TableViewComponent } from './table-view.component';
// import { TableViewModule } from './table-view.module';

export default {
  title: 'Components/Table',
  component: TableViewComponent,
  argTypes: {}
} as Meta;
const Template: Story<TableViewComponent> = (args: TableViewComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  filterer: new Filterer({ metadata: EXAMPLE_FILTERER_METADATA }),
  viewer: new Viewer({ metadata: EXAMPLE_VIEWER_METADATA }),
  grouper: null,
  sorter: new Sorter({ metadata: EXAMPLE_SORTER_METADATA }),
  dataSource: new DataSource<MockListItem>({ data: MOCK_LIST_ITEMS }),
  loading: false
};
