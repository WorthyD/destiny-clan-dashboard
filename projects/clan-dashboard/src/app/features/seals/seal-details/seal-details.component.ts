import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSource, Exporter, Filterer, Sorter, Viewer } from '@destiny/components';
import { combineLatest, filter, map, Observable, of, switchMap } from 'rxjs';
import { SealsService } from '../data-access/seals.service';
import { SealClanMember } from '../models/seal-clan-member';
import {
  SEAL_DETAILS_EXPORTER_METADATA,
  SEAL_DETAILS_FILTERER_METADATA,
  SEAL_DETAILS_SORTER_METADATA,
  SEAL_DETAILS_VIEWER_METADATA
} from './seal-details-metadata';

interface SealDetailsResources {
  loading: Observable<boolean>;
  viewer: Viewer;
  filterer: Filterer;
  //grouper: Grouper;
  exporter: Exporter;
  sorter: Sorter;
  dataSource: DataSource;
}

@Component({
  selector: 'app-seal-details',
  templateUrl: './seal-details.component.html',
  styleUrls: ['./seal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SealDetailsComponent {
  constructor(private route: ActivatedRoute, private sealsService: SealsService) {}

  sealDetails$ = this.route.paramMap.pipe(
    switchMap((params) => {
      return this.sealsService.getSealDetails$(params.get('hash'));
    })
  );

  sealDetailsViewer = new Viewer({
    metadata: SEAL_DETAILS_VIEWER_METADATA,
    contextProvider: this.createViewContextProvider()
  });
  sealDetailsFilterer = new Filterer({ metadata: SEAL_DETAILS_FILTERER_METADATA });
  sealDetailsSorter = new Sorter({ metadata: SEAL_DETAILS_SORTER_METADATA });
  sealDetailsExporter = new Exporter({
    metadata: SEAL_DETAILS_EXPORTER_METADATA,
    contextProvider: this.createViewContextProvider()
  });
  createViewContextProvider() {
    return of((item: SealClanMember) => ({
      item
      // dateTimePipe: this.bungieDateTimePipe
    }));
  }



  sealDetailsInfo$:Observable<SealDetailsResources> = combineLatest([this.sealDetails$]).pipe(
    map(([sealDetails]) => {
      return {
        loading: of(false),
        dataSource: new DataSource<SealClanMember>({ data: sealDetails }),
        viewer: this.sealDetailsViewer,
        filterer: this.sealDetailsFilterer,
        exporter: this.sealDetailsExporter,
        sorter: this.sealDetailsSorter
      };
    }),
    filter((ds) => !!ds)
  );
}
