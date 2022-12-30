import { DestinyDefinitionsDestinyActivityDefinition } from 'bungie-api-angular';
import { CURATED_ACTIVITIES_DUNGEONS } from './CuratedActivities.dungeons';
import { CURATED_ACTIVITIES_EXOTIC_MISSIONS } from './CuratedActivities.exotic';
import { CURATED_ACTIVITIES_PINNACLE } from './CuratedActivities.pinnacle';
import { CURATED_ACTIVITIES_RAIDS } from './CuratedActivities.raids';

export interface CuratedActivityGroupDefinitions {
  title: string;
  activities: DestinyDefinitionsDestinyActivityDefinition[];
}
export interface CuratedActivityGroup {
  title: string;
  activities: CuratedActivity[];
}
export interface CuratedActivity {
  hash: number;
  metrics: number[];
}


export const CURATED_ACTIVITY_GROUPS: CuratedActivityGroup[] = [
  CURATED_ACTIVITIES_DUNGEONS,
  CURATED_ACTIVITIES_RAIDS,
  CURATED_ACTIVITIES_EXOTIC_MISSIONS,
  CURATED_ACTIVITIES_PINNACLE
];

export const CURATED_ACTIVITIES_ALL: CuratedActivity[] = [
  ...CURATED_ACTIVITIES_DUNGEONS.activities,
  ...CURATED_ACTIVITIES_RAIDS.activities,
  ...CURATED_ACTIVITIES_EXOTIC_MISSIONS.activities,
  ...CURATED_ACTIVITIES_PINNACLE.activities
];
