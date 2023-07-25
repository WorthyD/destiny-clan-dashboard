import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource, Filterer, Sorter, SorterMetadata, Viewer, ViewerMetadata } from '@destiny/components';
import { CollectionDefinition, MetricDefinition, RecordDefinition } from '@destiny/data/models';
import { ClanMemberProfile } from '@shared/models/ClanMemberProfile';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { ActivitiesService } from '../data-access/activities.service';
import { ACTIVITY_FILTERER_METADATA } from './activity-table-metadata/ActivityTableFilterer';
import { ACTIVITY_SORTER_METADATA } from './activity-table-metadata/ActivityTableSorter';
import { ACTIVITY_VIEWER_METADATA } from './activity-table-metadata/ActivityTableViewer';
interface ViewContext {
  item: ClanMemberProfile;
}
@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityTableComponent {
  // @Input() title: string;
  // @Input() metricDefinitions: MetricDefinition[];
  // @Input() collectionDefinitions: CollectionDefinition[];
  // @Input() recordDefinitions: RecordDefinition[];

  activityHash$ = this.route.parent.parent.paramMap.pipe(map((params) => +params.get('activityHash')));

  vm$ = this.activityHash$.pipe(
    map((hash) => {
      const vm = {
        activity: this.activitiesService.getActivityById(hash),
        metrics: this.activitiesService.getCuratedMetrics(hash),
        collections: this.activitiesService.getCuratedCollections(hash),
        records: this.activitiesService.getCuratedRecords(hash)
      };
      // Set Viewer
      const initialViewerData = new Map(ACTIVITY_VIEWER_METADATA);
      const initialSorterData = new Map(ACTIVITY_SORTER_METADATA);
      vm.metrics.forEach((md) => {
        initialViewerData.set(md.hash.toString(), this.createViewerMetric(md));
        initialSorterData.set(md.hash.toString(), this.createSorterMetric(md));
      });

      vm.collections.forEach((md) => {
        initialViewerData.set(md.hash.toString(), this.createViewerCollection(md));
        initialSorterData.set(md.hash.toString(), this.createSorterCollection(md));
      });

      vm.records.forEach((md) => {
        initialViewerData.set(md.hash.toString(), this.createViewerRecord(md));
      });

      this.activityViewer = new Viewer({
        metadata: initialViewerData,
        contextProvider: this.createViewContextProvider()
      });

      this.activitySorter = new Sorter({ metadata: initialSorterData });

      return { ...vm };
    })
  );

  isLoading = true;
  activityViewer: Viewer;
  activityFilterer = new Filterer({ metadata: ACTIVITY_FILTERER_METADATA });
  activitySorter;
  activityInfo$: Observable<DataSource> = this.vm$.pipe(
    switchMap((vm) => {
      return this.activitiesService
        .getProfiles(
          vm.metrics.map((md) => md.hash),
          vm.collections.map((md) => md.hash),
          vm.records.map((md) => md.hash)
        )
        .pipe(
          map((ds) => {
            return new DataSource<ClanMemberProfile>({ data: ds });
          }),
          tap((x) => {
            this.isLoading = false;
          })
        );
    })
  );

  constructor(private activitiesService: ActivitiesService, private route: ActivatedRoute) {}

  // TODO: Eventually add formatting. Metric definitions have the formatting
  createViewerMetric(definition: MetricDefinition): ViewerMetadata<ClanMemberProfile, ViewContext> {
    return {
      label: definition.displayProperties.name,
      tooltip: definition.displayProperties.description,
      plainText: (item: ClanMemberProfile) =>
        `${item.profile.metrics.data.metrics[definition.hash]?.objectiveProgress?.progress.toString()}`,
      render: (item: ClanMemberProfile) => {
        return {
          classList: 'text-center',
          text: item.profile.metrics.data.metrics[definition.hash].objectiveProgress.progress.toString()
        };
      }
    };
  }

  hasItem(value): boolean {
    if (value === undefined || value.state === undefined) {
      return false;
    }
    return (value?.state & 1) === 0;
  }

  hasCompleted(value): boolean {
    if (value === undefined || value.state === undefined) {
      console.log('fail', value);
      return false;
    }
    // return value.objectives[value.objectives.length -1]?.complete;
    if (value.objectives) {
      return value.objectives.every((x) => x.complete);
    }
    if (value.intervalObjectives) {
      return value.intervalObjectives.every((x) => x.complete);
    }
    return false;
  }

  createViewerCollection(definition: CollectionDefinition): ViewerMetadata<ClanMemberProfile, ViewContext> {
    return {
      // label: definition.displayProperties.name,
      label: definition.displayProperties.hasIcon
        ? `<img class="table-icon" src="https://www.bungie.net/${definition.displayProperties.icon}" alt="${definition.displayProperties.name}"/>`
        : definition.displayProperties.name,
      plainText: (item: ClanMemberProfile) =>
        `${this.hasItem(item.profile.profileCollectibles?.data?.collectibles[definition.hash]) ? 'X' : ''}`,
      render: (item: ClanMemberProfile) => {
        return {
          classList: 'text-center',
          text: this.hasItem(item.profile.profileCollectibles?.data?.collectibles[definition.hash]) ? 'X' : ''
        };
      }
    };
  }

  createViewerRecord(definition: MetricDefinition): ViewerMetadata<ClanMemberProfile, ViewContext> {
    return {
      label: definition.displayProperties.name,
      tooltip: definition.displayProperties.description,
      plainText: (item: ClanMemberProfile) =>
        `${this.hasCompleted(this.getRecord(definition, item.profile)) ? 'X' : ''}`,
      render: (item: ClanMemberProfile) => {
        return {
          classList: 'text-center',
          text: `${this.hasCompleted(this.getRecord(definition, item.profile)) ? 'X' : ''}`
        };
      }
    };
  }

  createSorterMetric(definition: MetricDefinition): SorterMetadata<ClanMemberProfile> {
    return {
      label: definition.displayProperties.name,
      comparator: (a, b) =>
        a.profile.metrics?.data?.metrics[definition.hash]?.objectiveProgress.progress <
        b.profile.metrics?.data?.metrics[definition.hash]?.objectiveProgress.progress
          ? -1
          : 1
    };
  }
  createSorterCollection(definition: MetricDefinition): SorterMetadata<ClanMemberProfile> {
    return {
      label: definition.displayProperties.name,
      comparator: (a, b) =>
        this.hasItem(a.profile.profileCollectibles.data.collectibles[definition.hash]) <
        this.hasItem(a.profile.profileCollectibles.data.collectibles[definition.hash])
          ? -1
          : 1
    };
  }

  createViewContextProvider() {
    return of((item: ClanMemberProfile) => ({
      item
    }));
  }

  getRecord(definition: RecordDefinition, profile) {
    return definition.scope === 1
      ? profile.characterRecords?.data
        ? (Object.values(profile.characterRecords.data)[0] as unknown as any)?.records[definition.hash]
        : undefined
      : profile.profileRecords?.data?.records[definition.hash];
  }
}
