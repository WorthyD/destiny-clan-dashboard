import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
//import { ActivityModeService } from '../data-access/activity-mode.service';
import { ActivityModeService } from '@dcd/activity-modes/data-access';

@Component({
  selector: 'app-activity-mode-detail',
  templateUrl: './activity-mode-detail.component.html',
  styleUrls: ['./activity-mode-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityModeDetailComponent {
  constructor(private activitiesService: ActivityModeService, private route: ActivatedRoute) {}
  // @ts-ignore
  modeType$ = this.route.paramMap.pipe(map((params) => +params.get('modeType')));

  vm$ = this.modeType$.pipe(
    map((modeType) => {
      return {
        mode: this.activitiesService.getActivityModeDefinition(modeType)
      };
    })
  );
}
