import { Pipe, PipeTransform } from '@angular/core';
import { MembershipTypes } from '@dcd/shared/models';

@Pipe({
  name: 'memberType',
  standalone: true
})
export class MemberTypePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case MembershipTypes.Xbox:
        return 'xbox';
      case MembershipTypes.Psn:
        return 'playstation';
      case MembershipTypes.Steam:
        return 'steam';
      case MembershipTypes.Stadia:
        return 'stadia';
      case MembershipTypes.Epic:
        return 'epic';


      default:
        return '';
    }
  }
}
