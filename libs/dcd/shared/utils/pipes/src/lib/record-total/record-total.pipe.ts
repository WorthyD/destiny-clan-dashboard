import { Pipe, PipeTransform } from '@angular/core';
import { MemberProfile, RecordDefinition } from '@dcd/shared/models';
import { hasCompleted } from './has-completed';

@Pipe({
  name: 'recordTotal',
  standalone: true
})
export class RecordTotalPipe implements PipeTransform {
  transform(memberProfiles: MemberProfile[], definition: RecordDefinition): unknown {
    return memberProfiles.reduce((prev, cur) => {
      const record =
        definition.scope === 1
          ? cur.characterRecords?.data
            ? (Object.values(cur.characterRecords.data)[0] as unknown as any)?.records[definition.hash!]
            : undefined
          : cur.profileRecords?.data?.records[definition.hash!];
      const value = hasCompleted(record) ? 1 : 0;

      return prev + value;
    }, 0);
  }
}
