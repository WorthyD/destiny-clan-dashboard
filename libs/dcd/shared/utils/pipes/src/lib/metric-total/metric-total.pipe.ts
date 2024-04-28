import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@dcd/shared/models';

@Pipe({
  name: 'metricTotal',
  standalone: true
})
export class MetricTotalPipe implements PipeTransform {
  transform(memberProfiles: MemberProfile[], metricHash: number): unknown {
    return memberProfiles.reduce((prev, cur) => {
      return prev + (cur.metrics?.data?.metrics[metricHash]?.objectiveProgress.progress ?? 0);
    }, 0);
  }
}
