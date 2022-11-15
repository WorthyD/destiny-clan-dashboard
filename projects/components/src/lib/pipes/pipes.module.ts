import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DateAgoPipe } from './date-ago.pipe';
// import { ClassTypeTextPipe } from './class-type/class-type-text.pipe';
// import { RaceTypeTextPipe } from './race-type/race-type-text.pipe';
// import { GenderTypeTextPipe } from './gender-type/gender-type-text.pipe';
// import { RaidReportUrlPipe } from './raid-report-url/raid-report-url.pipe';
// import { DestinyTrackerUrlPipe } from './destiny-tracker-url/destiny-tracker-url.pipe';
// import { BungieProfileUrlPipe } from './bungie-profile-url/bungie-profile-url.pipe';
// import { RaidReportProfileUrlPipe } from './raid-report-url/raid-report-profile-url.pipe';
// import { PlaytimePipe, PlaytimeMillisecondsPipe } from './playtime/playtime.pipe';
// import { DungeonReportUrlPipe } from './dungeon-report-url/dungeon-report-url.pipe';
// import { DungeonReportProfileUrlPipe } from './dungeon-report-url/dungeon-report-profile-url.pipe';
import { BungieDatePipe } from './bungie-date/bungie-date.pipe';
import { BungieDateTimePipe } from './bungie-date/bungie-date-time.pipe';
import { MemberTypePipe } from './member-type/member-type.pipe';
// import { SortByClassPipe } from './sortByClass/sort-by-class.pipe';
// import { RaidCompletionTotalPipe } from './raid-completion-total/raid-completion-total.pipe';
// import { MetricTotalPipe } from './metric-total/metric-total.pipe';
// import { InCollectionsPipe } from './in-collections/in-collections.pipe';
// import { InCollectionsTotalPipe } from './in-collections/in-collections-total.pipe';
// import { D2ChecklistUrlPipe } from './d2-checklist-url/d2-checklist-url.pipe';
// import { TriumphReportPipe } from './triumph-report/triumph-report.pipe';

const pipes = [
  // DateAgoPipe,
  // ClassTypeTextPipe,
  // RaceTypeTextPipe,
  // GenderTypeTextPipe,
  // RaidReportUrlPipe,
  // DestinyTrackerUrlPipe,
  // BungieProfileUrlPipe,
  // RaidReportProfileUrlPipe,
  // PlaytiePipe,
  // PlaytimeMillisecondsPipe,
  // DungeonReportUrlPipe,
  // DungeonReportProfileUrlPipe,
  BungieDatePipe,
  BungieDateTimePipe,
  MemberTypePipe
  // SortByClassPipe,
  // RaidCompletionTotalPipe,
  // MetricTotalPipe,
  // InCollectionsPipe,
  // InCollectionsTotalPipe,
  // D2ChecklistUrlPipe,
  // TriumphReportPipe
];

@NgModule({
  providers: [...pipes],
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
