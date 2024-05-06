//import { getRandomSLI } from '../../models/__mocks__/seal-list-item';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClanMemberCardComponent } from './clan-member-card.component';

const MEMBERS = [];
const names = [
  'Sweeney Herring',
  'Jacquelyn Malone',
  'Wheeler Figueroa',
  'Phillips Mill',
  'Buchanan Cole',
  'Saundra Fitzpatrick',
  'Clara Campos',
  'James Barr',
  'Veronica Pitts',
  'Veronica Pitt3'
];
for (let i = 0; i < 10; i++) {
  MEMBERS.push({
    member: {
      destinyUserInfo: {
        displayName: names[i]
      },
      id: i
    },
    profile: {},
    clan: {
      clanId: '',
      clanName: '',
      clanTag: ''
    }
  });
}

export default {
  title: 'Features / Clans Details  / Clan Member Card',
  component: ClanMemberCardComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterModule.forRoot([])]
    })
  ],
  argTypes: {}
} as Meta;

const Template: Story<ClanMemberCardComponent> = (args: ClanMemberCardComponent) => ({
  template: `
  <div style="height:300px">
  <app-clan-member-card [cardTitle]="cartTitle" [members]="roster" [isLoading]="isLoading" [itemTemplate]="itemTemplate">
  <ng-template let-member #itemTemplate>
  <div >
  View
  </div>
  </ng-template>
  </app-clan-member-card>
  </div>
 `,
  props: args
});
export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  roster: MEMBERS,
  isLoading: false,
  cartTitle: 'Title'
};
export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Loading.args = {
  roster: [],
  isLoading: true,
  cartTitle: 'Title Loading'
};
