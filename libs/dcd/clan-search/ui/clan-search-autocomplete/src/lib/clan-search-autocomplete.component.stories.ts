// import { ClanSearchAutocompleteComponent } from './clan-search-autocomplete.component';
// import { Meta, moduleMetadata, Story } from '@storybook/angular';
// import { CommonModule } from '@angular/common';
// import { ClanSearchResultItem } from '@features/clan-search/models/ClanSearchResultItem';
// import { StorybookModule } from 'projects/components/src/lib/storybook/storybook.module';
// import { FormControl, ReactiveFormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// const list = new Array(10).fill('').map((x) => {
//   return {
//     id: '1',
//     name: 'Item 1',
//     iconName: 'people',
//     type: 'clan'
//   };
// });

// export default {
//   title: 'Features / Clan Search / Search Auto Complete',
//   component: ClanSearchAutocompleteComponent,
//   // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
//   decorators: [
//     moduleMetadata({
//       imports: [
//         StorybookModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatAutocompleteModule,
//         ReactiveFormsModule,
//         MatIconModule
//       ]
//     })
//   ],
//   argTypes: {}
// } as Meta;

// const Template: Story<ClanSearchAutocompleteComponent> = (args: ClanSearchAutocompleteComponent) => ({
//   props: args
// });
// export const Primary = Template.bind({});
// Primary.args = {
//   autoCompleteResults: list,
//   loading: false
// };

// export const Empty = Template.bind({});
// Empty.args = {
//   autoCompleteResults: [],
//   loading: false
// };

// export const Loading = Template.bind({});
// Loading.args = {
//   autoCompleteResults: undefined,
//   loading: true
// };
