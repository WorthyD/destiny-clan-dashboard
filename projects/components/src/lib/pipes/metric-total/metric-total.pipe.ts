import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile } from '@destiny/data/models';

@Pipe({
  name: 'metricTotal'
})
export class MetricTotalPipe implements PipeTransform {
  transform(memberProfiles: MemberProfile[], metricHash: number): unknown {
    return memberProfiles.reduce((prev, cur) => {
      return prev + (cur.metrics?.data?.metrics[metricHash]?.objectiveProgress.progress ?? 0);
    }, 0);
  }
}
