import { moduleMetadata } from '@storybook/angular';

import { StorybookModule } from '../../storybook/storybook.module';
import { SeasonPassComponent } from './season-pass.component';
import { MOCK_SEASON_PROGRESSION, MOCK_SEASON_PROGRESSION_MAX } from './_MOCK_SEASON_PROGRESSION';
export default {
    title: 'Clan Member / Season Pass Progression',
    decorators: [
        moduleMetadata({
            imports: [SeasonPassComponent, StorybookModule],
        }),
    ],
};

export const base = () => ({
    component: SeasonPassComponent,
    template: `<lib-season-pass [clanMemberSeasonPass]="clanMemberSeasonPass"></lib-season-pass>`,
    props: {
        clanMemberSeasonPass: MOCK_SEASON_PROGRESSION,
    },
});
export const baseMaxLevel = () => ({
    component: SeasonPassComponent,
    template: `<lib-season-pass [clanMemberSeasonPass]="clanMemberSeasonPass"></lib-season-pass>`,
    props: {
        clanMemberSeasonPass: MOCK_SEASON_PROGRESSION_MAX,
    },
});

export const loading = () => ({
    component: SeasonPassComponent,
    template: `<lib-season-pass [clanMemberSeasonPass]="clanMemberSeasonPass" [isLoading]="true"></lib-season-pass>`,
    props: {
        clanMemberSeasonPass: MOCK_SEASON_PROGRESSION,
    },
});
